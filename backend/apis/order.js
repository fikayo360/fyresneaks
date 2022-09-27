const express = require("express")
const router = express.Router()
const Order = require("../models/order.model")
const { Authorization,isAdmin} = require("../middlewares/auth")

router.route("/add").post(Authorization,async(req,res)=>{
    let useremail = req.emailaddress

    const {products,amount,address,status} = req.body
    
    const newOrder = new Order({
        useremail,
        products,
        amount,
        address,
        status
    })
    try{
        const savedProduct = await newOrder.save()
        console.log(savedProduct)
        return res.status(200).json("order added succesfully")
    }
    catch(err){
        return res.status(500).json(err)
    }
})


router.route("/add").post(async(req,res)=>{
    
})

router.route("/update/:id").put(isAdmin,async(req,res)=>{
    try{
        let updatedProduct = await Order.findByIdAndUpdate(req.params.id,{
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
        await Order.findByIdAndDelete(req.params.id)
        return res.status(200).json("order deleted")
    }
    catch(err){
        return res.status(500).json(err)
    }
})

router.route("/updateStatus/:id").patch(isAdmin,async(req,res)=>{
    try{
        let item = await Order.findById(req.params.id)
        if (item.status === "pending"){
            item.status = req.body.newStatus
        }
        item.save()
        res.status(200).json("order processed ...")
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.route("/getAll").get(isAdmin,async(req,res)=>{
   
    try{
        let orders = await Order.find()
        return res.status(200).json(orders)
    }
    catch(err){
        return res.status(500).json(err)
    }
})

router.route("/getOne/:id").get(isAdmin,async(req,res)=> {
    try{
        let singleOrder = await Order.findById(req.params.id)
        return res.status(200).json(singleOrder)
    }
    catch(err){
        return res.status(200).json(err)
    }
})

module.exports = router