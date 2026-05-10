// ===== CONSTANTS & CONFIG =====
const CARD_TYPES = {
    NUMBER: 'number',
    SKIP: 'skip',
    REVERSE: 'reverse',
    DRAW_TWO: 'draw_two',
    WILD: 'wild',
    WILD_DRAW_FOUR: 'wild_draw_four'
};

const COLORS = ['red', 'yellow', 'green', 'blue'];
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// ===== GAME STATE =====
let gameState = {
    socket: null,
    currentScreen: 'menu',
    roomCode: null,
    playerId: null,
    playerName: null,
    isHost: false,
    gameMode: 'normal',
    maxPlayers: 4,
    initialCards: 7,
    turnTimer: 60,
    soundEnabled: true,
    hand: [],
    players: [],
    currentPlayerIndex: 0,
    discardPile: [],
    deckPile: [],
    gameStarted: false,
    startTime: null
};

// ===== SOCKET.IO INITIALIZATION =====
function initSocket() {
    gameState.socket = io();

    gameState.socket.on('connect', () => {
        console.log('Connected to server');
    });

    gameState.socket.on('roomCreated', (data) => {
        gameState.roomCode = data.roomCode;
        gameState.playerId = data.playerId;
        gameState.isHost = true;
        showScreen('lobby');
        updateLobby();
    });

    gameState.socket.on('playerJoined', (data) => {
        gameState.players = data.players;
        updateLobby();
    });

    gameState.socket.on('gameStarted', (data) => {
        gameState.gameStarted = true;
        gameState.players = data.players;
        gameState.hand = data.hand;
        gameState.discardPile = data.discardPile;
        gameState.deckPile = data.deckPile;
        gameState.currentPlayerIndex = data.currentPlayerIndex;
        gameState.startTime = Date.now();
        showScreen('game');
        renderGame();
    });

    gameState.socket.on('cardPlayed', (data) => {
        gameState.currentPlayerIndex = data.currentPlayerIndex;
        gameState.discardPile = data.discardPile;
        gameState.players = data.players;
        renderGame();
    });

    gameState.socket.on('cardDrawn', (data) => {
        gameState.hand = data.hand;
        gameState.deckPile = data.deckPile;
        gameState.currentPlayerIndex = data.currentPlayerIndex;
        renderGame();
    });

    gameState.socket.on('gameEnded', (data) => {
        showGameEnd(data);
    });

    gameState.socket.on('lobbyUpdated', (data) => {
        gameState.players = data.players;
        updateLobby();
    });

    gameState.socket.on('error', (error) => {
        alert(error);
    });
}

// ===== SCREEN NAVIGATION =====
function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenName + 'Screen').classList.add('active');
    gameState.currentScreen = screenName;
}

// ===== MENU SCREEN HANDLERS =====
document.getElementById('createRoomBtn').addEventListener('click', () => {
    showScreen('createRoom');
});

document.getElementById('joinRoomBtn').addEventListener('click', () => {
    showScreen('joinRoom');
});

document.getElementById('soloPlayBtn').addEventListener('click', () => {
    gameState.maxPlayers = 1;
    showScreen('createRoom');
    document.getElementById('maxPlayers').value = '1';
});

document.getElementById('backFromCreate').addEventListener('click', () => {
    showScreen('menu');
});

document.getElementById('backFromJoin').addEventListener('click', () => {
    showScreen('menu');
});

// ===== CREATE ROOM FORM =====
document.getElementById('initialCards').addEventListener('input', (e) => {
    document.getElementById('cardCountValue').textContent = e.target.value;
});

document.getElementById('createRoomForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const playerName = document.getElementById('playerNameCreate').value.trim();
    const gameMode = document.getElementById('gameMode').value;
    const maxPlayers = parseInt(document.getElementById('maxPlayers').value);
    const initialCards = parseInt(document.getElementById('initialCards').value);
    const turnTimer = parseInt(document.getElementById('turnTimer').value);

    if (!playerName) {
        alert('Masukkan nama pemain');
        return;
    }

    gameState.playerName = playerName;
    gameState.gameMode = gameMode;
    gameState.maxPlayers = maxPlayers;
    gameState.initialCards = initialCards;
    gameState.turnTimer = turnTimer;

    gameState.socket.emit('createRoom', {
        playerName,
        gameMode,
        maxPlayers,
        initialCards,
        turnTimer
    });
});

