const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const verifyToken = (req,res,next) => {
    const tokenHeader = req.header('x-auth-token')
    console.log(tokenHeader)
    if (!tokenHeader){
        return res.status(401).json("no token! access denied")
    }
    try{
        const decoded = jwt.verify(tokenHeader,"secret")
        console.log(decoded)
        req.emailaddress = decoded.emailaddress
        next()
    }
    catch(err){
        return res.status(500).json("could not verify ")
    }
}

const Authorization = (req,res,next) => {
    verifyToken(req,res, ()=> {
        User.findOne({emailaddress:req.emailaddress}).then(user=>{
            console.log(user)
            if(user.emailaddress === req.emailaddress){
                next();
            }
        })
    })    
}

const isAdmin =  (req,res,next) => {
    verifyToken(req,res,()=>{
         User.findOne({emailaddress:req.emailaddress}).then(user=>{
            console.log(user)
            if(user.isAdmin){
                next();
            }else{
               return res.status(403).json("access denied")
            }
         })
        
    })
}
module.exports = {
    Authorization,
    verifyToken,
    isAdmin
}