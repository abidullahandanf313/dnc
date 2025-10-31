// api/login.js - Vercel Serverless Function
const VALID_USERNAME = "AbidBLA";
const VALID_PASSWORD = "Abid@123";

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    // Parse the JSON body
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const { username, password } = JSON.parse(body);

        if (!username || !password) {
          return res.status(400).json({
            success: false,
            message: 'Username and password are required'
          });
        }

        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
          return res.status(200).json({
            success: true,
            message: 'Login successful'
          });
        } else {
          return res.status(401).json({
            success: false,
            message: 'Invalid username or password'
          });
        }
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        return res.status(400).json({
          success: false,
          message: 'Invalid JSON in request body'
        });
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
