var express = require('express');
var router = express.Router();
const feedbackModels = require('../models/feedback')

/* GET users listing. */
router.get('/', async(req, res, next) => {
  const data = await feedbackModels.find()
  res.json(data)
});

// Add 
router.post('/add', async(req, res, next) => {
  const { content, idUser } = req.body;
  const feedback = new feedbackModels({ idUser, content });
  await feedback.save();
  res.json(feedback);
});

module.exports = router;
