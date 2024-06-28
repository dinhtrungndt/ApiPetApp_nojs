const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const pay = new Schema(
  {
    id: { type: ObjectId },
    idorder:{type: ObjectId,ref:'oder'},
    payment:{type: String },
    money:{type: Number},
    paymentday:{type: Date,default:Date.now},

  },
);

module.exports =
  mongoose.models.pay || mongoose.model("pay", pay);