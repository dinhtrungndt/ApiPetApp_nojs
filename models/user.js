const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema(
  {
    id: { type: ObjectId },
    name: { type: String },
    adress: { type: String },
    email: { type: String },
    sdt: { type: Number  },
    username: { type: String },
    password: { type: String },
  },
);

module.exports =
  mongoose.models.user || mongoose.model("user", user);