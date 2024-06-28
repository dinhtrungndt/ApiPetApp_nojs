var express = require('express');
var router = express.Router();
const payModles = require('../models/pay')

/* GET users listing. */
router.get('/', async(req, res, next) => {
  const data = await payModles.find()
  res.json(data)
});

// Add 
router.post('/add', async(req, res, next) => {
  const { idorder, payment, money } = req.body;
  const detailOrder = new payModles({  idorder, payment, money });
  await detailOrder.save();
  res.json(detailOrder);
});

module.exports = router;