// ===== JOIN ROOM FORM =====
document.getElementById('joinRoomForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const playerName = document.getElementById('playerNameJoin').value.trim();
    const roomCode = document.getElementById('roomCode').value.trim().toUpperCase();

    if (!playerName || !roomCode) {
        alert('Lengkapi semua field');
        return;
    }

    gameState.playerName = playerName;
    gameState.roomCode = roomCode;

    gameState.socket.emit('joinRoom', {
        playerName,
        roomCode
    });

    showScreen('lobby');
});

// ===== LOBBY SCREEN =====
function updateLobby() {
    document.getElementById('lobbyRoomCode').textContent = gameState.roomCode;
    document.getElementById('lobbyGameMode').textContent = gameState.gameMode;
    document.getElementById('lobbyPlayerCount').textContent = gameState.players.length;
    document.getElementById('lobbyMaxPlayers').textContent = gameState.maxPlayers;

    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';

    gameState.players.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-item' + (player.isHost ? ' host' : '');
        playerDiv.innerHTML = `
            <div class="player-name">${player.name}</div>
            <div class="player-status">${player.isHost ? '👑 Host' : '✓ Siap'}</div>
        `;
        playersList.appendChild(playerDiv);
    });

    // Show/hide start button
    const startBtn = document.getElementById('startGameBtn');
    if (gameState.isHost && gameState.players.length >= 1) {
        startBtn.style.display = 'block';
    } else {
        startBtn.style.display = 'none';
    }
}

document.getElementById('startGameBtn').addEventListener('click', () => {
    gameState.socket.emit('startGame', {
        roomCode: gameState.roomCode
    });
});

document.getElementById('leaveLobbyBtn').addEventListener('click', () => {
    gameState.socket.emit('leaveLobby', {
        roomCode: gameState.roomCode
    });
    showScreen('menu');
});

// ===== GAME SCREEN =====
function renderGame() {
    renderTopPlayers();
    renderDiscardPile();
    renderPlayerHand();
    renderGameInfo();
}

function renderTopPlayers() {
    const topPlayersDiv = document.getElementById('topPlayers');
    topPlayersDiv.innerHTML = '';

    gameState.players.forEach((player, index) => {
        if (index === gameState.players.findIndex(p => p.id === gameState.playerId)) return;

        const playerDiv = document.createElement('div');
        playerDiv.className = 'opponent-player' + (index === gameState.currentPlayerIndex ? ' active' : '');
        
        const cardCount = player.hand.length;
        const unoClass = cardCount === 1 ? ' uno' : '';

        playerDiv.innerHTML = `
            <div class="opponent-name">${player.name}</div>
            <div class="opponent-cards${unoClass}">${cardCount} kartu</div>
        `;
        topPlayersDiv.appendChild(playerDiv);
    });
}

function renderDiscardPile() {
    const discardPileDiv = document.getElementById('discardPile');
    if (gameState.discardPile.length === 0) return;

    const topCard = gameState.discardPile[gameState.discardPile.length - 1];
    discardPileDiv.innerHTML = '';
    
    const cardDiv = document.createElement('div');
    cardDiv.className = `card ${topCard.color}`;
    cardDiv.textContent = getCardDisplay(topCard);
    discardPileDiv.appendChild(cardDiv);
}

function renderPlayerHand() {
    const handDiv = document.getElementById('playerHand');
    handDiv.innerHTML = '';

    gameState.hand.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = `hand-card ${card.color}`;
        
        // Check if card is playable
        if (gameState.currentPlayerIndex === gameState.players.findIndex(p => p.id === gameState.playerId)) {
            if (canPlayCard(card)) {
                cardDiv.classList.add('playable');
            } else {
                cardDiv.classList.add('unplayable');
            }
        }

        cardDiv.innerHTML = `<div class="card ${card.color}"><span>${getCardDisplay(card)}</span></div>`;
        
        cardDiv.addEventListener('click', () => {
            if (gameState.currentPlayerIndex === gameState.players.findIndex(p => p.id === gameState.playerId)) {
                playCard(index);
            }
        });

        handDiv.appendChild(cardDiv);
    });
}

function renderGameInfo() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    document.getElementById('currentPlayer').textContent = currentPlayer.name;
    document.getElementById('gameModeDisplay').textContent = gameState.gameMode;

    // Update timer
    if (gameState.turnTimer > 0) {
        updateTimer();
    }
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    // Timer logic will be implemented in server
    timerElement.textContent = gameState.turnTimer + 's';
}

