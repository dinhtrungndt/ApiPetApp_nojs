const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const pet = new Schema(
  {
    _id: { type: Number },
    idcomment:{type:ObjectId, ref:'comment'},
    name: { type: String },
    idspecies: { type: ObjectId,ref:'species' },
    alike: { type: String },
    yearold: { type: Number  },
    price: { type: Number },
    weight: { type: String },
    image: { type: ObjectId,ref:'image' },
    describe: { type: String },

  },
{
  _id: false
}
);

module.exports =
  mongoose.models.pet || mongoose.model("pet", pet);