import styled from "styled-components";
import Sidebar from "../components/side";
import Navbar from "../components/nav";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Editusers from "./editusers";

const Wrapper = styled.div`
display:flex;
width:100%;
`
const MainContainer = styled.div`
display:flex;
flex-direction:column;
width:84%;
height:100vh;
overflow:hidden;
`
const InfoBoxContainer = styled.div`
display:flex;
justify-content:center;
width:100%;
margin-top:2em;
`
const InfoBox = styled.div`
width:25%;
margin-right:3em;
height:10em;
border:0.5px solid grey;
border-radius:10px;
display:flex;
background-color:#787070;
flex-direction:column;
justify-content:center;
align-items:center;
`
const InfoBoxHead = styled.h1`
font-size:2.5rem;
font-weight:bold;
`
const InfoBoxOther = styled.span`
font-size:1.5rem;
`
const MainHeadBox = styled.div`
display:flex;
justify-content:center;
margin-top:3em;
`
const MainHead = styled.h1`
font-size:2rem;
`
const Users = styled.div`
width:90%;
display:flex;
flex-direction:column;
aligm-items:center;
justify-content:center;
margin-left:1.5em;
margin-top:1em;
`
const User = styled.div`
width:100%;
display:flex;
margin-bottom:2em;
margin-left:2em;
justify-content:space-between;
align-items:center;
`
const Username = styled.span`
font-size:1.2rem;
width:10%;
`
const Email = styled.span`
font-size:1.2rem;
width:20%;
margin-right:2em;
`
const Status = styled.span`
font-size:1.2rem;
width:10%;
`
const UpdateLInk = styled(Link)`
width:11%;
list-style:none;
`
const UpdateButton = styled.button`
width:100%;
height:2.5em;
color:black;
font-size:1rem;
border:1px solid black;
background-color:transparent;
cursor:pointer;
&:hover{
    color:limegreen;
    font-weight:bold;
    border:1.5px solid black;
}
`
const DeleteButton = styled.button`
width:11%;
height:2.5em;
color:black;
font-size:1rem;
border:1px solid black;
background-color:transparent;
cursor:pointer;
&:hover{
    color:hotpink;
    font-weight:bold;
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

const Home = () =>{
    const [users,setUsers] = useState([])
    const [data,setData] = useState([])
    const [orders,setOrders] = useState([])
    const token = localStorage.getItem('token')
    const [msg,setMsg] = useState("")
    const [toggleview,setToggle] = useState(false)

    const ToggleState = () =>{
        setToggle((prev)=> !prev)
        setMsg("")
    }

    const getUser = async() => {
        console.log(token)
        try{
            const response = await axios.get('http://localhost:5000/v1/user/getAll',{
                headers: {
                    'x-auth-token': token,
                }
            })
            setUsers(response.data)
            console.log(response.data)

            let items = await axios.get('http://localhost:5000/api/v1/product/pro/all',{
                headers:{
                    'x-auth-token':token
                }
            })
            setData(items.data)

            let orderitems = await axios.get('http://localhost:5000/api/v1/order/getAll',{
                headers:{
                    'x-auth-token':token
                }
            })
            setOrders(orderitems.data)
        }

        catch(err){
            console.log(err.response.data)
        }
    }

    const deleteUser = async(id) => {
        
        try{
            let response = await axios.delete('http://localhost:5000/v1/user/delete/' + id,{
            headers:{
                'x-auth-token': token
            }
        })
        console.log(response.data)
        setToggle(true)
        setMsg(response.data)
        users.filter(el => el._id !== id)
        getUser()
        }catch(err){
            console.log(err)
        }
    }

      const makeAdmin = async(id) => {
          console.log("this is  the fucking token " + token)
          try{
              let editedUser = await axios.patch('http://localhost:5000/v1/user/toggleAdmin/' + id,{
                headers:{
                    'x-auth-token': token
                }
            })
              console.log(editedUser.data)
          }
          catch(err){
              console.log(err.response.data)
          }
      }

    useEffect(() =>{
        getUser()
    }, [])
    return(
        <div>
        <Navbar/>
        <Wrapper>
        <Sidebar/>
        <MainContainer>
        <Msg style={{display:toggleview === false?"none":"flex"}}>
                <Msgmsg >
                    {msg === ""?"loading":msg}
                </Msgmsg>
                <X onClick={ToggleState}>x</X>
            </Msg>
        <InfoBoxContainer>
            <InfoBox>
                <InfoBoxHead>{users.length}</InfoBoxHead>
                <InfoBoxOther>Users</InfoBoxOther>
            </InfoBox>
            <InfoBox>
            <InfoBoxHead>{data.length}</InfoBoxHead>
                <InfoBoxOther>Products</InfoBoxOther>
            </InfoBox>
            <InfoBox>
            <InfoBoxHead>{orders.length}</InfoBoxHead>
                <InfoBoxOther>Orders</InfoBoxOther>
            </InfoBox>
        </InfoBoxContainer>
        <MainHeadBox>
            <MainHead>Recent Users</MainHead>
        </MainHeadBox>
        <Users>
            {users.map((item)=> (
                <User key={item._id}>
                    <Username>{item.username}</Username>
                    <Email>{item.emailaddress}</Email>
                    <Status>{item.isAdmin.toString()}</Status>
                    <UpdateLInk to={"/edituser/" + item._id}><UpdateButton>Edit</UpdateButton></UpdateLInk>
                    <DeleteButton onClick={()=>{deleteUser(item._id)} }>delete</DeleteButton>
                </User>
            ))}
        </Users>
        </MainContainer>
        </Wrapper>
        </div>
    )
}

export default Home