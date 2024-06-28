const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const feedback = new Schema(
  {
    id: { type: ObjectId },
    iduser:{type: ObjectId,ref:'user'},
    content:{type: String },
  },
);

module.exports =
  mongoose.models.feedback || mongoose.model("feedback", feedback);