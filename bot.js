const bedrock = require('bedrock-protocol');
const http = require('http');

// Мини-сервер, чтобы Render не отключал бота
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running');
}).listen(process.env.PORT || 3000);

function startBot() {
  const client = bedrock.createClient({
    host: 'IP_ВАШЕГО_СЕРВЕРА', // Например: myserver.aternos.me
    port: 19132,               // Порт сервера
    username: 'AFK_Bot',       // Имя бота
    offline: true              // Без входа в Microsoft
  });

  client.on('spawn', () => {
    console.log('Бот успешно зашел на сервер!');
  });

  client.on('disconnect', (packet) => {
    console.log('Отключен. Перезаход через 10 секунд...', packet);
    setTimeout(startBot, 10000);
  });

  client.on('error', (err) => {
    console.log('Ошибка:', err.message);
  });
}

startBot();
