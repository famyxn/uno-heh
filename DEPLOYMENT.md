# 🚀 DEPLOYMENT GUIDE - UNO ROYALE

Panduan lengkap untuk deploy UNO Royale ke berbagai platform.

---

## 📍 TABLE OF CONTENTS

1. [Local Development](#1-local-development)
2. [Replit](#2-replit)
3. [Heroku](#3-heroku)
4. [Railway](#4-railway)
5. [Vercel + Railway](#5-vercel--railway-combination)
6. [GitHub Pages](#6-github-pages-static-frontend)
7. [Docker](#7-docker-optional)
8. [Troubleshooting](#troubleshooting)

---

## 1. LOCAL DEVELOPMENT

### Requirement
- Node.js v14+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)
- Git (optional)

### Setup

```bash
# 1. Download files
# Save semua file ke folder: uno-royale/

# 2. Navigate ke folder
cd uno-royale

# 3. Install dependencies
npm install

# 4. Run server
npm start

# Output:
# 🎮 UNO Royale Server running on port 3000
# Environment: development

# 5. Open browser
# http://localhost:3000
```

### Development Mode (dengan auto-reload)

```bash
npm run dev
```

Pastikan Anda punya `nodemon` di package.json (sudah included).

### Testing Multiplayer Locally

Buka multiple browser windows:
- Player 1: `http://localhost:3000`
- Player 2: `http://localhost:3000` (tab baru)
- Player 3: `http://localhost:3000` (tab baru)

---

## 2. REPLIT

Platform paling mudah untuk deployment pertama kali!

### Step 1: Setup Replit Project

1. Go to [replit.com](https://replit.com)
2. Click "Create" button
3. Select "Node.js" template
4. Name project: `uno-royale`
5. Click "Create Replit"

### Step 2: Setup Project Structure

Replit akan membuat beberapa file default. Update struktur:

```
uno-royale/
├── index.js (rename dari server.js)
├── package.json
├── style.css (new)
├── script.js (new)
├── public/
│   └── index.html (new)
```

### Step 3: Create Files

1. **Edit `package.json`**
   - Copy dari `package.json` provided

2. **Buat `public/` folder**
   - Click "New Folder"
   - Name: `public`

3. **Buat `public/index.html`**
   - Copy isi dari `index.html`
   - Update Socket.io URL:
   ```javascript
   // Di script section, ganti:
   // const socket = io();
   // dengan:
   const socket = io(window.location.href);
   ```

4. **Buat `public/style.css`**
   - Copy isi dari `style.css`

5. **Buat `public/script.js`**
   - Copy isi dari `script.js`

6. **Rename `index.js`** (atau create new)
   - Copy isi dari `server.js`
   - Update untuk serve static files:

```javascript
// Add di server.js setelah middleware
app.use(express.static(path.join(__dirname, 'public')));

// Pastikan route terakhir:
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
```

### Step 4: Install Dependencies

Di Replit console, run:
```bash
npm install
```

### Step 5: Run Server

Click "Run" button atau ketik:
```bash
npm start
```

### Step 6: Get URL

Replit akan generate URL seperti:
```
https://uno-royale.[username].repl.co
```

Update Socket.io URL di `public/script.js`:
```javascript
const socket = io('https://uno-royale.[username].repl.co');
```

### ⚠️ Important: Keep Replit Alive

Free tier Replit akan sleep setelah 60 menit. Untuk keep alive:

**Option A: Replit Pro** ($7/month)
- Unlimited uptime
- Better performance

**Option B: Uptimerobot (FREE)**
1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Sign up free
3. Create "HTTP Monitor"
4. URL: `https://uno-royale.[username].repl.co`
5. Check frequency: 5 minutes
6. Done! Server tetap hidup

---

## 3. HEROKU

Heroku adalah platform yang reliable untuk production.

### ⚠️ Note: Heroku free tier akan sunset Nov 2022
Pertimbangkan Railway atau Render sebagai alternatif.

### Step 1: Create Heroku Account

1. Go to [heroku.com](https://heroku.com)
2. Sign up
3. Verify email

### Step 2: Install Heroku CLI

**Mac/Linux:**
```bash
brew tap heroku/brew && brew install heroku
```

**Windows:**
- Download dari [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
- Run installer

**Verify installation:**
```bash
heroku --version
```

### Step 3: Login to Heroku

```bash
heroku login
# Browser akan terbuka
# Masuk dengan akun Anda
# Kembali ke terminal
```

### Step 4: Create Heroku App

```bash
# Navigate ke project folder
cd uno-royale

# Create app
heroku create uno-royale-[username]
# Ganti [username] dengan username unik Anda

# Contoh: heroku create uno-royale-john-2024
```

### Step 5: Add Heroku Config

```bash
# Set environment
heroku config:set NODE_ENV=production

# Check config
heroku config
```

### Step 6: Deploy

```bash
# Using Git (recommended)
git init
git add .
git commit -m "Initial UNO Royale deployment"
git push heroku main
# atau
git push heroku master

# Heroku akan build dan deploy otomatis
```

### Step 7: Monitor

```bash
# View logs
heroku logs --tail

# Open app
heroku open

# Check status
heroku status
```

### Step 8: Scale Dynos (Optional)

```bash
# View current dynos
heroku ps

# Scale to 1 web dyno
heroku ps:scale web=1
```

### Troubleshooting Heroku

**App crashes:**
```bash
heroku logs --tail
# Check error messages
```

**Port issues:**
```bash
# Ensure server.js menggunakan process.env.PORT
const PORT = process.env.PORT || 3000;
```

**Dependency issues:**
```bash
# Update package-lock.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push heroku main
```

---

## 4. RAILWAY

Railway adalah alternatif Heroku yang lebih modern dan generous.

### Step 1: Setup Railway

1. Go to [railway.app](https://railway.app)
2. Sign up dengan GitHub
3. Create new project

### Step 2: Connect Git

1. Click "Deploy from GitHub"
2. Select uno-royale repository
3. Authorize Railway
4. Deploy dimulai otomatis

### Step 3: Environment Variables

1. Di Railway dashboard, go to Settings
2. Add variables:
```
NODE_ENV=production
PORT=5000
```

### Step 4: Get URL

Railway akan assign domain:
```
https://[project-name]-production.up.railway.app
```

### Step 5: Update Socket.io URL

```javascript
// Di script.js
const socket = io('https://[project-name]-production.up.railway.app');
```

### Keuntungan Railway:
- ✅ FREE tier generous
- ✅ Auto-deploys dari Git
- ✅ Built-in domain
- ✅ Easy scaling
- ✅ Good performance

---

## 5. VERCEL + RAILWAY (COMBINATION)

Gunakan Vercel untuk frontend (hosting CDN) + Railway untuk backend.

### Frontend di Vercel

1. Push ke GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import project
4. Deploy otomatis

**Vercel Config (vercel.json):**
```json
{
  "rewrites": [
    {
      "source": "/:path*",
      "destination": "/:path*"
    }
  ]
}
```

### Backend di Railway

1. Setup Railway (lihat section 4)
2. Copy production URL

### Connect Frontend to Backend

**Di Vercel environment:**

1. Settings → Environment Variables
2. Add:
```
REACT_APP_SOCKET_URL=https://[railway-app].up.railway.app
```

**Di frontend (script.js):**
```javascript
const socket = io(process.env.REACT_APP_SOCKET_URL);
```

### Benefits:
- ✅ Frontend di CDN global (fast)
- ✅ Backend dedicated (reliable)
- ✅ Free tier available
- ✅ Easy to scale separately

---

## 6. GITHUB PAGES (STATIC FRONTEND)

⚠️ Hanya untuk frontend static. Backend harus di-host terpisah.

### Step 1: Setup GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/[username]/uno-royale.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to repository Settings
2. Scroll to "Pages"
3. Select "main" branch
4. Select folder "/ (root)"
5. Save

### Step 3: GitHub Pages URL

Site akan live di:
```
https://[username].github.io/uno-royale
```

### Step 4: Connect to Backend

Update Socket.io URL di script.js:
```javascript
const socket = io('https://[backend-server].up.railway.app');
// atau Heroku, Replit, dll
```

### ⚠️ Limitations:
- Frontend only (no Node.js backend)
- Backend harus di-host terpisah
- Limited dynamic features

---

## 7. DOCKER (OPTIONAL)

Untuk deployment advanced dengan Docker.

### Create Dockerfile

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### Create .dockerignore

```
node_modules
npm-debug.log
.git
.gitignore
.env
```

### Build & Run

```bash
# Build image
docker build -t uno-royale:latest .

# Run container
docker run -p 3000:3000 uno-royale:latest

# Or with environment
docker run -e PORT=5000 -p 5000:5000 uno-royale:latest
```

### Docker Compose (Optional)

```yaml
version: '3.8'
services:
  uno-royale:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    restart: unless-stopped
```

Run dengan:
```bash
docker-compose up
```

---

## TROUBLESHOOTING

### Socket.io Connection Issues

**Problem:** "Failed to connect to WebSocket"

**Solution:**
1. Check Socket.io URL di script.js
2. CORS settings di server.js
3. Firewall/proxy blocking WebSocket

```javascript
// server.js
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});
```

### Game Lag / Slow

1. Check internet connection
2. Server response time (`heroku logs`)
3. Reduce client-side animations
4. Check for memory leaks

### Port Already in Use

```bash
# Kill process on port 3000
# Mac/Linux:
lsof -i :3000
kill -9 [PID]

# Windows:
netstat -ano | findstr :3000
taskkill /PID [PID] /F
```

### Static Files Not Loading

**Issue:** CSS/JS tidak load

**Fix di server.js:**
```javascript
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
```

### Environment Variables Not Working

```bash
# Verify .env file exists (local)
cat .env

# For Heroku:
heroku config

# For Railway:
# Check in dashboard Settings

# For Replit:
# Set in Secrets tab
```

### Database Connection (Future)

Jika nanti add database:

**MongoDB Atlas (Cloud):**
```bash
heroku config:set MONGODB_URI=mongodb+srv://...
```

**PostgreSQL:**
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

### Deploy Fails

```bash
# Clear build cache
heroku builds:cache:purge

# Rebuild
git push heroku main

# Check logs
heroku logs --tail

# Reset app
heroku restart
```

---

## 📊 DEPLOYMENT COMPARISON

| Platform | Cost | Uptime | Speed | Ease | Recommendation |
|----------|------|--------|-------|------|-----------------|
| **Local** | Free | Dev only | N/A | Easy | Development |
| **Replit** | Free* | 60min | Medium | Very Easy | Learning |
| **Heroku** | Paid | 99.9% | Fast | Medium | Production |
| **Railway** | Free/Paid | 99.9% | Fast | Medium | Recommended |
| **Vercel** | Free | 99.9% | Very Fast | Easy | Frontend |
| **GitHub Pages** | Free | 99.9% | Fast | Easy | Static only |

*Replit free tier akan sleep

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] All files present (index.html, style.css, script.js, server.js, package.json)
- [ ] package.json has correct dependencies
- [ ] PORT set correctly (process.env.PORT || 3000)
- [ ] CORS enabled in Socket.io
- [ ] Static files serving (express.static)
- [ ] Environment variables set (.env / platform config)
- [ ] Tested locally (npm start)
- [ ] Git repository initialized
- [ ] Backend URL in frontend Socket.io
- [ ] Logs monitoring enabled
- [ ] Testing with multiple users
- [ ] Performance optimized
- [ ] Security headers added (if needed)
- [ ] Uptime monitoring configured

---

## 🎯 QUICK DEPLOYMENT COMMANDS

### Replit
```
1. Create Node.js project
2. npm install
3. npm start
```

### Heroku
```bash
heroku login
heroku create uno-royale-[name]
git push heroku main
heroku logs --tail
```

### Railway
```bash
1. Connect GitHub
2. Auto-deploy
3. Get URL from dashboard
```

### Local
```bash
npm install
npm start
```

---

## 📞 SUPPORT & RESOURCES

- **Node.js Docs**: https://nodejs.org/docs/
- **Express Docs**: https://expressjs.com/
- **Socket.io Docs**: https://socket.io/docs/
- **Heroku Docs**: https://devcenter.heroku.com/
- **Railway Docs**: https://docs.railway.app/

---

**Happy Deploying! 🚀**

Last Updated: May 10, 2026  
Version: 1.0.0
