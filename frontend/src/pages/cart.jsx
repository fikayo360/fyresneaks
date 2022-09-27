import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { clearAll } from "../redux/cartRedux";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
padding:10px;
`
const CartHeadCont = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin-bottom:1em;
`
const CartHead = styled.h1`
font-size:2rem;
font-family: 'Russo One', sans-serif;
`

const CartWrap = styled.div`
display:flex;
justify-content:space-between;
padding:10px;
margin-bottom:5rem;
@media (max-width: 768px) {
    flex-direction:column;
  }
`

const MainOrder = styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
align-items:center;
width:55%;
height:60%;
overflow:auto;
@media (max-width: 768px) {
    width:100%;
    height:100%;
  }
`

const OrderHead = styled.h1`
font-size:1.5rem;
font-family: 'Russo One', sans-serif;
`

const OrderItems = styled.div`
display:flex;
margin-top:2em;
margin-bottom:2em;
border-bottom:1px solid grey;
justify-content:space-between;
width: 100%;
height:10rem;
@media (max-width: 768px) {
    height:10rem;
  }
`
const ImgContainer = styled.div`
width:30%;
height:100%;
@media (max-width: 768px) {
    width:40%;
   height:90%;
  }
`

const Cartimg = styled.img`
width:100%;
height:100%;
object-fit:cover;
`
const OrderCenter = styled.div`
display:flex;
flex-direction:column;
`
const OrderCenterItmsC = styled.div`
margin-bottom:7em;
@media (max-width: 768px) {
    margin-top:2rem;
    margin-bottom:0em;
  }
`

const OrderCenterItms = styled.span`
font-size:1rem;
@media (max-width: 768px) {
    font-size:11px;
    font-weight:bold;
  }

`

const OrderRight = styled.div`
display:flex;
height:90%;
flex-direction:column;
@media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`
const CountContainer = styled.div`
display:flex;
margin-bottom:7em;
@media (max-width: 768px) {
    margin-bottom:3em;
   }
`
const Plus = styled.img`
width:30px;
height:30px;
`
const CountContainerH = styled.span`
font-size:1rem;
`
const CountnoC = styled.div`
margin-left:1em;
margin-right:1em;
`

const PriceContainer = styled.div`
display:flex;
align-items:center;
`
const DollarSign = styled.img`
width:20px;
height:20px;
@media (max-width: 768px) {
    width:15px;
    height:15px;
  }
`
const PriceAmount = styled.span`
font-size:1rem;
@media (max-width: 768px) {
    font-size:1.2rem;
    font-weight:bold;
  }
`

const OrderSummary = styled.div`
padding:5px;
width:34%;
height:70%;
margin-top:2em;
border:0.5px solid grey;
border-radius:3px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
box-shadow: 0px 0px 11px 0px rgba(20,19,19,0.79);
-webkit-box-shadow: 0px 0px 11px 0px rgba(20,19,19,0.79);
-moz-box-shadow: 0px 0px 11px 0px rgba(20,19,19,0.79);
@media (max-width: 768px) {
    width:97%;
    height:100%;
  }
`

const Subtotal = styled.div`
display:flex;
width:80%;
justify-content:space-between;
margin-bottom:2em;
`
const Subtotaltxt = styled.span`
font-size:2rem;
`
const Noofitms = styled.div`
display:flex;
width:80%;
justify-content:space-between;
margin-bottom:2em;
`

const Noofitmstxt = styled.span`
font-size:2rem;
`
const NoofitmsA = styled.span`
font-size:2rem;
`
const Total = styled.div`
display:flex;
width:80%;
justify-content:space-between;
margin-bottom:2em;
`
const Totaltxt = styled.span`
font-size:2rem;
`
const Checkout = styled.div`
display:flex;
justify-content:center;
margin-bottom:2em;
`
const CheckoutBtn = styled.button`
background-color:transparent;
color:white;
width:8em;
height:2.4em;
background: #AA076B;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #61045F, #AA076B);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #61045F, #AA076B); 
font-size:1.5rem;
&:hover{
    transform:scale(1.2);
    color:green;
    font-weight:bold;
    cursor:pointer;
}
`
const TextArea = styled.textarea`
font-family: 'Roboto', sans-serif;
width:50%;  
height:2em;
font-size:1.5rem;
margin-bottom: 1.4em;
padding: 5px;
border:2px solid black;
border-radius:3px;
@media (max-width: 768px) {
    width:90%;
  }
