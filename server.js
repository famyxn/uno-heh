const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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
let rooms = {};
let players = {};

// ===== UTILITY FUNCTIONS =====
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function generateDeck() {
    const deck = [];
    
    // Number cards (0-9) - 2 of each except 0
    COLORS.forEach(color => {
        deck.push({ type: CARD_TYPES.NUMBER, color, number: 0 });
        for (let i = 1; i <= 9; i++) {
            deck.push({ type: CARD_TYPES.NUMBER, color, number: i });
            deck.push({ type: CARD_TYPES.NUMBER, color, number: i });
        }
    });
    
    // Action cards - 2 of each
    COLORS.forEach(color => {
        ['skip', 'reverse', 'draw_two'].forEach(type => {
            deck.push({ type, color });
            deck.push({ type, color });
        });
    });
    
    // Wild cards
    for (let i = 0; i < 4; i++) {
        deck.push({ type: CARD_TYPES.WILD, color: null });
        deck.push({ type: CARD_TYPES.WILD_DRAW_FOUR, color: null });
    }
    
    return deck.sort(() => Math.random() - 0.5);
}

function drawCard(deck, count = 1) {
    const drawnCards = [];
    for (let i = 0; i < count; i++) {
        if (deck.length === 0) break;
        drawnCards.push(deck.pop());
    }
    return drawnCards;
}

function canPlayCard(card, topCard) {
    if (card.type === CARD_TYPES.WILD || card.type === CARD_TYPES.WILD_DRAW_FOUR) {
        return true;
    }
    
    if (card.color === topCard.color) return true;
    if (card.type === topCard.type && card.type !== CARD_TYPES.NUMBER) return true;
    if (card.type === CARD_TYPES.NUMBER && topCard.type === CARD_TYPES.NUMBER && card.number === topCard.number) return true;
    
    return false;
}

function executeCardAction(room, cardType, currentPlayerIndex) {
    const playerCount = room.players.length;
    
    switch (cardType) {
        case CARD_TYPES.SKIP:
            room.currentPlayerIndex = (currentPlayerIndex + 2) % playerCount;
            break;
            
        case CARD_TYPES.REVERSE:
            room.direction = room.direction === 1 ? -1 : 1;
            if (playerCount === 2) {
                room.currentPlayerIndex = (currentPlayerIndex + 1) % playerCount;
            } else {
                room.currentPlayerIndex = (currentPlayerIndex - 1 + playerCount) % playerCount;
            }
            break;
            
        case CARD_TYPES.DRAW_TWO:
            const nextIndex = (currentPlayerIndex + 1) % playerCount;
            const drawnCards = drawCard(room.deck, 2);
            room.players[nextIndex].hand.push(...drawnCards);
            room.currentPlayerIndex = (nextIndex + 1) % playerCount;
            break;
            
        case CARD_TYPES.WILD_DRAW_FOUR:
            const nextIndexWD4 = (currentPlayerIndex + 1) % playerCount;
            const drawnCardsWD4 = drawCard(room.deck, 4);
            room.players[nextIndexWD4].hand.push(...drawnCardsWD4);
            room.currentPlayerIndex = (nextIndexWD4 + 1) % playerCount;
            break;
            
        default:
            room.currentPlayerIndex = (currentPlayerIndex + 1) % playerCount;
    }
}

