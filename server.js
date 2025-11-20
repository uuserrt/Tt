const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database
let emoteLogs = [];
let teams = ['TEST123', 'DEMO456', 'TEAM007'];

// Serve frontend
app.use(express.static(path.join(__dirname, '../')));

// API Routes
app.post('/api/send-emote', (req, res) => {
    const { server, teamCode, uid1, emoteId, emoteName } = req.body;
    
    console.log('🎮 Emote Received:', { teamCode, uid1, emoteName });
    
    // Validate team code
    if (!teams.includes(teamCode)) {
        return res.json({ 
            success: false, 
            message: '❌ Invalid team code! Use TEST123 or DEMO456' 
        });
    }
    
    // Save to logs
    const logEntry = {
        id: Date.now(),
        server,
        teamCode, 
        uid1,
        emoteId,
        emoteName,
        timestamp: new Date().toLocaleString()
    };
    
    emoteLogs.push(logEntry);
    
    res.json({ 
        success: true, 
        message: `✅ ${emoteName} successfully delivered to game server!`,
        data: logEntry
    });
});

app.post('/api/validate-team', (req, res) => {
    const { teamCode } = req.body;
    
    if (!teamCode) {
        return res.json({ 
            success: false, 
            message: 'Team code is required' 
        });
    }
    
    const isValid = teams.includes(teamCode);
    
    res.json({ 
        success: isValid, 
        message: isValid ? '✅ Valid team code! Ready to send emotes.' : '❌ Invalid team code!'
    });
});

app.get('/api/stats', (req, res) => {
    const totalEmotes = emoteLogs.length;
    const today = new Date().toDateString();
    const todayEmotes = emoteLogs.filter(log => 
        new Date(log.timestamp).toDateString() === today
    ).length;
    
    // Find popular emote
    const emoteCount = {};
    emoteLogs.forEach(log => {
        emoteCount[log.emoteName] = (emoteCount[log.emoteName] || 0) + 1;
    });
    
    let popularEmote = 'None';
    let maxCount = 0;
    for (const [emote, count] of Object.entries(emoteCount)) {
        if (count > maxCount) {
            maxCount = count;
            popularEmote = emote;
        }
    }
    
    res.json({
        success: true,
        totalEmotes,
        todayEmotes,
        popularEmote
    });
});

app.get('/api/logs', (req, res) => {
    res.json({
        success: true,
        logs: emoteLogs.reverse()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 CZY CHEATS Server Started!`);
    console.log(`📍 Frontend: http://localhost:${PORT}/frontend.html`);
    console.log(`📍 API: http://localhost:${PORT}/api`);
    console.log(`✅ Valid Team Codes: ${teams.join(', ')}`);
    console.log(`📱 Access from mobile: http://YOUR-IP:${PORT}/frontend.html`);
});

// Handle errors
process.on('uncaughtException', (err) => {
    console.log('❌ Server Error:', err);
});