var express = require('express');
var router = express.Router();
const speciesModels = require('../models/species')

/* GET users listing. */
router.get('/', async(req, res, next) => {
  const data = await speciesModels.find()
  res.json(data)
});

// Add 
router.post('/add', async(req, res, next) => {
  const { name } = req.body;
  const checkName = await speciesModels.findOne({ name });
  
  if (checkName) return res.json({ status: 0, message: "Loài này đã tồn tại" });

  const typePosts = new speciesModels({ name });
  await typePosts.save();
  res.json(typePosts);
  
  
});

module.exports = router;
