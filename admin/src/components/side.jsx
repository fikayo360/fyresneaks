import React from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";
import {remove } from "../redux/userSlice"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Container = styled.div`
height:100vh;
width:16%;
display:flex;
flex-direction:column;
padding:10px;
border-right:0.3px solid #837c7cbf;
`

const SideItems = styled.ul`
list-style:none;
margin-top:3em;
`
const Item = styled.li`
text-decoration: none;
color:black;
font-size:1.8rem;
margin-bottom:2.3em;
&:hover{
    transform:scale(1.1);
    font-weight:bold;
}
`
const LastItem = styled.li`
text-decoration: none;
color:black;
font-size:1.8rem;
margin-top:5em;
cursor:pointer;
&:hover{
    transform:scale(1.1);
    font-weight:bold;
}
`
const Sidelink = styled(Link)`
  text-decoration: none;
  `

const Sidebar = () => {
    const user = useSelector((state)=> state.user)
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(remove())
        console.log(user)
    }
    
    return(
        <Container>
            <SideItems>
                <Sidelink to="/adminhome">
                <Item> Home </Item></Sidelink>

                <Sidelink to="/products">
                <Item> Products </Item></Sidelink>

                <Sidelink to="/addproduct">
                <Item>AddProduct</Item></Sidelink>

                <Sidelink to="/orders">
                    <Item>Orders</Item></Sidelink>

               
                <LastItem onClick={logout}>Logout</LastItem>
            </SideItems>
        </Container>
    )
}

export default Sidebar