import React from 'react'
import styled from "styled-components";

const Container = styled.div`
height:50px;
width:100vw;
border-bottom:1px solid grey;
background-color:#080707cf;
margin-bottom:0.5em;
`
const Wrapper = styled.div`
display:flex;
justify-content:space-between;
`
const Iconcontainer = styled.div`
margin-left:1em;
margin-top:0.5em;
`
const Navcenter = styled.div`
margin-top:0.5em;
margin-right:2em;
`

const Navtext = styled.span`
font-size:1.3rem;
color:black;
font-family: 'Rubik Glitch', cursive;
font-weight: bold;
`



const Navbar = () => {
  return (
    <Container>
        <Wrapper>
            <Iconcontainer>
                <img src="/icons/sneak.png" width="35" height="37"/>
            </Iconcontainer>
            <Navcenter>
                <Navtext> FYRE-SNEAKS-ADMIN </Navtext>
            </Navcenter>
            
        </Wrapper>
    </Container>
  )
}

export default Navbar