`
const Error = styled.div`
position:relative;
border-radius:3px;
display:flex;
justify-content:center;
align-items:center;
width:50%;
height:3em;
@media (max-width: 768px) {
    width:90%;
  }
`
const Errormsg = styled.span`
font-size:2rem;
color:green;
@media (max-width: 768px) {
    font-size:1.2rem;
    font-weight:bold;
    margin-right:1rem;
  }
`
const X = styled.span`
font-size:2rem;
color:black;
font-weight:bold;
cursor:pointer;
position:absolute;
right:10px;
&:hover {
    transform: scale(1.3);
  };
  @media (max-width: 768px) {
    font-size:1.2rem;
  }
`

const Cart = () => {

    const products = useSelector((state)=> state.cart.products)
   const token = localStorage.getItem('token')
    const [amount,setAmount] = useState(0)
    const [totalItems,settotal] = useState(0)
   const [address,setAddress] = useState("")
   const data = {products,amount,address}
   const dispatch = useDispatch()
   const [toggleview,setToggle] = useState(false)
   const [errmsg,setErr] = useState("")
   const navigate = useNavigate()

   const ToggleState = () =>{
    setToggle((prev)=> !prev)
}
   const Ordercalc = () => {
    let totalQuantity = 0;
    let productTotal = 0;
    products.map((item)=>{
        productTotal += item.price * item.quantity 
        totalQuantity += item.quantity
    })
    setAmount(productTotal)
    settotal(totalQuantity)
   }

   useEffect(()=> {
       Ordercalc()
   },[products])
   
    const handleProcess = async() => {
        try{
            let cartresponse = await axios.post('https://fyresneaks.onrender.com/api/v1/cart/add',data,{
                headers:{
                    'x-auth-token':token
                }
            })
            setErr(cartresponse.data)

            let orderresponse = await axios.post('https://fyresneaks.onrender.com/api/v1/order/add',data,{
                headers:{
                    'x-auth-token':token
                }
            })
            console.log(orderresponse)
            setAddress("")
            dispatch(clearAll())
            setToggle(true)
            navigate("/pay")
        }
        catch(err){
            console.log(err.response.data)
        }
   }
    
  return (
      
    <div>
        <Navbar/>
        <Container>
        
            <CartHeadCont>
            <Error style={{display:toggleview === false?"none":"flex"}}>
                <Errormsg >
                    {errmsg}
                </Errormsg>
                <X onClick={ToggleState}>x</X>
      </Error>
                <CartHead>UR BAG </CartHead>
                <TextArea type="text-area" placeholder="address..." 
                        value={address} onChange={(e)=> setAddress(e.target.value)}   
                           />
            </CartHeadCont>
            <CartWrap>
                <MainOrder>
                    {
                        products.map((item)=>(
                            <OrderItems key={item.productId}>
                            <ImgContainer>
                            <Cartimg src={item.img} />
                            </ImgContainer>
                            <OrderCenter>
                            <OrderCenterItmsC>
                                <OrderCenterItms>Product-id</OrderCenterItms>
                            </OrderCenterItmsC>
                            <OrderCenterItmsC>
                                <OrderCenterItms>{item.productId}</OrderCenterItms>
                            </OrderCenterItmsC>
                            </OrderCenter>
                            <OrderRight>
                                <CountContainer>
                                    <CountContainerH>{item.quantity}</CountContainerH>
                                </CountContainer>
                                <PriceContainer>
                                    <DollarSign src="icons/dollar.svg" />
                                    <PriceAmount>{item.price}</PriceAmount>
                                </PriceContainer>
                            </OrderRight>
                        </OrderItems>
                        ))
                        }
                   
                </MainOrder>

                <OrderSummary>
                    <OrderHead>ORDER SUMMARY</OrderHead>
                    <Noofitms>
                        <Noofitmstxt>Total items</Noofitmstxt>
                        <NoofitmsA>{totalItems}</NoofitmsA>
                    </Noofitms>
                    <Total>
                        <Totaltxt>Total price</Totaltxt>
                        <PriceContainer>
                                <DollarSign src="icons/dollar.svg" />
                                <PriceAmount>{amount}</PriceAmount>
                        </PriceContainer>
                    </Total>
                    <Checkout>
                        <CheckoutBtn onClick={handleProcess}>checkout</CheckoutBtn>
                    </Checkout>
                </OrderSummary>
            </CartWrap>
        </Container>
        <Footer/>
    </div>
  )
}

export default Cart