const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user.model")
const { isAdmin,Authorization } = require("../middlewares/auth")

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

// signup
router.route("/signup").post( async(req,res) => {
    const {emailaddress,username,password} = req.body

    if (!emailaddress && !username && !password){
       return  res.status(500).json("pls make sure fields are not empty")
    }

    else if (validateEmail(emailaddress) === false){
        return res.status(500).json("invalid email")
    }

    const newUser = new User({
        emailaddress,
        username,
        password: bcrypt.hashSync(password, 10),
    })
    
    try{
        const savedUser = await newUser.save()
            console.log(savedUser + "added")
            jwt.sign({
                emailaddress: savedUser.emailaddress,
              }, 'secret', (err, token) => {
                if(err) throw err;
                res.send({
                  token,
                  status:true,
                  User: {
                    emailaddress: savedUser.emailaddress,
                    isAdmin: savedUser.isAdmin,
                    id:savedUser.id
                  }
                })
              })
    }
    catch(err){
        res.status(500).json(err)
    }

})

// login 
router.route("/login").post(async(req,res)=>{
    const {emailaddress,password} = req.body

    if (!emailaddress  && !password){
        return res.status(500).json({msg:"pls ensure fields are not empty "})
      }
  
      if (validateEmail(emailaddress) === false){ 
          return res.status(500).json({msg:"enter correct email "})
    
      }

      try{
        const user = await User.findOne({emailaddress})
        console.log(user)
       if (!user){
         return res.status(500).json("that user does not exist")
       }

       else if(!bcrypt.compareSync(password,user.password)){
         return res.status(500).json("invalid password")
       }
       
        jwt.sign({
          emailaddress: user.emailaddress,
        }, 'secret', (err, token) => {
          if(err) throw err;
          res.send({
            token,
            status:true,
            User: {
              emailaddress: user.emailaddress,
              isAdmin: user.isAdmin,
              id:user.id
            }
          })
        })
       }
       
      catch(err){
        return res.status(500).json(err)
      }
})

// admin login 
router.route("/Adminlogin").post(async(req,res)=>{
  const {emailaddress,password} = req.body

  if (!emailaddress  && !password){
      return res.status(500).json("pls ensure fields are not empty ")
    }

    if (validateEmail(emailaddress) === false){ 
        return res.status(500).json("enter correct email ")
    }

    try{
      const user = await User.findOne({emailaddress})
      console.log(user)
     if (!user){
       return res.status(500).json("that user does not exist")
     }
     else if (user.isAdmin === false){
       return res.status(500).json("oops you not an admin")
     }
     else if(!bcrypt.compareSync(password,user.password)){
       return res.status(500).json("invalid password")
     }
     
      jwt.sign({
        emailaddress: user.emailaddress,
      }, 'secret', (err, token) => {
        if(err) throw err;
        res.send({
          token,
          status:true,
          User: {
            emailaddress: user.emailaddress,
            isAdmin: user.isAdmin,
            id:user.id
          }
        })
      })
     }
     
    catch(err){
      return res.status(500).json(err)
    }
})

router.route("/getAll").get(isAdmin,async(req,res)=>{
  try{
    const users = await User.find()
    res.status(200).json(users)
  }
  catch(err){
    res.status(500).json(err)
  }
})

router.route("/delete/:id").delete(isAdmin,async(req,res)=>{
  try{
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("product deleted")
  }
  catch(err){
      res.status(500).json(err)
  }
})

router.route("/toggleAdmin/:id").patch(isAdmin,async(req,res)=> {
  try{
    let individual = await User.findById(req.params.id)
    console.log(individual + "found")
    if(individual.isAdmin === false){
      individual.isAdmin = req.body.swap
    }
    individual.save()
    res.status(200).json("succesfully edited")
  }catch(err){
    res.status(500).json(err)
  }
})

router.route("/single/:id").get(Authorization,async(req,res)=>{
  try{
      let user = await User.findById(req.params.id)
      res.status(200).json(user)
  }
  catch(err){
      res.status(500).json(err)
  }
})

router.route

module.exports = router
