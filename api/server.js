const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const authenticate = require('../auth/authenticate-middleware');
const authRouter = require('../auth/auth-router');
const logsRouter = require('../logs/logs-router');
const guestRouter = require('../guest/guest-router');

const server = express();

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose is connected");
  }
);

// Middleware
server.use(helmet());
server.use(cors({
  origin: process.env.CORS_ORIGIN_URL,
  credentials: true
}))
server.use(express.json());

// Routers
server.use('/api/auth', authRouter);
server.use('/api/logs', authenticate, logsRouter);
server.use('/api/guest', guestRouter);


server.get('/', (req, res, next) => {
  res.status(200).json({ api: "running "});
});

module.exports = server;