function getCardDisplay(card) {
    if (card.type === CARD_TYPES.NUMBER) {
        return card.number;
    }
    
    const displays = {
        skip: '⏭',
        reverse: '↩',
        draw_two: '+2',
        wild: 'W',
        wild_draw_four: 'W+4'
    };
    
    return displays[card.type] || '?';
}

function canPlayCard(card) {
    if (gameState.discardPile.length === 0) return true;
    
    const topCard = gameState.discardPile[gameState.discardPile.length - 1];
    
    if (card.type === CARD_TYPES.WILD || card.type === CARD_TYPES.WILD_DRAW_FOUR) {
        return true;
    }
    
    return card.color === topCard.color || 
           (card.type === topCard.type && card.type !== CARD_TYPES.NUMBER) ||
           (card.type === CARD_TYPES.NUMBER && card.number === topCard.number);
}

function playCard(index) {
    const card = gameState.hand[index];
    
    if (!canPlayCard(card)) {
        playSound('error');
        return;
    }

    gameState.socket.emit('playCard', {
        roomCode: gameState.roomCode,
        card,
        cardIndex: index
    });

    playSound('card');
}

document.getElementById('drawCardBtn').addEventListener('click', () => {
    if (gameState.currentPlayerIndex !== gameState.players.findIndex(p => p.id === gameState.playerId)) {
        return;
    }

    gameState.socket.emit('drawCard', {
        roomCode: gameState.roomCode
    });

    playSound('card');
});

document.getElementById('passBtn').addEventListener('click', () => {
    if (gameState.currentPlayerIndex !== gameState.players.findIndex(p => p.id === gameState.playerId)) {
        return;
    }

    gameState.socket.emit('passTurn', {
        roomCode: gameState.roomCode
    });

    playSound('pass');
});

document.getElementById('unoBtn').addEventListener('click', () => {
    if (gameState.hand.length !== 1) return;

    gameState.socket.emit('callUno', {
        roomCode: gameState.roomCode
    });

    playSound('uno');
});

// ===== WIN SCREEN =====
function showGameEnd(data) {
    showScreen('win');

    const gameTime = formatTime(Date.now() - gameState.startTime);
    document.getElementById('gameTime').textContent = gameTime;
    document.getElementById('totalCards').textContent = data.totalCardsPlayed;
    document.getElementById('playersCount').textContent = gameState.players.length;

    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';

    data.leaderboard.forEach((player, index) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        item.innerHTML = `
            <div class="leaderboard-rank ${index === 0 ? 'first' : ''}">${index + 1}</div>
            <div class="leaderboard-name">${player.name}</div>
            <div class="leaderboard-score">${player.score} poin</div>
        `;
        leaderboardList.appendChild(item);
    });

    if (data.winner.id === gameState.playerId) {
        document.getElementById('winMessage').textContent = 'Selamat! Anda Menang!';
        playSound('win');
    } else {
        document.getElementById('winMessage').textContent = `${data.winner.name} Menang!`;
        playSound('lose');
    }
}

document.getElementById('playAgainBtn').addEventListener('click', () => {
    showScreen('menu');
    location.reload();
});

document.getElementById('backMenuBtn').addEventListener('click', () => {
    showScreen('menu');
    location.reload();
});

// ===== PARTICLES BACKGROUND =====
function createParticles() {
    const particlesBg = document.querySelector('.particles-bg');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 100 + 50 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particlesBg.appendChild(particle);
    }
}

// ===== SOUND EFFECTS =====
const soundMap = {
    card: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAAA=',
    pass: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAAA=',
    uno: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAAA=',
    win: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAAA=',
    lose: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAAA=',
    error: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAAA='
};

function playSound(type) {
    if (!gameState.soundEnabled) return;
    
    try {
        const audio = new Audio(soundMap[type]);
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Sound play error:', e));
    } catch (e) {
        console.log('Sound error:', e);
    }
}

document.getElementById('soundBtn').addEventListener('click', (e) => {
    gameState.soundEnabled = !gameState.soundEnabled;
    e.target.classList.toggle('muted');
    e.target.textContent = gameState.soundEnabled ? '🔊' : '🔇';
});

// ===== UTILITY FUNCTIONS =====
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// ===== INITIALIZATION =====
window.addEventListener('load', () => {
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
    }, 2000);

    // Create particles
    createParticles();

    // Initialize Socket.io
    initSocket();

    // Show menu
    showScreen('menu');
});
