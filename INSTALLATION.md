# 💻 INSTALLATION GUIDE - UNO ROYALE

Quick & easy setup guide untuk mulai bermain UNO Royale.

---

## ⚡ QUICKSTART (5 MENIT)

### For Windows/Mac/Linux

```bash
# 1. Download & Extract Project
# Donwload semua file atau git clone

# 2. Open Terminal/Command Prompt
# Navigate ke folder uno-royale
cd uno-royale

# 3. Install Dependencies
npm install

# 4. Start Server
npm start

# 5. Open Browser
# Go to: http://localhost:3000

# ✅ DONE! Game siap dimainkan!
```

---

## 📋 REQUIREMENTS

### Minimum System Requirements

| Requirement | Minimum | Recommended |
|------------|---------|-------------|
| **OS** | Windows 7+ / Mac 10.10+ / Linux | Windows 10 / Mac 12 / Linux Latest |
| **RAM** | 512 MB | 2 GB+ |
| **Storage** | 100 MB | 500 MB+ |
| **Browser** | Chrome 60+ / Firefox 55+ | Chrome 90+ / Firefox 88+ |
| **Network** | 1 Mbps | 10 Mbps+ |

### Software Requirements

#### Node.js & npm
- **Node.js v14+** ([Download](https://nodejs.org/))
- Comes with npm automatically
- Check: `node --version` && `npm --version`

#### Text Editor (Optional)
- VS Code (Recommended)
- Sublime Text
- Any text editor

#### Git (Optional)
- For cloning repository
- [Download Git](https://git-scm.com/)

---

## 🔧 STEP-BY-STEP INSTALLATION

### Step 1: Install Node.js

#### Windows
1. Go to [nodejs.org](https://nodejs.org/)
2. Download "LTS" version (Recommended)
3. Run installer (.msi)
4. Follow wizard (default settings OK)
5. Restart computer

#### Mac
```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
```

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Verify Installation

```bash
node --version
# Should show: v14.x.x or higher

npm --version
# Should show: 6.x.x or higher
```

---

### Step 2: Get Project Files

#### Option A: Download ZIP
1. Go to repository
2. Click "Code" → "Download ZIP"
3. Extract to folder
4. Rename to "uno-royale" (optional)

#### Option B: Git Clone
```bash
git clone https://github.com/yourusername/uno-royale.git
cd uno-royale
```

#### Option C: Manual Copy
Create folder with all files:
```
uno-royale/
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
└── README.md
```

---

### Step 3: Install Dependencies

Open Terminal/Command Prompt in project folder:

```bash
# Navigate to project folder
cd uno-royale

# Install npm packages
npm install

# Output should show:
# added X packages in Y seconds
```

**What gets installed:**
- express (web server)
- socket.io (real-time communication)
- cors (cross-origin requests)

---

### Step 4: Start Server

```bash
# Start server
npm start

# Output:
# 🎮 UNO Royale Server running on port 3000
# Environment: development
```

**Keep terminal open!** Server must running.

---

### Step 5: Open Game

Open your browser:
```
http://localhost:3000
```

You should see:
- ✅ Loading screen (2 seconds)
- ✅ Menu dengan logo UNO besar
- ✅ 3 buttons: Buat Room, Gabung, Solo

**Congrats! Installation berhasil! 🎉**

---

## 🎮 FIRST PLAYTHROUGH

### Solo Test

1. Click "Solo vs Bot"
2. Setup game:
   - Name: Your Name
   - Mode: Normal
   - Players: 1
   - Cards: 7
   - Timer: 60
   - Click "Buat Room"
3. Click "Mulai Game"
4. Game starts!

### Multiplayer Test

**In Same Computer:**

1. **Terminal 1**: `npm start` (Server running)
2. **Browser Tab 1**: `http://localhost:3000` (Player 1)
3. **Browser Tab 2**: `http://localhost:3000` (Player 2)

**Player 1:**
- Click "Buat Room"
- Setup & create
- Get room code

**Player 2:**
- Click "Gabung Room"
- Enter name
- Paste room code
- Join

**Player 1:**
- Click "Mulai Game"
- Start playing!

---

## ❓ TROUBLESHOOTING INSTALLATION

### "node: command not found"

**Problem:** Node.js not installed atau not in PATH

**Solution:**
1. Download & install Node.js again from nodejs.org
2. Restart computer
3. Verify: `node --version`

### "npm: command not found"

**Problem:** npm not installed

**Solution:**
- npm comes with Node.js
- Reinstall Node.js

### "npm install" stuck/slow

**Problem:** Internet issue atau package registry issue

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Retry install
npm install

# Or use different registry
npm install --registry https://registry.npmmirror.com
```

### "Port 3000 already in use"

**Problem:** Something already using port 3000

**Solution:**

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

**Mac/Linux:**
```bash
lsof -i :3000
kill -9 [PID_NUMBER]
```

Or change port in server.js:
```javascript
const PORT = process.env.PORT || 5000; // Change 3000 → 5000
```

### Browser shows "Cannot GET /"

**Problem:** Server not running atau wrong URL

**Solution:**
1. Check terminal - `npm start` running?
2. URL correct? `http://localhost:3000`
3. Ctrl+Shift+Delete (clear cache)
4. Refresh page

### "Socket.io connection failed"

**Problem:** Frontend ↔ Backend connection issue

**Solution:**
1. Server running? (`npm start`)
2. Same URL/port?
3. Firewall blocking?
4. Check browser console (F12)

---

## 📁 PROJECT STRUCTURE EXPLAINED

```
uno-royale/                    # Root folder
├── index.html                 # Main HTML file
│   └── Contains page structure + form
├── style.css                  # Styling & animations
│   └── Dark neon gaming theme
├── script.js                  # Frontend JavaScript
│   └── Game logic + Socket.io client
├── server.js                  # Backend Node.js
│   └── Game server + Socket.io
├── package.json               # Project dependencies
│   └── npm configuration
├── README.md                  # Project documentation
├── DEPLOYMENT.md              # Deployment guides
├── HOW_TO_PLAY.md            # Game rules & tips
└── .gitignore                # Git ignore file
```

---

## 🔌 CHECK YOUR SETUP

### Verify Everything Works

```bash
# 1. Check Node version
node --version
# Expected: v14.x.x or higher

# 2. Check npm version  
npm --version
# Expected: 6.x.x or higher

# 3. Check project folder
ls
# Should show: index.html, style.css, script.js, server.js, package.json

# 4. Check dependencies installed
ls node_modules
# Should have: express, socket.io, cors

# 5. Start server
npm start
# Should show: 🎮 UNO Royale Server running on port 3000

# 6. Open browser
# http://localhost:3000
# Should show: UNO ROYALE logo + 3 buttons
```

---

## 🚀 NEXT STEPS

### Local Development
```bash
npm start
# Edit files → Refresh browser to see changes
```

### Deploy to Cloud
- See [DEPLOYMENT.md](DEPLOYMENT.md) for guides
- Replit (easiest)
- Heroku
- Railway
- GitHub Pages + Backend

### Learn More
- [README.md](README.md) - Full documentation
- [HOW_TO_PLAY.md](HOW_TO_PLAY.md) - Game rules
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy guides

---

## 📞 SUPPORT

### Common Issues Fast Fix

| Issue | Fix |
|-------|-----|
| Port in use | Change PORT in server.js |
| npm install slow | `npm cache clean --force` |
| Socket not connecting | Check server running & URL |
| Game lag | Close other browser tabs |
| Styles not loading | Hard refresh (Ctrl+Shift+R) |

### Get Help

1. Check README.md FAQ section
2. Check HOW_TO_PLAY.md for rules
3. Check DEPLOYMENT.md for deploy issues
4. Check browser console (F12 → Console)
5. GitHub Issues

---

## ✅ CHECKLIST

- [ ] Node.js installed (v14+)
- [ ] npm installed
- [ ] Project files downloaded/cloned
- [ ] `npm install` completed
- [ ] No errors in installation
- [ ] `npm start` running
- [ ] Browser opens `http://localhost:3000`
- [ ] Game loads without errors
- [ ] Logo visible & buttons clickable
- [ ] Can create room successfully
- [ ] Can join room with code
- [ ] Can start game
- [ ] Can play cards without crash

✅ **All checked? You're ready to play!** 🎮

---

## 🎓 LEARNING RESOURCES

### Node.js & Express
- [Node.js Guide](https://nodejs.org/en/docs/)
- [Express Tutorial](https://expressjs.com/)

### Socket.io
- [Socket.io Docs](https://socket.io/docs/v4/socket-io-protocol/)
- [Socket.io Tutorial](https://www.youtube.com/results?search_query=socket.io+tutorial)

### Web Development
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3Schools](https://www.w3schools.com/)

---

## 💡 TIPS

✅ **Keep terminal running** while developing  
✅ **Use Ctrl+C** to stop server  
✅ **Use Ctrl+Shift+R** for hard refresh (clear cache)  
✅ **Check console** (F12) for errors  
✅ **Use different ports** if 3000 taken  
✅ **Monitor logs** for debugging  

---

**Installation Complete! Enjoy playing UNO Royale! 🎮🎉**

Last Updated: May 10, 2026  
Version: 1.0.0