// ===== SOCKET.IO EVENTS =====
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    players[socket.id] = {
        id: socket.id,
        name: '',
        roomCode: null,
        socketId: socket.id
    };

    // CREATE ROOM
    socket.on('createRoom', (data) => {
        const roomCode = generateRoomCode();
        
        // Ensure unique room code
        while (rooms[roomCode]) {
            roomCode = generateRoomCode();
        }

        rooms[roomCode] = {
            code: roomCode,
            host: socket.id,
            players: [{
                id: socket.id,
                name: data.playerName,
                hand: [],
                isHost: true,
                socketId: socket.id,
                uno: false
            }],
            gameMode: data.gameMode,
            maxPlayers: data.maxPlayers,
            initialCards: data.initialCards,
            turnTimer: data.turnTimer,
            gameStarted: false,
            currentPlayerIndex: 0,
            direction: 1,
            deck: [],
            discard: [],
            totalCardsPlayed: 0,
            startTime: null
        };

        players[socket.id].roomCode = roomCode;
        socket.join(roomCode);

        socket.emit('roomCreated', {
            roomCode,
            playerId: socket.id
        });

        console.log('Room created:', roomCode);
    });

    // JOIN ROOM
    socket.on('joinRoom', (data) => {
        const room = rooms[data.roomCode];
        
        if (!room) {
            socket.emit('error', 'Room tidak ditemukan');
            return;
        }

        if (room.gameStarted) {
            socket.emit('error', 'Game sudah dimulai');
            return;
        }

        if (room.players.length >= room.maxPlayers) {
            socket.emit('error', 'Room sudah penuh');
            return;
        }

        room.players.push({
            id: socket.id,
            name: data.playerName,
            hand: [],
            isHost: false,
            socketId: socket.id,
            uno: false
        });

        players[socket.id].roomCode = data.roomCode;
        socket.join(data.roomCode);

        io.to(data.roomCode).emit('playerJoined', {
            players: room.players.map(p => ({
                id: p.id,
                name: p.name,
                isHost: p.isHost,
                cardCount: p.hand.length
            }))
        });

        console.log(`Player ${data.playerName} joined room ${data.roomCode}`);
    });

    // START GAME
    socket.on('startGame', (data) => {
        const room = rooms[data.roomCode];
        
        if (!room || room.host !== socket.id) {
            socket.emit('error', 'Hanya host yang bisa memulai game');
            return;
        }

        if (room.players.length < 1) {
            socket.emit('error', 'Minimal 1 pemain untuk memulai');
            return;
        }

        // Initialize game
        room.gameStarted = true;
        room.deck = generateDeck();
        room.startTime = Date.now();
        room.currentPlayerIndex = 0;

        // Deal cards
        room.players.forEach(player => {
            player.hand = drawCard(room.deck, room.initialCards);
        });

        // Start discard pile
        room.discard.push(room.deck.pop());

        // Send game data to all players
        room.players.forEach((player, index) => {
            io.to(player.socketId).emit('gameStarted', {
                players: room.players.map(p => ({
                    id: p.id,
                    name: p.name,
                    hand: p.id === player.id ? p.hand : Array(p.hand.length).fill(null),
                    cardCount: p.hand.length
                })),
                hand: player.hand,
                discardPile: room.discard,
                deckPile: room.deck,
                currentPlayerIndex: room.currentPlayerIndex,
                gameMode: room.gameMode
            });
        });

        console.log('Game started in room:', data.roomCode);
    });

    // PLAY CARD
    socket.on('playCard', (data) => {
        const room = rooms[data.roomCode];
        if (!room || !room.gameStarted) return;

        const playerIndex = room.players.findIndex(p => p.id === socket.id);
        if (playerIndex !== room.currentPlayerIndex) return;

        const card = data.card;
        const cardIndex = data.cardIndex;

        const topCard = room.discard[room.discard.length - 1];
        if (!canPlayCard(card, topCard)) return;

        // Remove card from hand
        room.players[playerIndex].hand.splice(cardIndex, 1);
        room.discard.push(card);
        room.totalCardsPlayed++;

        // Check for win
        if (room.players[playerIndex].hand.length === 0) {
            const winner = room.players[playerIndex];
            const leaderboard = room.players
                .map(p => ({ name: p.name, score: 100 - p.hand.length * 5 }))
                .sort((a, b) => b.score - a.score);

            io.to(data.roomCode).emit('gameEnded', {
                winner,
                leaderboard,
                totalCardsPlayed: room.totalCardsPlayed
            });

            return;
        }

        // Execute card action
        executeCardAction(room, card.type, playerIndex);

        // Reset uno flag
        room.players[playerIndex].uno = false;

        // Notify all players
        io.to(data.roomCode).emit('cardPlayed', {
            players: room.players.map(p => ({
                id: p.id,
                name: p.name,
                hand: Array(p.hand.length).fill(null),
                cardCount: p.hand.length
            })),
            currentPlayerIndex: room.currentPlayerIndex,
            discardPile: room.discard,
            playedCard: card,
            playerId: socket.id
        });
    });

    // DRAW CARD
    socket.on('drawCard', (data) => {
        const room = rooms[data.roomCode];
        if (!room || !room.gameStarted) return;

        const playerIndex = room.players.findIndex(p => p.id === socket.id);
        if (playerIndex !== room.currentPlayerIndex) return;

        const drawnCards = drawCard(room.deck, 1);
        if (drawnCards.length === 0) return;

        room.players[playerIndex].hand.push(...drawnCards);
        room.currentPlayerIndex = (playerIndex + 1) % room.players.length;

        // Send updated hand to current player
        io.to(socket.id).emit('cardDrawn', {
            hand: room.players[playerIndex].hand,
            deckPile: room.deck,
            currentPlayerIndex: room.currentPlayerIndex
        });

        // Notify others
        io.to(data.roomCode).except(socket.id).emit('cardDrawn', {
            currentPlayerIndex: room.currentPlayerIndex,
            players: room.players.map(p => ({
                id: p.id,
                name: p.name,
                cardCount: p.hand.length
            }))
        });
    });

    // PASS TURN
    socket.on('passTurn', (data) => {
        const room = rooms[data.roomCode];
        if (!room || !room.gameStarted) return;

        const playerIndex = room.players.findIndex(p => p.id === socket.id);
        if (playerIndex !== room.currentPlayerIndex) return;

        room.currentPlayerIndex = (playerIndex + 1) % room.players.length;

        io.to(data.roomCode).emit('turnPassed', {
            currentPlayerIndex: room.currentPlayerIndex
        });
    });

    // CALL UNO
    socket.on('callUno', (data) => {
        const room = rooms[data.roomCode];
        if (!room || !room.gameStarted) return;

        const playerIndex = room.players.findIndex(p => p.id === socket.id);
        if (playerIndex === -1) return;

        room.players[playerIndex].uno = true;

        io.to(data.roomCode).emit('unoCall', {
            playerId: socket.id,
            playerName: room.players[playerIndex].name
        });
    });

    // LEAVE LOBBY
    socket.on('leaveLobby', (data) => {
        const room = rooms[data.roomCode];
        if (!room) return;

        const playerIndex = room.players.findIndex(p => p.id === socket.id);
        if (playerIndex !== -1) {
            room.players.splice(playerIndex, 1);
        }

        if (room.players.length === 0) {
            delete rooms[data.roomCode];
        } else if (socket.id === room.host) {
            // Assign new host
            room.host = room.players[0].id;
            room.players[0].isHost = true;
        }

        socket.leave(data.roomCode);

        io.to(data.roomCode).emit('lobbyUpdated', {
            players: room.players
        });
    });

    // DISCONNECT
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);

        const roomCode = players[socket.id]?.roomCode;
        if (roomCode && rooms[roomCode]) {
            const room = rooms[roomCode];
            const playerIndex = room.players.findIndex(p => p.id === socket.id);

            if (playerIndex !== -1) {
                room.players.splice(playerIndex, 1);
            }

            if (room.players.length === 0) {
                delete rooms[roomCode];
            } else {
                if (socket.id === room.host && !room.gameStarted) {
                    room.host = room.players[0].id;
                    room.players[0].isHost = true;
                }

                io.to(roomCode).emit('lobbyUpdated', {
                    players: room.players
                });
            }
        }

        delete players[socket.id];
    });
});

// ===== REST API =====
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

app.get('/api/rooms', (req, res) => {
    const roomList = Object.keys(rooms).map(code => ({
        code,
        players: rooms[code].players.length,
        maxPlayers: rooms[code].maxPlayers,
        gameStarted: rooms[code].gameStarted
    }));
    res.json(roomList);
});

// ===== SERVER START =====
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🎮 UNO Royale Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});
