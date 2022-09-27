import React from 'react'
import styled from "styled-components";
import { useSelector,useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import { logout } from '../redux/userRedux';

const Container = styled.div`
height:50px;
width:100vw;
box-shadow: 6px 13px 36px -21px rgba(20,19,19,1);
-webkit-box-shadow: 6px 13px 36px -21px rgba(20,19,19,1);
-moz-box-shadow: 6px 13px 36px -21px rgba(20,19,19,1);
@media (max-width: 768px) {
    width:100vw;
    margin-bottom:1rem;
  }
`
const Wrapper = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
padding-left: 10px;
`
const Iconcontainer = styled.div`
margin-left:1rem;
@media (max-width: 768px) {
    margin-left:0rem;
    margin-right:2rem;
  }
`
const Navcenter = styled.div`
display:flex;
justify-content:center;
width:70%;
margin-left:8rem;
@media (max-width: 768px) {
  margin-left:3px;
}
`
const Cartcontainer = styled.div`
display:flex;
position:relative;
cursor:pointer;
align-items:center;
margin-left:3rem;
@media (max-width: 768px) {
  margin-right: -19px;

  }
`
const Navtext = styled.span`
font-size:2.4rem;
color:#151736;
font-family: 'Rubik Glitch', cursive;
font-weight: bold;
@media (max-width: 768px) {
    font-size:1.4rem;
  }
`

const Navnum = styled.div`
display:flex;
justify-content:center;
align-items:center;
position:absolute;
top:0;
border-radius:50%;
width:30px;
height:25px;
color:#ffffff;
background-color:grey;
`

const LogoutContainer = styled.div`
display:flex;
position:relative;
margin-right:2em;
cursor:pointer;
align-items:center;
@media (max-width: 768px) {
    margin-right:1rem;
  }
`

const Logout = styled.img`
width:30px;
height:30px;
cursor:pointer;
margin-left:2rem
`


const Navbar = () => {
    const cartno = useSelector((state)=> state.cart.count)
    const dispatch = useDispatch()
    const signout = () => {
      dispatch(logout())
  }
  return (
    <Container>
        <Wrapper>
            <Iconcontainer>
                <img src={`/icons/sneak.png`} width="50" height="50"/>
            </Iconcontainer>
            <Navcenter>
                <Navtext> FYRE-SNEAKS </Navtext>
            </Navcenter>
            <Link to={"/cart"}>
            <Cartcontainer>
                <img src={`/icons/cart.svg`} width="40" height="35" />
                <Navnum>{cartno}</Navnum>
            </Cartcontainer>          
            </Link>
            <LogoutContainer>
            <Logout src='/icons/logout.svg' onClick={signout} />
            </LogoutContainer>
        </Wrapper>
    </Container>
  )
}

export default Navbar