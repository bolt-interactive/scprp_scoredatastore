const express = require('express');
const app = express();
app.use(express.json());

// This object acts as a temporary database
let playerScores = {};

// Get a player's score
app.get('/score/:username', (req, res) => {
    const user = req.params.username;
    const score = playerScores[user] || 0;
    res.json({ username: user, score: score });
});

// Save a player's score
app.post('/save', (req, res) => {
    const { username, score } = req.body;
    if (!username) return res.status(400).send("Missing username");
    
    playerScores[username] = score;
    console.log(`Saved score: ${score} for ${username}`);
    res.json({ status: "success" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
