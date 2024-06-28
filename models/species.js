const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const species = new Schema(
  {
    id: { type: ObjectId },
    name:{type: String},
  },
);

module.exports =
  mongoose.models.species || mongoose.model("species", species);