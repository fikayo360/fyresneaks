const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CartSchema = Schema({
    useremail: {type:String,required:true},
    products: [
      {
        productId: {
          type: String,
        },
        img: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          default: 0,
        }
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
},
{ timestamps: true }
)

const Cart = mongoose.model("Cart",CartSchema)
module.exports = Cart