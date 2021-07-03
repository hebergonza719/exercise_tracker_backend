require('dotenv').config();

const server = require('./api/server.js');

const PORT = process.env.PORT || 80;

server.listen(PORT, (req, res, next) => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});