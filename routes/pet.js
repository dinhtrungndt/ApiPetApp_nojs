var express = require('express');
var router = express.Router();
const petModels = require('../models/pet')

/* GET users listing. */
router.get('/', async(req, res, next) => {
  const data = await petModels.find()
  res.json(data)
});

// Add 
router.post('/add', async (req, res, next) => {
  try {
    const { _id, name,idcomment,idspecies,alike,yearold,price,weight,image,describe} = req.body
    const mComments = idcomment || ''
      const newUser = new petModels( {
        _id,
        name,
        idspecies,
        alike,
        yearold,
        price,
        weight,
        image: image ? image : "null",
        describe,
      })

      await newUser.save;

      res.json({ status: 1, message: "Thêm sản phẩm thành công ", newUser });
      await petModels.create(newUser);
  } catch (error) {
    console.log("Thêm sản phẩm ko thành công", error)
  }
});

module.exports = router;
