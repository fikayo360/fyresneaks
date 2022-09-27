import React from 'react'
import styled from "styled-components"
import { Link } from "react-router-dom";

const FooterContainer = styled.div`
width:98%;
height:50vh;
display:flex;
align-items:center;
background-color:#212452;
justify-content: center;
border-top:0.2px solid grey;
@media (max-width: 768px) {
  width:100%;
  height:100%;
  flex-direction:column;
}
`
const FooterMain = styled.div`
display:flex;
flex-direction:column;
width:45%;
height:70%
justify-content:center;
align-items:center;
@media (max-width: 768px) {
  width:60%;
  height: 30%;
  margin-top: 4rem;
  margin-bottom: 4rem;
}
`
const FooterMainHead = styled.span`
font-size:1.7rem;
font-weight:bold;
margin-right:2rem;
margin-botttom:1.5rem;
@media (max-width: 768px) {
  font-size:1.2rem
  }
`
const FooterMainBody = styled.p`
font-size:1rem;
margin-left:10px;
width:70%;
@media (max-width: 768px) {
  width:100%;
  }
`
const SocialIconsCont = styled.div`
display:flex;
justify-content:center;
align-items:center;
cursor:pointer;
margin-top:1em;
`
const SocialIcons = styled.div`
display:flex;
justify-content:center;
align-items:center;
background-color:${(props)=> props.bg};
width:30px;
height:30px;
border-radius:50%;
margin-right:2em;
`
const UsefulLinks = styled.div`
width:25%;
height:70%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin-right:4rem
@media (max-width: 768px) {
  height:30%;
  width:60%;
  }
`
const UsefulLinksHead = styled.span`
font-size:1.7rem;
font-weight:bold;
margin-top:1.4rem;
margin-botttom:1.5em;
@media (max-width: 768px) {
  font-size:1.2rem
  }
`
const UsefulLinkBody = styled.ul`
list-style:none;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
margin-right:2em;
@media (max-width: 768px) {
  margin-right: 6em;
  margin-top: 2rem;
  }
`
const UsefulLinksItems = styled.li`
font-size:1rem;
margin-bottom: 17px;
cursor:pointer;
&:hover {
  color:red;
}
`
const Contact = styled.div`
width: 30%;
height:70%;
display:flex;
flex-direction:column;
justify-content:center;
@media (max-width: 768px) {
  height: 30%;
  width: 60%;
  margin-left: 6rem;
  }
`
const ContactHead = styled.span`
font-size:1.7rem;
font-weight:bold;
margin-left:5rem;
margin-bottom:1rem;
@media (max-width: 768px) {
  font-size:1.2rem;
  margin-left:0rem;
  }
`
const ContactBody = styled.div`
display:flex;
margin-bottom:9px;
justify-content:center;
align-items:center;
margin-top:1rem;
margin-right:6rem;
`
const ContactIcon = styled.img`
width:20px;
height:20px;
`
const ContactItemText = styled.span`
font-size:1rem;
@media (max-width: 768px) {
  width:100%;
}
`
const Cont = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`
const IconC = styled.div`
margin-right:1em;
`
const SocialIconsimg = styled.img`
width:60%;
height:60%;
@media (max-width: 768px) {
  width:40%;
  height:40%;
  }
`
const Footer = () => {
  return (
    <FooterContainer>
      <FooterMain>
        <FooterMainHead>
          FYRE-SNEAKS
        </FooterMainHead>
        <FooterMainBody>
        There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </FooterMainBody>
        <SocialIconsCont>
          <SocialIcons bg={'#050576'}>
            <SocialIconsimg src={"/icons/facebook.svg"} width="30" height="30"/>
          </SocialIcons>
          <SocialIcons bg={'#1b1beb'}>
            <SocialIconsimg src={"/icons/twitter.svg"} width="30" height="30" />
          </SocialIcons>
          <SocialIcons bg={'#a728b7'}>
            <SocialIconsimg src={"/icons/instagram.svg"} width="30" height="30" />
          </SocialIcons>
        </SocialIconsCont>
      </FooterMain>
      <UsefulLinks>
        <UsefulLinksHead>Useful links </UsefulLinksHead>
        <UsefulLinkBody>
          <UsefulLinksItems><Link to="/register">Register</Link></UsefulLinksItems>
          <UsefulLinksItems><Link to="/">Login</Link></UsefulLinksItems>
          <UsefulLinksItems><Link to="/home">Home</Link></UsefulLinksItems>
          <UsefulLinksItems><Link to="/cart">Cart</Link></UsefulLinksItems>
        </UsefulLinkBody>
      </UsefulLinks>
      <Contact>
        <ContactHead>
          CONTACT
        </ContactHead>
        <Cont>
        <ContactBody>
          <IconC>
          <ContactIcon src={"/icons/location.svg" }/> 
          </IconC>
          <ContactItemText> 35, dixie street Ireland</ContactItemText>
        </ContactBody>
        <ContactBody>
          <IconC>
          <ContactIcon src={"/icons/phone.svg"} />
          </IconC>
          <ContactItemText> +234 07056070802 </ContactItemText>
        </ContactBody>
        <ContactBody>
          <IconC>
          <ContactIcon src={"/icons/mail.svg"} />
          </IconC>
          <ContactItemText>Fikayoadele@gmail.com</ContactItemText>
        </ContactBody>
        </Cont>
      </Contact>
    </FooterContainer>
  )
}

export default Footer