const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const oder = new Schema(
  {
    id: { type: ObjectId },
    orderday:{ type: Date, default:Date.now },
    sdt:{type: String },
  },
);

module.exports =
  mongoose.models.oder || mongoose.model("oder", oder);