const express = require("express")
const router = express.Router()
const Cart = require("../models/cart.model")
const { Authorization,isAdmin} = require("../middlewares/auth")


router.route("/add").post( Authorization, async(req,res)=>{
    const {products,amount,address} = req.body
    let useremail = req.emailaddress
    const newCart = new Cart({
        useremail,
        products,
        amount,
        address
    })
    try{
        const cart = await newCart.save()
        console.log(cart)
        return res.status(200).json("cart added succesfully")
    }
    catch(err){
        return res.status(500).json(err)
    }
})


router.route("/update/:id").put(isAdmin, async(req,res)=>{
    try{
        let updatedProduct = await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },
        {new:true}
        )
        return res.status(200).json(updatedProduct)
    }
    catch(err){
        return res.status(500).json(err)
    }
})


router.route("/delete/:id").delete(isAdmin,async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        return res.status(200).json("cart deleted")
    }
    catch(err){
        return res.status(500).json(err)
    }
})

router.route("/getAll").get(isAdmin,async(req,res)=>{
   
    try{
        let allcarts = await Cart.find()
        return res.status(200).json(allcarts)
    }
    catch(err){
        return res.status(500).json(err)
    }
})

router.route("/getOne/:id").get(isAdmin,async(req,res)=> {
    try{
        let singleCart = await Cart.findById({userId:req.params.id})
        return res.status(200).json(singleCart)
    }
    catch(err){
        return res.status(200).json(err)
    }
})

module.exports = router