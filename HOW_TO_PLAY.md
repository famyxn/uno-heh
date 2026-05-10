# 🎮 HOW TO PLAY - UNO ROYALE

Panduan lengkap cara bermain UNO Royale multiplayer.

---

## 📖 DAFTAR ISI

1. [Aturan Dasar](#1-aturan-dasar)
2. [Jenis Kartu](#2-jenis-kartu)
3. [Cara Bermain](#3-cara-bermain)
4. [Game Modes](#4-game-modes)
5. [Tips & Strategi](#5-tips--strategi)
6. [UI Guide](#6-ui-guide)

---

## 1. ATURAN DASAR

### Objektif Permainan

Jadilah pemain pertama yang menghabiskan semua kartu di tangan Anda.

### Setup

- **2-5 pemain** dalam satu room
- Setiap pemain mendapat **7 kartu** (customizable 5-10)
- 1 kartu pertama ditempatkan di **Discard Pile**
- Sisa kartu di **Deck Pile** (untuk diambil)

### Cara Bermain

1. **Giliran dimulai** pada pemain pertama
2. **Mainkan 1 kartu** dari tangan yang cocok dengan:
   - **Warna yang sama** (Red, Yellow, Green, Blue)
   - **Angka/Simbol yang sama** (0-9, Skip, Reverse, +2, Wild)
3. **Jika tidak ada kartu cocok:**
   - Klik **"Ambil Kartu"** untuk draw 1 kartu
   - Kartu masuk ke tangan Anda
   - Giliran berakhir, lanjut ke pemain berikutnya
4. **Giliran berakhir** setelah mainkan kartu
5. **Lanjut ke pemain berikutnya** (searah jarum jam)

### Cara Menang

**Habiskan semua kartu terlebih dahulu!**

- Kartu terakhir: Klik "UNO!" untuk announce
- Setelah itu, tunggu pemain lain
- Saat semua kartu habis → **KEMENANGAN!**

### Contoh Putaran

```
Discard Pile: Red 5

Pemain A punya: Red 7, Yellow 5, Blue 2
→ Bisa mainkan Red 7 ATAU Yellow 5 (cocok warna/angka)

Pemain A mainkan Yellow 5
Discard Pile sekarang: Yellow 5

Pemain B punya: Green 3, Yellow Skip, Blue 7
→ Bisa mainkan Yellow Skip (warna sama)

Pemain B mainkan Yellow Skip
→ Pemain C diskip!
→ Langsung giliran Pemain D
```

---

## 2. JENIS KARTU

### Number Cards (0-9)

```
Warna: Red, Yellow, Green, Blue
Jumlah: 2 kartu untuk setiap angka (except 0 hanya 1)

Cocok dengan:
✅ Warna sama
✅ Angka sama
```

**Contoh:**
- Red 5 cocok dengan: Red 0-9, Any Color 5

### Skip

```
Simbol: ⏭ (Panah ke kanan)
Warna: Red, Yellow, Green, Blue
Jumlah: 2 kartu per warna

Efek:
→ Skip pemain berikutnya
→ Giliran lanjut ke pemain setelahnya
```

**Contoh:**
```
Pemain A mainkan Red Skip
→ Pemain B DISKIP
→ Langsung giliran Pemain C
```

### Reverse

```
Simbol: ↩ (Panah balik)
Warna: Red, Yellow, Green, Blue
Jumlah: 2 kartu per warna

Efek 2 pemain:
→ Fungsi seperti Skip (turn pemain lain)

Efek 3+ pemain:
→ Ubah arah putaran
→ Clockwise ↔ Counter-clockwise
```

**Contoh:**
```
Arah putaran: A → B → C → D (clockwise)

Pemain B mainkan Reverse
→ Arah berubah: A ← B ← C ← D (counter-clockwise)
→ Sekarang giliran A
```

### Draw Two (+2)

```
Simbol: +2
Warna: Red, Yellow, Green, Blue
Jumlah: 2 kartu per warna

Efek:
→ Pemain berikutnya AMBIL 2 KARTU
→ Pemain itu skip giliran
→ Lanjut ke pemain setelahnya
```

**Contoh:**
```
Pemain A mainkan Red +2
→ Pemain B ambil 2 kartu dari deck
→ Pemain B skip giliran
→ Giliran Pemain C
```

### Wild (W)

```
Simbol: W (White/hitam)
Warna: None (bisa apapun)
Jumlah: 4 kartu

Efek:
✅ Cocok dengan KARTU APAPUN
✅ Pemain bisa PILIH warna baru
✅ Giliran lanjut normal

Kapan gunakan:
- Saat tidak ada kartu cocok
- Strategic play untuk ubah warna
- Saat ingin setup giliran berikutnya
```

**Contoh:**
```
Discard Pile: Blue 7
Tangan: Red 5, Yellow 3, Wild

Tidak ada kartu cocok dengan Blue 7
→ Main Wild
→ Pilih warna baru (misal: Red)
→ Discard Pile sekarang: Wild (Red)
→ Giliran pemain berikutnya
```

### Wild Draw Four (W+4)

```
Simbol: W+4
Warna: None (bisa apapun)
Jumlah: 4 kartu

Efek:
✅ Cocok dengan KARTU APAPUN
✅ Pemain bisa PILIH warna baru
✅ Pemain berikutnya AMBIL 4 KARTU
✅ Pemain itu skip giliran

Kapan gunakan:
- Situation genting (ingin set back pemain)
- Strategic move akhir game
- Defensive play
```

**Contoh:**
```
Discard Pile: Green 8
Tangan: Red 2, Yellow 4, Wild +4

Tidak ada kartu cocok
→ Main Wild +4
→ Pilih warna baru (misal: Yellow)
→ Pemain berikutnya ambil 4 kartu
→ Skip giliran
→ Lanjut ke pemain setelahnya
```

### Kartu Ringkas

| Kartu | Efek | Strategic |
|-------|------|-----------|
| 0-9 | Cocok warna/angka | Dasar, main santai |
| Skip | Skip 1 pemain | Defensive, delay opponent |
| Reverse | Reverse direction | Chaos, unpredictable |
| +2 | Draw 2 + Skip | Punish pemain berikutnya |
| Wild | Any color | Flexible, setup |
| +4 | Draw 4 + Skip + Color | Nuclear option |

---

## 3. CARA BERMAIN

### Start Game

#### 1. Menu Utama

```
┌─────────────────────┐
│   🎮 UNO ROYALE     │
│                     │
│  [+ Buat Room]      │
│  [→ Gabung Room]    │
│  [🤖 Solo vs Bot]   │
└─────────────────────┘
```

**Pilihan:**
- **Buat Room**: Anda jadi HOST
- **Gabung Room**: Join ke room dengan kode
- **Solo vs Bot**: Play alone vs AI

#### 2. Buat Room (Host)

```
┌─────────────────────┐
│ Buat Room Baru      │
│                     │
│ Nama: [________]    │
│ Mode: [Normal ▼]    │
│ Pemain: [4 ▼]       │
│ Kartu: [7]━━━━━━    │
│ Timer: [60s ▼]      │
│                     │
│ [Buat Room]         │
│ [Kembali]           │
└─────────────────────┘
```

**Field:**
- **Nama**: Nama pemain Anda
- **Mode**: Normal / Stack Mode / Chaos Mode
- **Pemain**: 1-5 pemain
- **Kartu**: 5-10 kartu awal
- **Timer**: Turn time limit

**Result:** Dapat kode room (ex: ABC123)

#### 3. Gabung Room (Non-Host)

```
┌─────────────────────┐
│ Gabung Room         │
│                     │
│ Nama: [________]    │
│ Kode: [______]      │
│                     │
│ [Gabung]            │
│ [Kembali]           │
└─────────────────────┘
```

Minta kode room dari host.

#### 4. Lobby (Menunggu)

```
┌─────────────────────┐
│ Ruang Tunggu        │
│ Kode: ABC123        │
│ Pemain: 2/4         │
│                     │
│ ✅ Player 1 👑      │
│ ✅ Player 2         │
│ ⏳ Player 3         │
│                     │
│ [Mulai Game]        │
│ [Keluar]            │
└─────────────────────┘
```

**Host**: Klik "Mulai Game"  
**Non-Host**: Tunggu host mulai

---

### Main Game

#### Game Screen Layout

```
┌─────────────────────────────────┐
│  Player 2        Player 3        │
│  5 kartu         3 kartu         │
│─────────────────────────────────│
│         Deck        Discard      │
│         [🂠]         [🎴 Red 5]  │
│         Card        Top Card     │
│─────────────────────────────────│
│ Giliran: Player 1    Timer: 45s  │
│─────────────────────────────────│
│  Kartu Anda:                     │
│  [🎴] [🎴] [🎴] [🎴] [🎴]      │
│                                 │
│  [Ambil Kartu] [Pass] [UNO!]    │
└─────────────────────────────────┘
```

#### Game Controls

**1. Main Kartu**

```
Klik kartu di hand
→ Validasi sistem
   - Cocok? ✅ Main!
   - Tidak? ❌ Tidak bisa!
→ Kartu ke discard pile
→ Efek kartu (jika ada)
→ Giliran pemain berikutnya
```

**Syarat Mainkan Kartu:**
- Warna sama ATAU
- Angka/Simbol sama ATAU
- Kartu Wild/Wild+4

**Contoh Flow:**
```
Discard: Red 7

Tangan: [Red 2] [Yellow 5] [Green 7] [Blue Skip]

1. Klik [Green 7]
   ✅ Valid! (angka sama)
   → Kartu dimainkan
   → Discard: Green 7

2. Klik [Blue Skip]
   ❌ Tidak valid! (warna & angka beda)
   → Kartu tidak dimainkan
   → Coba lagi

3. Klik [Red 2]
   ✅ Valid! (warna sama)
   → Kartu dimainkan
   → Discard: Red 2
   → Giliran pemain berikutnya
```

**2. Ambil Kartu**

```
Saat giliran Anda:
1. Jika tidak ada kartu cocok
2. Klik tombol "Ambil Kartu"
3. Sistem ambil 1 kartu dari deck
4. Kartu masuk ke hand
5. Giliran otomatis lanjut ke pemain berikutnya

Note: Bisa langsung main kartu yang diambil
(next turn) atau lihat kartu yang ada dulu
```

**3. Pass Turn**

```
Jika sudah main kartu atau tidak mau main:
1. Klik "Pass"
2. Giliran lanjut ke pemain berikutnya

Note: Hanya bisa pass setelah main kartu
```

**4. Panggil UNO**

```
Saat tinggal 1 kartu:
1. Klik tombol "UNO!"
2. Sistem announce
3. Semua pemain tahu Anda tinggal 1 kartu
4. Lanjut dengan normal rules

Note: Jika forget UNO di next turn harus draw 2 kartu
(optional rule, bisa disabled di settings)
```

---

#### Contoh Pertandingan

```
🎮 UNO ROYALE - Match Start

Players: Alice, Bob, Charlie, Diana
Initial Cards: 7 each
Mode: Normal
Deck Count: 68 kartu

═══════════════════════════════════

TURN 1 - Alice
  Hand: Red 3, Red 5, Blue 7, Yellow 2, Green 4, Blue Skip, Wild
  Discard: Red 0 (Starting)
  Play: Red 3 → Discard: Red 3 ✅

TURN 2 - Bob
  Hand: 7 kartu
  Discard: Red 3
  Play: Red Skip → Skip Charlie!
  Next: Diana ✅

TURN 3 - Diana  
  Hand: 7 kartu (was 6 + 1 draw)
  Discard: Red Skip
  No match → Draw Card → Blue 5
  Play: Blue 5? Tidak cocok!
  Skip Giliran
  Next: Alice ✅

TURN 4 - Alice
  Hand: 6 kartu
  Discard: Blue 5
  No match → Draw Card → Blue 7
  Play: Blue 7 ✅

TURN 5 - Bob
  Hand: 7 kartu
  Discard: Blue 7
  Play: Blue +2 → Charlie draw 2 + skip!
  Next: Diana ✅

TURN 6 - Diana
  Hand: 8 kartu (7-1+2)
  Discard: Blue +2
  Play: Yellow 5 → Tidak valid!
  No valid card → Draw → Green 3
  Skip → Next: Alice ✅

...game continues...

TURN 30 - Alice
  Hand: Red 5, Wild
  Discard: Red 7
  Play: Red 5 ✅

TURN 31 - Bob
  Hand: 1 kartu
  "Bob has 1 card!"
  Discard: Red 5
  Play: Red 4 ✅

TURN 32 - Charlie
  Hand: 3 kartu
  Discard: Red 4
  Play: Red 8 ✅

TURN 33 - Diana
  Hand: 2 kartu
  Discard: Red 8
  No match → Draw → Blue 3
  Skip → Next: Alice ✅

TURN 34 - Alice
  Hand: Red 5, Wild
  Discard: Blue 3
  Play: Wild → Choose Green
  Alice: 1 kartu left

TURN 35 - Bob
  Hand: 0 kartu
  ❌ Bob LOST (sudah 0)
  Wait...

Actually:

TURN 35 - Bob
  Hand: 1 kartu (Green 7)
  Discard: Green (Wild)
  Play: Green 7 ✅

TURN 36 - Charlie
  Hand: 3 kartu
  Discard: Green 7
  Play: Green 2 ✅

TURN 37 - Diana
  Hand: 2 kartu
  Discard: Green 2
  No match → Draw
  Skip → Next: Alice ✅

TURN 38 - Alice
  Hand: Red 5, Wild
  Discard: Green X
  Play: Wild
  Alice: 1 kartu (Red 5)
  All: "Alice! UNO!"

TURN 39 - Bob
  Hand: 1 kartu (Green 7)
  Discard: Green (Wild)
  Play: Can't match
  Draw → 2 kartu
  Skip → Next: Charlie ✅

TURN 40 - Charlie
  Hand: 3 kartu
  Play: Draw, No match
  Skip → Next: Diana ✅

TURN 41 - Diana
  Hand: 2 kartu
  Play: Green 4 ✅

TURN 42 - Alice
  Hand: 1 kartu (Red 5)
  Discard: Green 4
  No match → Draw → Yellow 5
  Play: Yellow 5 ✅
  Alice: 0 kartu!

🎉 🎉 🎉 ALICE WINS! 🎉 🎉 🎉

═══════════════════════════════════

LEADERBOARD:
1️⃣ Alice - 100 points
2️⃣ Bob - 75 points
3️⃣ Charlie - 50 points
4️⃣ Diana - 25 points

Game Time: 5 min 32 sec
Total Cards Played: 42
```

---

## 4. GAME MODES

### Normal Mode

**Classic UNO dengan aturan standar.**

```
Rules:
✅ Standard rules apply
✅ +2 dan +4 tidak stackable
✅ Kartu bisa main jika cocok
✅ Win condition: First to 0 cards

Strategy:
- Save Wild untuk genting
- Main Skip/Reverse di waktu tepat
- Perhatikan kartu pemain lain
```

### Stack Mode

**Mode advanced - draw cards bisa "di-stack"**

```
Rules:
✅ Saat kena +2 / +4:
   - Bisa stack +2 / +4 lagi
   - Draw count accumulate
   - Hingga max tertentu

Example:
A mainkan +2 → B draw 2
B ada +2 → B mainkan +2 (stack!)
Sekarang C draw 4 (2+2)

Strategy:
- Timing is crucial
- Save special cards
- Risk vs reward
- Can turn games upside down!
```

### Chaos Mode

**Random effects setiap turn**

```
Rules:
✅ Standard rules
✅ Setiap turn ada random event:
   - Double draw (draw 2 sekaligus)
   - Card steal (ambil kartu dari pemain)
   - Reverse twice (double reverse)
   - Mystery card (kartu random)
   - Swap hands (tukar tangan dengan pemain)
   - Skip 2 pemain
   - dll

Strategy:
- Unpredictable
- Fun & chaotic
- Luck-based
- Every moment can change!

Best For:
- Casual play
- Party/fun
- Beginners
- Exciting matches
```

---

## 5. TIPS & STRATEGI

### Beginner Tips

1. **Pelajari Kartu**
   - Tahu efek setiap kartu
   - Warna & angka penting
   - Wild = powerful

2. **Main Santai**
   - Jangan rush
   - Observe pemain lain
   - Learn patterns

3. **Manage Hand**
   - Perhatikan jumlah kartu pemain
   - Jangan expose semua kartu strategy
   - Keep options open

4. **UNO Call**
   - Jangan lupa UNO saat 1 kartu!
   - Announce untuk psikologis
   - Watch when others get 1 card

### Intermediate Strategies

1. **Color Management**
   ```
   - Main warna yang jarang
   - Simpan warna majority
   - Observe discard pile trend
   ```

2. **Special Card Timing**
   ```
   - Skip: Saat pemain leading
   - Reverse: Change momentum
   - +2: Defensive move
   - +4: Last resort
   ```

3. **Psychological Play**
   ```
   - Main bold untuk intimidate
   - Observe opponent patterns
   - Predict next plays
   - Memory game!
   ```

4. **Deck Reading**
   ```
   - Track played cards
   - Know available colors
   - Estimate wild locations
   - Calculate probabilities
   ```

### Advanced Tactics

1. **Hand Balancing**
   ```
   - Diverse colors in hand
   - Mix action & number cards
   - Strategic retention
   - Flexibility
   ```

2. **Momentum Control**
   ```
   - Seize early lead
   - Maintain consistency
   - Avoid pattern exposure
   - React vs Predict
   ```

3. **Multi-Player Dynamics**
   ```
   - Monitor all hands
   - Focus on threats
   - Alliance building
   - Team play (if allowed)
   ```

4. **End Game Strategy**
   ```
   - Count remaining cards
   - Focus on winners
   - Block obvious plays
   - Final push timing
   - UNO psychology
   ```

### Common Mistakes to Avoid

❌ **Mistake**: Main Wild terlalu cepat  
✅ **Fix**: Save untuk critical moments

❌ **Mistake**: Lupa UNO saat 1 kartu  
✅ **Fix**: Always call UNO immediately

❌ **Mistake**: Expose hand strategy  
✅ **Fix**: Mix plays, unpredictable

❌ **Mistake**: Ignore other players  
✅ **Fix**: Monitor all hands

❌ **Mistake**: Risky with +4  
✅ **Fix**: Use strategically

---

## 6. UI GUIDE

### Main Game Screen

#### Top Section: Opponent Info
```
┌────────────┬────────────┬────────────┐
│  Player 2  │  Player 3  │  Player 4  │
│  5 kartu   │  3 kartu   │  7 kartu   │
└────────────┴────────────┴────────────┘
```

Shows:
- Opponent names
- Card count
- Active player (highlight)
- UNO status (flashing if 1 card)

#### Middle Section: Table
```
┌──────────────────┬──────────────────┐
│  Deck Pile       │  Discard Pile    │
│  [Cards left]    │  [Top Card]      │
│                  │                  │
│  Info:           │                  │
│  Turn: Player 1  │                  │
│  Timer: 45s      │                  │
│  Mode: Normal    │                  │
└──────────────────┴──────────────────┘
```

Shows:
- Current deck count
- Top discard card
- Current player
- Turn timer
- Game mode

#### Bottom Section: Your Hand
```
┌─────────────────────────────────┐
│ Kartu Anda:                     │
│ [🎴] [🎴] [🎴] [🎴] [🎴]      │
│                                 │
│ [Ambil Kartu] [Pass] [UNO!]    │
└─────────────────────────────────┘
```

Shows:
- Your cards (colorful)
- Play buttons
- Current actions available

### Color Indicators

```
🔴 Red   = Red cards
🟡 Yellow = Yellow cards  
🟢 Green = Green cards
🔵 Blue  = Blue cards
⚫ Black = Wild cards
```

### Button States

```
✅ Enabled (clickable)
  └─ Can perform action
  
❌ Disabled (grayed out)
  └─ Cannot perform now
  
⏳ Loading
  └─ Action in progress
  
🌟 Highlighted
  └─ Recommended action
```

### Visual Feedback

```
Mouse Hover:
→ Card lifts up
→ Button brightens
→ Info tooltip shows

Click:
→ Animation plays
→ Sound effect
→ Action executes

Valid Card:
→ Bright, clear
→ Easy to interact

Invalid Card:
→ Faded appearance
→ Can't click
→ Message shows
```

---

## 🏆 WINNING TIPS SUMMARY

| Aspect | Tip |
|--------|-----|
| **Early Game** | Learn opponents, diverse hand |
| **Mid Game** | Control colors, manage resources |
| **Late Game** | Block leaders, save Wild |
| **Card Timing** | Patience over rushing |
| **Psychology** | Observe patterns, play bold |
| **Risk Management** | Risk vs Reward balance |
| **Hand Management** | Flexibility & adaptability |

---

## ❓ FAQ

**Q: Bisa mainkan 2 kartu sekaligus?**  
A: Tidak, 1 kartu per turn

**Q: Bisa draw sendiri saat cocok?**  
A: Tidak, hanya mainkan atau draw jika tidak cocok

**Q: Gimana kalo Deck habis?**  
A: Shuffle discard pile jadi deck baru (minus top card)

**Q: +2 dan +4 bisa di-stack di Normal mode?**  
A: Tidak, hanya di Stack mode

**Q: Kartu Wild bisa declare warna apapun?**  
A: Ya, Wild = any color, +4 juga

**Q: Gimana reset permainan?**  
A: Back to menu → Create/Join room baru

---

**Selamat bermain! 🎮🎉**

Good luck & have fun!

Last Updated: May 10, 2026
