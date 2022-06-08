const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      productId: { type: Schema.Types.ObjectId, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

userSchema.methods.addToCart = function (productId) {
  const productIndex = this.cart.findIndex(
    (cartItem) => cartItem.productId.toString() === productId.toString()
  );
  console.log(productIndex);
  let tempCart = [],
    newQuantity = 1;

  if (productIndex > -1) {
    newQuantity = this.cart[productIndex].quantity + 1;
    this.cart[productIndex].quantity = newQuantity;
  } else {
    let newCart = { productId, quantity: newQuantity };
    this.cart.push(newCart);
  }
  console.log(this.cart);
  //this.cart = tempCart;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
