const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("mongoDb connected succesfully")
})

const userRouter = require('./apis/user')
app.use('/v1/user',userRouter)

const productRouter = require('./apis/product')
app.use('/api/v1/product',productRouter)

const orderRouter = require('./apis/order')
app.use('/api/v1/order',orderRouter)

const cartRouter  = require('./apis/cart')
app.use('/api/v1/cart',cartRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});