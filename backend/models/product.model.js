const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema =  Schema({
    title:{type:String},
    img:{type:String},
    description:{type:String},
    categories:{type:Array},
    price:{type:Number},
    status:{type:Boolean,default:false}
},
{ timestamps: true }
)

const Product = mongoose.model("Product",ProductSchema)
module.exports = Product