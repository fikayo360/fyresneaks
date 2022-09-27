import styled from "styled-components";
import Sidebar from "../components/side";
import Navbar from "../components/nav";
import { products } from "../data";
import axios from "axios"
import { useState,useEffect } from "react";
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
margin-top:2em;
`
const MainHead = styled.h1`
font-size:3rem;
`
const Prodcts = styled.div`
width:100%;
display:flex;
flex-direction:column;
margin-left:4em;
margin-top:2em;
`
const Prodct = styled.div`
width:90%;
display:flex;
align-items:center;
margin-bottom:2em;
justify-content:space-between;
`
const ProductImgCont = styled.div`
width:18%;
height:8em;
object-fit:cover;
margin-right:2.3em;
`
const ProductImg = styled.img`
width:100%;
height:100%;
`
const Title = styled.span`
font-size:2rem;
width:20%;
`
const Price = styled.span`
font-size:2rem;
width:20%;
margin-left:2em;
`

const UpdateButton = styled.button`
width:100%;
height:2.5em;
color:black;
font-size:1.5rem;
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
width:15%;
height:2.5em;
color:black;
font-size:1.5rem;
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
const UpdateLInk = styled(Link)`
width:15%;
list-style:none;
`

const Products = () => {
    const [data,setData] = useState([])
    const [msg,setMsg] = useState("")
    const [toggleview,setToggle] = useState(false)
    const token = localStorage.getItem('token')

    const ToggleState = () =>{
        setToggle((prev)=> !prev)
    }

const getProducts = async() => {
    
    const token = localStorage.getItem('token')
    try{
        let items = await axios.get('http://localhost:5000/api/v1/product/pro/all',{
            headers:{
                'x-auth-token':token
            }
        })
        setData(items.data)
    }
    catch(err){
        console.log(err.response.data)
    }
}

const deleteProduct = async(id) => {
        
    try{
        let response = await axios.delete('http://localhost:5000/api/v1/product/delete/' + id,{
        headers:{
            'x-auth-token': token
        }
    })
    console.log(response.data)
    setToggle(true)
    setMsg(response.data)
    data.filter(el => el._id !== id)
    getProducts()
    }catch(err){
        console.log(err)
    }
}

useEffect(()=>{
getProducts()
},[])

    return (
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
            <MainHeadBox>
                <MainHead>All products </MainHead>
            </MainHeadBox>
            <Prodcts>
                {data.map((item)=>(
                    <Prodct key={item.id}>
                        <ProductImgCont>
                            <ProductImg src={item.img} />
                        </ProductImgCont>
                        <Title>{item.title}</Title>
                        <Price>{item.price}</Price>
                        <UpdateLInk to={"/updateproduct/" + item._id}><UpdateButton>update</UpdateButton></UpdateLInk>
                        <DeleteButton onClick={()=>{deleteProduct(item._id)} }>delete</DeleteButton>
                    </Prodct>
                ))}
            </Prodcts>
            </MainContainer>
            </Wrapper>
        </div>
    )
}

export default Products