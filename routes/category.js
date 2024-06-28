var express = require('express');
var router = express.Router();
const categoryModels = require('../models/category')

/* GET users listing. */
router.get('/', async(req, res, next) => {
  const data = await categoryModels.find()
  res.json(data)
});

// Add 
router.post('/add', async(req, res, next) => {
  const { name, idspecies } = req.body;
  const checkName = await categoryModels.findOne({ name });
  
  if (checkName) return res.json({ status: 0, message: "Danh mục này đã tồn tại" });

  const typePosts = new categoryModels({ name, idspecies });
  await typePosts.save();
  res.json(typePosts);
  
});

module.exports = router;
