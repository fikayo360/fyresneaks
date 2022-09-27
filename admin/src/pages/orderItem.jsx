import React from 'react'
import Navbar from '../components/nav'
import styled from 'styled-components'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const MainContainer = styled.div`
display:flex;
flex-direction:column;
width:100%;
height:100vh;
`
const MainHeadBox = styled.div`
display:flex;
width:100%;
justify-content:center;
margin-top:3em;
margin-bottom:3em;
`
const MainHead = styled.h1`
font-size:2.5rem;
`
const Updatebox = styled.div`
width:100%;
display:flex;
flex-direction:column;
aligm-items:center;
justify-content:center;
margin-top:1em;
`
const OrderItem = styled.div`
width:95%;
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:3em;
margin-left:2em;
`
const OrderItemtxt = styled.span`
font-size:2rem;
`
const ProductItem = styled.div`
width:85%;
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:3em;
margin-left:3em;
`
const UpdateButtoncont = styled.div`
display:flex;
width:100%;
height:5em;
justify-content:center;
align-items:center;
margin-bottom:6em;
margin-top:2em;
`
const UpdateButton = styled.button`
width:40%;
height:100%;
font-size:1.6rem;
background-color:transparent;
cursor:pointer;
background: #AA076B;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #61045F, #AA076B);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #61045F, #AA076B); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
color:#ffffff;
&:hover{
    color:grey;
    font-weight:bold;
    border:1.5px solid black;
    transform: scale(1.1);
}
`
const ProductImgCont = styled.div`
width:23%;
height:8em;
object-fit:cover;
`
const ProductImg = styled.img`
width:100%;
height:100%;
`
const ProductId = styled.span`
font-size:1.5rem;
`
const Quantity = styled.span`
font-size:1.5rem;
`

const Orderdetail = () => {

    const [userId,setUserId] = useState("")
    const [address,setAddress] = useState("")
    const [status,setStatus] = useState("")
    const [products,setProducts] = useState([])
    const token = localStorage.getItem('token')
    const [processed,setProcessed] = useState("")
    const {id} = useParams()

    const getOrder = async()=> {
        try{
            let response = await axios.get('http://localhost:5000/api/v1/order/getOne/' + id,{
                headers:{
                    'x-auth-token':token
                }
            })
            setProducts(response.data.products)
            setUserId(response.data._id)
            setAddress(response.data.address)
            setStatus(response.data.status)
            console.log(response.data)
            console.log(response.data.products)
        }
        catch(err){
            console.log(err.ressponse.data)
        }
    }

    useEffect(()=>{
        getOrder()
    },[])

    const processOrder = async() => {
        try{
            let response = await axios.patch('http://localhost:5000/api/v1/order/updateStatus/' + id,{newStatus:"completed"},{
                headers:{
                    'x-auth-token':token
                }
            })
            console.log(response.data)
            getOrder()
        }
        catch(err){
            console.log(err.response.data)
        }
    }

   
    return(
     <div>
         <Navbar/>
         <MainContainer>
             <MainHeadBox>
                 <MainHead>Order details </MainHead>
             </MainHeadBox>
             <Updatebox>
                 <OrderItem>
                     <OrderItemtxt>User Id</OrderItemtxt>
                     <OrderItemtxt>{userId}</OrderItemtxt>
                 </OrderItem>
                 <OrderItem>
                     <OrderItemtxt>Address</OrderItemtxt>
                     <OrderItemtxt>{address}</OrderItemtxt>
                 </OrderItem>
                 <OrderItem>
                     <OrderItemtxt>Status</OrderItemtxt>
                     <OrderItemtxt>{status}</OrderItemtxt>
                 </OrderItem>
                 <MainHeadBox>
                     <MainHead>Product summary</MainHead>
                 </MainHeadBox>
                 <OrderItem>
                     <OrderItemtxt>No of products</OrderItemtxt>
                     <OrderItemtxt>{products.length}</OrderItemtxt>
                 </OrderItem>
                 <div>
                 {
                    products.map((item)=> (
                         <ProductItem key={item._id}>
                             <ProductImgCont>
                                 <ProductImg src={item.img}/>
                             </ProductImgCont>
                             <ProductId>{item.productId}</ProductId>
                             <Quantity>{item.quantity}</Quantity>
                         </ProductItem>
                     ))
                 }
                    </div>
                    <UpdateButtoncont>
                        <UpdateButton onClick={processOrder}>Process Order</UpdateButton>
                    </UpdateButtoncont>
             </Updatebox>
         </MainContainer>
     </div>   
    )
}

export default Orderdetail