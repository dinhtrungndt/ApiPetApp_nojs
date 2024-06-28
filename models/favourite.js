const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const favourite = new Schema(
  {
    id: { type: ObjectId },
    idUser:{type: ObjectId,ref:'user'},
    idpet:{type: Number,ref:'pet' },
  },
);

module.exports =
  mongoose.models.favourite || mongoose.model("favourite", favourite);