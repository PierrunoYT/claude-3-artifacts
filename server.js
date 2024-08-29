const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;
const maxPort = 3010; // Maximum port number to try
let currentPort = port;

app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.post('/update-env', async (req, res) => {
  const { REACT_APP_OPENROUTER_API_KEY } = req.body;

  if (!REACT_APP_OPENROUTER_API_KEY) {
    return res.status(400).json({ success: false, message: 'API key is required' });
  }

  const envPath = path.join(__dirname, '.env');
  const envContent = `REACT_APP_OPENROUTER_API_KEY=${REACT_APP_OPENROUTER_API_KEY}\n`;

  try {
    await fs.writeFile(envPath, envContent);
    
    // Reload environment variables
    dotenv.config();
    
    res.json({ success: true, message: 'API key updated successfully' });
  } catch (err) {
    console.error('Error writing to .env file:', err);
    res.status(500).json({ success: false, message: 'Failed to update .env file' });
  }
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

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
}

startServer(currentPort);
