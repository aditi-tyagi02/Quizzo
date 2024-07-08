// server.js
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes for your HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'create_quiz.html'));
});

app.get('/quiz.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'quiz.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
