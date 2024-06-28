var express = require('express');
var router = express.Router();
const orderModels = require('../models/order')

/* GET users listing. */
router.get('/', async(req, res, next) => {
  const data = await orderModels.find()
  res.json(data)
});

// Add 
router.post('/add', async(req, res, next) => {
try {
  const { sdt } = req.body;

  const order = new orderModels({ sdt });
  await order.save();
  res.json(order);
} catch (error) {
  res.json(error)
}
});

module.exports = router;
