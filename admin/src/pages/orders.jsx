import styled from "styled-components";
import Sidebar from "../components/side";
import Navbar from "../components/nav";
//import { orders } from "../data";
import { useState,useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

const Wrapper = styled.div`
display:flex;
width:100%;
`
const MainContainer = styled.div`
display:flex;
flex-direction:column;
width:84%;
height:100vh;
`
const MainHeadBox = styled.div`
display:flex;
justify-content:center;
`
const MainHead = styled.h1`
font-size:3rem;
`
const Orderrs = styled.div`
width:100%;
display:flex;
flex-direction:column;
margin-left:4em;
margin-top:2em;
`
const Order = styled.div`
width:90%;
display:flex;
margin-bottom:2em;
justify-content:space-between;
`
const Id = styled.span`
font-size:1.5rem;
`

const Status = styled.span`
font-size:1.5rem;
`

const IconContainer = styled.div`
width:50px;
height:50px;
border-radius:50%;
object-fit:cover;
cursor:pointer;
&:hover{
    transform: scale(1.2);
}
`
const Icon = styled.img`
width:100%;
height:100%;
`

const DeleteButton = styled.button`
width:10em;
height:3em;
color:black;
font-size:1rem;
border:1px solid black;
background-color:transparent;
cursor:pointer;
&:hover{
    color:hotpink;
    font-weight:bold;
    font-size:1.1rem;
    border:1.5px solid black;
}
`
const Msg = styled.div`
position:relative;
display:flex;
justify-content:center;
align-items:center;
width:50%;
height:7em;
margin-top:4em;
margin-left:20em;
`
const Msgmsg = styled.span`
font-size:2rem;
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
  }
`
const ImgContainer = styled.div`
width:25%;
height:4em;
`
const Cartimg = styled.img`
width:100%;
height:100%;
object-fit:cover;
`

const Orders = () => {
    const [orders,setOrders] = useState([])
    const token = localStorage.getItem('token')
    const [msg,setMsg] = useState("")
    const [toggleview,setToggle] = useState(false)

    const ToggleState = () =>{
        setToggle((prev)=> !prev)
        setMsg("")
    }

    const getOrders = async() => {
        try{
            let response = await axios.get('http://localhost:5000/api/v1/order/getAll',{
                headers:{
                    'x-auth-token':token
                }
            })
            setOrders(response.data)
            console.log(response.data)
        }catch(err){
            console.log(err.response.data)
        }
    }

    const deleteOrder = async(id) => {
        try{
            let response = await axios.delete('http://localhost:5000/api/v1/order/delete/' + id,{
            headers:{
                'x-auth-token': token
            }
        })
        console.log(response.data)
        setToggle(true)
        setMsg(response.data)
        orders.filter(el => el._id !== id)
        getOrders()
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getOrders()
    },[])
    return(
        <div>
            <Navbar/>
            <Wrapper>
                <Sidebar />
                <MainContainer>
                <Msg style={{display:toggleview === false?"none":"flex"}}>
                <Msgmsg >
                    {msg === ""?"loading":msg}
                </Msgmsg>
                <X onClick={ToggleState}>x</X>
            </Msg>
                <MainHeadBox>
                    <MainHead>
                        Orders...
                    </MainHead>
                </MainHeadBox>
                <Orderrs>
                        {orders.map((item)=>(
                            <Order key={item._id}>
                            <Id>{item._id}</Id>
                            <Status>{item.status}</Status>
                            <Link to={"/orders/" + item._id}>
                            <IconContainer>
                                <Icon src="icons/info.svg" />
                            </IconContainer>
                            </Link>
                            <DeleteButton onClick={()=>{deleteOrder(item._id)}}>Delete</DeleteButton>
                            </Order>
                        ))}
                </Orderrs>
                </MainContainer>
            </Wrapper>
        </div>
    )
}

export default Orders