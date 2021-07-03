const router = require('express').Router();
// helps hash the password
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../database/user');

const secret = process.env.JWT_SECRET;

router.post('/register', (req, res, next) => {
  User.findOne({username: req.body.username}, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User already exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 8);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword
      });
      await newUser.save();
      res.send("User created");
    }
  });
});

router.post('/login', (req, res, next) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ message: 'Invalid Credentials' });
    } else if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ message: `Welcome ${user.username}!`, jwt_token: token, user_id: user._id, username: user.username });
    }
  });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '30 min'
  };

  return jwt.sign(payload, secret, options);
};

module.exports = router;