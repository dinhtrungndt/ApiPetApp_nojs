var express = require('express');
var router = express.Router();
const favouriteModels = require('../models/favourite')

/* GET users listing. */
router.get('/', async(req, res, next) => {
  const data = await favouriteModels.find()
  res.json(data)
});

// Add 
router.post('/add', async(req, res, next) => {
  const { idUser, idpet } = req.body;
  
  const favourite = new favouriteModels({ idUser, idpet });
  await favourite.save();
  res.json(favourite);
  
});

module.exports = router;
