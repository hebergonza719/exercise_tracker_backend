const router = require('express').Router();
const Guest = require('../database/guest');

router.get('/', async (req, res, next) => {
  try{
    const logs = await Guest.find();
    res.send(logs);
  } catch (error) {
    res.status(500).send({ get_error: 'Error while getting list of logs.' });
  }
});

router.get('/last-five', async (req, res, next) => {
  try {
    const logs = await Guest.find().sort({"date": -1}).limit(5);
    res.send(logs);
  } catch (error) {
    res.status(500).send({ get_error: 'Error while getting list of logs.' })
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newLog = new Guest(req.body)
    await newLog.save();
    res.send("Log created");
  } catch (error) {
      res.status(500).send({
        upload_error: 'Error while uploading log information...Try again later.'
      });
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send({
        upload_error: error.message
      });
    }
  }
);

router.delete('/:log_id', async (req, res, next) => {
  try {
    await Guest.deleteOne({ _id: req.params.log_id }, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    res.status(500).send({ get_error: 'Error while deleting log.' })
  }
});

module.exports = router;