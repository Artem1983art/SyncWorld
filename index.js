const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

const bot = mineflayer.createBot({
  host: 'SyncWorld.aternos.me', 
  port: 25565,
  username: 'DonateBot',
  version: '1.16.5'
});

app.get('/', (req, res) => {
  res.send('OK');
});

app.get('/give', (req, res) => {
  const { player, rank } = req.query;
  if (player && rank) {
    bot.chat(`/lp user ${player} parent set ${rank}`);
    return res.send('Success');
  }
  res.send('Error');
});

const port = process.env.PORT || 10000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}`);
});
