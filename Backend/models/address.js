const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addressSchema = new Schema({
  address1: {
    type: String,
    required: true,
    maxlength: 30,
  },
  address2: {
    type: String,
    maxlength: 30,
  },
  city: {
    type: String,
    required: true,
    maxlength: 15,
  },
  state: {
    type: String,
    required: true,
    maxlength: 15,
  },
  zipCode: {
    type: String,
    required: true,
    maxlength: 6,
  },
  contactNumber: {
    type: String,
    required: true,
    maxlength: 10,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Address", addressSchema);
