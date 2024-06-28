var express = require('express');
var router = express.Router();
const favouriteModels = require('../models/orderdetails')

/* GET users listing. */
router.get('/', async(req, res, next) => {
  const data = await favouriteModels.find()
  res.json(data)
});

// Add 
router.post('/add', async(req, res, next) => {
  const { idoder, idpet, price } = req.body;
  const detailOrder = new favouriteModels({  idoder, idpet, price });
  await detailOrder.save();
  res.json(detailOrder);
});

module.exports = router;
