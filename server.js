// Libraries (npm install express body-parser)
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

app.post('/save-users', (req, res) => {
  const users = req.body;

  fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error('Error writing to users.json:', err);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    res.json({ success: true });
  });
});

// Serve the index.html file at the root URL
app.get('/', (res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});