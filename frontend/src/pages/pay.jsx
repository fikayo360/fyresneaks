import react from "react";
import styled from "styled-components";
import Navbar from "../components/navbar";
import { useState,useEffect } from "react";
import { PaystackButton } from 'react-paystack'
import '../index.css'

 const Wrap = styled.div`
width:100vw;
height:100vh;
background: #1488CC;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #2B32B2, #1488CC);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #2B32B2, #1488CC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
;
 ` 
const Container = styled.div`
width:100vw;
height:100vh;
display:flex;
align-items:center;
justify-content:center;
`
const Wrapper = styled.div`
  height:60%;
  width: 30%;
  padding: 5px;
  border-radius:10px;
  background-color:#000000e3;
  @media (max-width: 768px) {
    width: 70%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: 4.2em;
  @media (max-width: 768px) {
    margin-left: 0em;
  }
`;

const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  width:75%;  
  height:1.5em;
  font-size:1.4rem;
  margin-bottom: 2em;
  padding: 10px;
  border:2px solid black;
  border-radius:3px;
  @media (max-width: 768px) {
    width:80%;  
    height:3rem;
    font-size:1.1rem;
    margin-bottom: 2em;
    padding: 5px;
    margin-left:2rem;
  }
`;

const Button = styled.button`
  font-family: 'Roboto', sans-serif;
  font-size:1rem;
  height: 3rem;
  width: 80%;
  border: none;
  padding: 15px 20px;
  background: linear-gradient(90deg, #1CB5E0 0%, #000851 100%);
  color:black;
  cursor: pointer;
  background: #667db6;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6); /* W3C, IE 10+/ Edge, Firefox 16+,
 Chrome 26+, Opera 12+, Safari 7+ */
  margin-bottom: 2em;
  &:hover{
    transform: scale(1.2);
    fontsize:1.3rem;
  }
`;

const FormTxt = styled.span`
margin-top:1em;
margin-bottom:1em;
margin-left:2em;
font-size:2.3rem;
font-weight: bold;
font-family: 'Roboto', sans-serif;
color:#356683;
@media (max-width: 768px) {
  margin-left:3em;
  font-size:2rem;
}
`
const ButtonCont = styled.div`
display:flex;
justify-content:center;
align-items:center;
`
const Pay = () => {
    const [email,setmail]= useState("")
    const [amount,setAmount] = useState("")
    const publicKey = 'pk_live_1e92b99a9ac91716840902610baab588a19f6ba8'

    const componentProps = {
      email,
      amount:amount * 100,
      publicKey,
      text: "Pay Now",
      onSuccess: () =>{
        setmail("")
        setAmount("")
      },
      onClose: () => {},
    }

    return(
      <div>
      <Wrap>
            <Container>
                <Wrapper>
                    <Form>
                      <FormTxt>PAYY..</FormTxt>
                        <Input type="email" placeholder="emailaddress" onChange={(e) => setmail(e.target.value)}
                         value={email}/>
                        <Input type="amount" 
                        placeholder="amount" onChange={(e)=> setAmount(e.target.value)} value={amount}/>
                        
                    </Form>
                    <ButtonCont><PaystackButton className="paystack-button" {...componentProps} /></ButtonCont>
                </Wrapper>
            </Container>
            </Wrap>
          </div>

    )
}

export default Pay