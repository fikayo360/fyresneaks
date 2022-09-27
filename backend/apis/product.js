const express = require("express")
const router = express.Router()
const Product = require("../models/product.model")
const { Authorization,verifyToken,isAdmin} = require("../middlewares/auth")

//create product 
router.route("/add").post(isAdmin,async(req,res)=> {
    const {title,img,categories,description,price} = req.body
    const newProduct = new Product({
        title,
        img,
        categories,
        description,
        price
    })
    try{
        let newproduct = await newProduct.save()
        console.log(newproduct)
        res.status(200).json("product added")
    }
    catch(err){
        res.status(500).json(err)
    }
})

// update product
router.route("/update/:id").put(isAdmin,async(req,res)=>{
    try{
        let updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },
        {new:true}
        )
        console.log(updatedProduct)
        res.status(200).json("Product updated")
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.route("/delete/:id").delete(isAdmin,async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("product deleted")
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.route("/single/:id").get(Authorization,async(req,res)=>{
    try{
        let product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.route("/pro/all").get(Authorization,async(req,res)=>{
    const qCategory = req.query.Category
    try{
        let items;
        if(qCategory){
            items = await Product.find({
                categories:{
                    $in:[qCategory]
                }
            })
        }else{
            items = await Product.find()
        }
        return res.status(200).json(items)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router
