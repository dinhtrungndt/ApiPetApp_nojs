const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const oderdetail = new Schema(
  {
    id: { type: ObjectId },
    idoder:{type: ObjectId,ref:'oder'},
    idpet:{type: Number,ref:'pet' },
    price: {type: Number}
  },
);

module.exports =
  mongoose.models.oderdetail || mongoose.model("oderdetail", oderdetail);