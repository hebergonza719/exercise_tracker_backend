const router = require('express').Router();
const Log = require('../database/log');

router.post('/', async (req, res, next) => {
  try {
    const newLog = new Log(req.body)
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

router.get('/:user_id', async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const logs = await Log.find({"user_id": `${user_id}`});
    res.send(logs);
  } catch (error) {
    res.status(500).send({ get_error: 'Error while getting list of logs.' })
  }
});

router.get('/:user_id/last-five', async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const logs = await Log.find({"user_id": `${user_id}`}).sort({"date": -1}).limit(5);
    res.send(logs);
  } catch (error) {
    res.status(500).send({ get_error: 'Error while getting list of logs.' })
  }
});

router.delete('/:log_id', async (req, res, next) => {
  try {
    await Log.deleteOne({ _id: req.params.log_id }, (err, result) => {
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