const express = require('express');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;
const maxPort = 3010; // Maximum port number to try
let currentPort = port;

app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.post('/update-env', (req, res) => {
  const { REACT_APP_OPENROUTER_API_KEY } = req.body;

  if (!REACT_APP_OPENROUTER_API_KEY) {
    return res.status(400).json({ success: false, message: 'API key is required' });
  }

  const envPath = path.join(__dirname, '.env');
  const envContent = `REACT_APP_OPENROUTER_API_KEY=${REACT_APP_OPENROUTER_API_KEY}\n`;

  fs.writeFile(envPath, envContent, (err) => {
    if (err) {
      console.error('Error writing to .env file:', err);
      return res.status(500).json({ success: false, message: 'Failed to update .env file' });
    }
    
    // Reload environment variables
    dotenv.config();
    
    res.json({ success: true, message: 'API key updated successfully' });
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying next port...`);
      if (port < maxPort) {
        startServer(port + 1);
      } else {
        console.error('No available ports found. Please close some applications and try again.');
        process.exit(1);
      }
    } else {
      console.error('Error starting server:', err);
      process.exit(1);
    }
  });
}

startServer(currentPort);
