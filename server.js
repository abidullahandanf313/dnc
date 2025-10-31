const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Hardcoded credentials (in production, use environment variables or a database)
const VALID_USERNAME = "AbidBLA";
const VALID_PASSWORD = "Abid@123";

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Username and password are required'
        });
    }
    
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        return res.json({
            success: true,
            message: 'Login successful'
        });
    } else {
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
    console.log(`Server running on port ${PORT}`);
});
