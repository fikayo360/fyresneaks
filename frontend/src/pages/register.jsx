import styled from "styled-components";
import axios from "axios"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update } from "../redux/userRedux";
import { useState } from "react";

const Container = styled.div`
  margin:0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  background: 
   url("images/bg1.jpg")
    center;
    background-color: #3044d9;
    background-size:cover;
    background-attachment: fixed;
    background-blend-mode: color-burn;
  overflow:auto;
`;

const Title = styled.span`
  margin-left:3em;
  margin-top:5px;
  margin-bottom:10px;
  font-size:2rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color:#356683;
  @media (max-width: 768px) {
    margin-left:1em;
    margin-bottom:20px;
  }
`;

const Wrapper = styled.div`
  width: 30%;
  height:70%;
  border-radius:10px;
  background-color:#000000e3;
  @media (max-width: 768px) {
    width:70%;
    height:70%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: 3.8em;
  margin-top:2.3em;
  width:100%;
  height:100%;
  @media (max-width: 768px) {
    margin-left:2em;
    height:90%;
    margin-bottom:1em;
    margin-top:4em;
  }
`;

const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  width:70%;  
  height:1.1em;
  font-size:1.4rem;
  margin-bottom: 1em;
  padding: 10px;
  border:2px solid black;
  border-radius:3px
  &:focus {
    outline:none
  }
  @media (max-width: 768px) {
    width:70%;
  }
`;

const Button = styled.button`
  font-family: 'Roboto', sans-serif;
  font-size:1rem;
  font-weight:bold;
  height: 3rem;
  width: 74%;
  border: none;
  padding: 15px 20px;
  color:#ffffff;
  cursor: pointer;
  background: #AA076B;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #61045F, #AA076B);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #61045F, #AA076B);
 Chrome 26+, Opera 12+, Safari 7+ */
  margin-bottom: 2em;
  &:hover{
    transform:scale(1.1);
  }
  @media (max-width: 768px) {
    width:78%;
    margin-bottom:1em;
  }
`;

const Error = styled.div`
position:relative;
border:2px solid gray;
border-radius:3px;
display:flex;
justify-content:center;
align-items:center;
width:50%;
height:3em;
margin-bottom:4em;
@media (max-width: 768px) {
  width:90%;
}
`
const Errormsg = styled.span`
font-size:2rem;
color:black;
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
}
@media (max-width: 768px) {
  font-size:1.2rem;
}
`

const Signup = () => {
  const [emailaddress,setEmail] = useState("")
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [confirm,setConfirm] = useState("")
  const [toggleview,setToggle] = useState(false)
  const [errmsg,setErr] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const ToggleState = () =>{
        setToggle((prev)=> !prev)
    }

    
  const handleClick = async(e) => {
    e.preventDefault()
    if(password !== confirm) {
      setToggle(true)
      setErr("make sure password fields match")
      return
    }
    try{
      let formData = {emailaddress,username,password}
      let response = await axios.post("https://fyresneaks.onrender.com/v1/user/signup",formData)
      dispatch(update({emailaddress}))
      setEmail("")
      setUsername("")
      setConfirm("")
      setPassword("")
      localStorage.setItem('token',response.data.token)
      navigate('/home')
      console.log(response.data)
    }catch(err){
      console.log(err)
      setToggle(true)
      setErr(err.response.data)
    }
  }
  
  return (
   <Container>
      <Error style={{display:toggleview === false?"none":"flex"}}>
                <Errormsg >
                    {errmsg}
                </Errormsg>
                <X onClick={ToggleState}>x</X>
      </Error>
     <Wrapper>
     <Form onSubmit={handleClick}>
     <Title> Register </Title>
     <Input type="email" placeholder="EMAIL" value={emailaddress}
      onChange={(e)=> setEmail(e.target.value)} />
     <Input type="text" placeholder="USERNAME" value={username}
     onChange={(e)=> setUsername(e.target.value)}
      />
     <Input type="password" placeholder="PASSWORD" value={password} onChange={
       (e)=> setPassword(e.target.value)
     } />
     <Input type="password" placeholder="CONFIRMPASSWORD" value={confirm} 
     onChange={(e)=>setConfirm(e.target.value)} />
     <Button>SIGNUP</Button>
     </Form>
     </Wrapper>
   
   </Container>
      
  )
}

export default Signup