const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Hardcoded credentials
const VALID_USERNAME = "AbidBLA";
const VALID_PASSWORD = "Abid@123";

// Login endpoint
app.post('/api/login', (req, res) => {
    console.log('Login attempt:', req.body);
    
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Username and password are required'
        });
    }
    
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        console.log('Login successful for user:', username);
        return res.json({
            success: true,
            message: 'Login successful'
        });
    } else {
        console.log('Login failed for user:', username);
        return res.status(401).json({
            success: false,
            message: 'Invalid username or password'
        });
    }
});

// Serve the main HTML file for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📁 Serving static files from: ${path.join(__dirname, 'public')}`);
});
