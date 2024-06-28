const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const image = new Schema(
  {
    id: { type: ObjectId },
    img: { type: String },
    idpet: { type: Number, ref:"pet" },
  },
);

module.exports =
  mongoose.models.image || mongoose.model("image", image);