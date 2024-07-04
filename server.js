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

// Endpoint to save the cart data
app.post('/save-cart', (req, res) => {
  const cartData = req.body;
  const filePath = path.join(__dirname, 'cart.json');

  fs.writeFile(filePath, JSON.stringify(cartData, null, 2), (err) => {
    if (err) {
      console.error("Error writing file:", err);
      res.status(500).json({ success: false, message: 'Failed to save cart data' });
    }
    else {
      res.json({ success: true, message: 'Cart data saved successfully' });
    }
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