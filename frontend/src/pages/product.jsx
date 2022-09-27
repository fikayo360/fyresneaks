import react from "react";
import styled from "styled-components";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
 import { addProduct,clearAll } from "../redux/cartRedux";
  import { useDispatch } from "react-redux";


const Wrapper =styled.div`
display:flex;
margin-top:1.5em;
margin-bottom:5em;
height:100vh;
width:100vw;
padding:10px;
@media (max-width: 768px) {
  flex-direction:column;
  margin-bottom:20rem;
}
`
const ImgContainer = styled.div`
width:55%;
height:100%;
@media (max-width: 768px) {
  width:100%;
}
`
const Img = styled.img`
width:100%;
height:100%;
object-fit:cover;
`
const DescriptionContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
margin-left:4em;
width:35%;
height:100%;
@media (max-width: 768px) {
  height:30%;
  margin-top:10rem;
  margin-left:0em;
  width: 80%;
}
`
const DesHeader = styled.h1`
font-family: 'Russo One', sans-serif;
font-size:2.5rem;
color:black;
margin-left:5rem
`
const Descriptionbodycont = styled.div`
width:100%;
`

const DescriptionBody = styled.p`
font-size:1.5rem;
@media (max-width: 768px) {
  height:30%;
  font-size:1rem;
  width:80%;
  margin-left: 4rem;
}
`
const PriceCont = styled.div`
display:flex;
justify-content:center;
margin-top:2em;
@media (max-width: 768px) {
  margin-left: 5em;
}
`
const DollarIcon = styled.img`
width:50px;
height:50px;
@media (max-width: 768px) {
  width:30px;
height:30px;
}
`
const Price = styled.span`
font-size:2.5rem;
font-weight:bold;
color:black;
@media (max-width: 768px) {
  font-size:1.2rem;
}
`
const CartBtn = styled.button`
background-color:transparent;
color:white;
border-radius:2px;
width:10em;
height:2.4em;
background: #667db6;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6); /* W3C, IE 10+/ Edge, Firefox 16+,
 Chrome 26+, Opera 12+, Safari 7+ */
font-size:1.5rem;
&:hover{
    transform:scale(1.2);
    color:green;
    font-weight:bold;
    cursor:pointer;
}
`

const BtnContainer = styled.div`
margin-left:10rem;
margin-top:1em;
@media (max-width: 768px) {
  margin-left:5rem;
}
`
const QuantityContainer = styled.div`
display:flex;
margin-top:2em;
margin-bottom:1em;
margin-left:8em;
width:60%;
justify-content:space-between;
align-items:center;
@media (max-width: 768px) {
  margin-left: 7em;
    width: 60%;
}
`
const Increment = styled.img`
width:30px;
height:30px;
cursor:pointer;
&:hover{
  transform:scale(1.2)
}
@media (max-width: 768px) {
  width:30px;
  height:30px;
}
`
const CurrentQuantity = styled.span`
font-size:3rem;
color:black;
@media (max-width: 768px) {
  font-size:1rem;
}
`
const Decrement = styled.img`
width:30px;
height:30px;
cursor:pointer;
&:hover{
  transform:scale(1.2)
}
@media (max-width: 768px) {
  width:25px;
height:25px;
}
`

const Product = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const token = localStorage.getItem('token')
  const {id} = useParams()
  const [quantity,setQuantity] = useState(0) 
  const [productId,setproductId] = useState("")
  const [price,setPrice] = useState(0)
  const [img,setImg] = useState("")
  const [description,setDescription] = useState("")
  const [title,setTitle] = useState("")

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }
  const decreaseQuantity = () => {
    if(quantity <= 0){
      quantity = 0
    }else{
      setQuantity(prev => prev - 1)
    }
  }
  
  const getItem = async() => {
    console.log(id)
    try{
      let response = await axios.get('https://fyresneaks.onrender.com/api/v1/product/single/' + id,{
        headers:{
          'x-auth-token':token
        }
      })
      setDescription(response.data.description)
      setImg(response.data.img)
      setTitle(response.data.title)
      setPrice(response.data.price)
      setproductId(response.data._id)
      console.log(response.data)
    }catch(err){
      console.log(err.response.data)
    }
  }
  useEffect(()=>{
    getItem()
  },[])

  
  const dispatchProduct = () => {
    dispatch(addProduct({productId,img,quantity,price}))
    console.log("product added")
    console.log(cart)
  }

  const clear = () => {
    dispatch(clearAll())
    console.log(cart)
  }
  return (
    <div>
        <Navbar/>
        <Wrapper>
          <ImgContainer>
          <Img src={img} />
          </ImgContainer>
          <DescriptionContainer>
            <DesHeader>
              {title}
            </DesHeader>
            <Descriptionbodycont>
            <DescriptionBody>
              {description}
            </DescriptionBody>
            </Descriptionbodycont>
            <PriceCont>
              <DollarIcon src={"/icons/dollar.svg"} />
              <Price>
              {price}
            </Price>
            </PriceCont>
            <QuantityContainer>
              <Increment src="/icons/pluss.svg" onClick={increaseQuantity} /> 
              <CurrentQuantity>
                {quantity}
              </CurrentQuantity>
              <Decrement src="/icons/minuss.svg" onClick={decreaseQuantity}/>
            </QuantityContainer>
            <BtnContainer>
            <CartBtn onClick={dispatchProduct}>
              Add To Cart
               </CartBtn>
               </BtnContainer>
          </DescriptionContainer>
        </Wrapper>
        <Footer/>
    </div>
  )
}

export default Product