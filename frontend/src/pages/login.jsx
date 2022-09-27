import styled from "styled-components";
import { useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update } from "../redux/userRedux";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
padding:0;
margin:0;
width: 100vw;
height: 100vh;
display: flex;
flex-direction:column;
align-items: center;
justify-content: center;
background: 
url("images/bg1.jpg" )
  center;
  background-color: #3044d9;
background-size:cover;
background-attachment: fixed;
background-blend-mode: color-burn;
overflow:auto;
`;

const LoginT = styled.span`
margin-top:1em;
margin-bottom:10px;
margin-left:4em;
font-size:2rem;
font-weight: bold;
font-family: 'Roboto', sans-serif;
color:#356683;
@media (max-width: 768px) {
  margin-left:2em;
}
`

const Basetxt = styled.span`
margin-left:7em;
margin-top:3em;
font-size:1rem;
font-weight: bold;
font-family: 'Roboto', sans-serif;
color:#356683;
@media (max-width: 768px) {
  margin-left:2em;
}
`
const Wrapper = styled.div`
  height:56%;
  width: 30%;
  border-radius:10px;
  background-color:#000000e3;
  @media (max-width: 768px) {
    width:70%;
    height:53%;
  }
`;

const Form = styled.form`
width:100%;
height:100%;
  display: flex;
  flex-direction: column;
  margin-left:5em;
  @media (max-width: 768px) {
    margin-left:2em;
    height:70%;
    margin-bottom:1em;
  }
`;

const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  width:65%;  
  height:1.3em;
  font-size:1.4rem;
  margin-bottom: 1.2em;
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
  width: 69%;
  border: none;
  padding: 15px 20px;
  background: linear-gradient(90deg, #1CB5E0 0%, #000851 100%);
  color:#ffffff;
  cursor: pointer;
  background: #AA076B;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #61045F, #AA076B);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #61045F, #AA076B);
 Chrome 26+, Opera 12+, Safari 7+ */
  margin-bottom: 2em;
  &:hover{
    transform: scale(1.2);
    fontsize:1.3rem;
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

const Login = () => {
  const [emailaddress,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [toggleview,setToggle] = useState(false)
  const [errmsg,setErr] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

    const ToggleState = () =>{
        setToggle((prev)=> !prev)
    }

    
  const handleClick = async(e) => {
    e.preventDefault()
    
    try{
      let data = {emailaddress,password}
      if (!emailaddress || !password ){
        setErr("field cant be empty")
        setToggle(true)
      }
      dispatch(update({emailaddress}))
      let response = await axios.post("https://fyresneaks.onrender.com/v1/user/login",data)
      setEmail("")
      setPassword("")
      localStorage.setItem('token',response.data.token)
      navigate('/home')
      console.log(response.data)
    }catch(err){
      console.log(err)
      setErr(err.response.data)
      setToggle(true)
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
     
     <Form onSubmit={handleClick} >
     <LoginT>SignIn</LoginT>
     <Input type="email" placeholder="emailaddress" 
     value={emailaddress} onChange={(e)=> setEmail(e.target.value)} />
     <Input type="password" placeholder="password" value={password}
     onChange={(e)=> setPassword(e.target.value)}
      />
     <Button>SIGNIN </Button>
     <Basetxt>Not a user yet <Link to="/register">Register</Link></Basetxt>
     </Form>
     </Wrapper>
   
   </Container>
      
  )
}

export default Login