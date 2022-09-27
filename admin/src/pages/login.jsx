import styled from "styled-components"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { update } from "../redux/userSlice"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Container = styled.div`
width:100vw;
height:100vh;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background: #D3CCE3;  /* fallback for old browsers */
background: -webkit-linear-gradient(to bottom, #E9E4F0, #D3CCE3);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to bottom, #E9E4F0, #D3CCE3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

`
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
`
const Errormsg = styled.span`
font-size:1.5rem;
`
const X = styled.span`
font-size:1.5rem;
color:red;
font-weight:bold;
cursor:pointer;
position:absolute;
right:10px;
&:hover {
    transform: scale(1.3);
  }
`
const FormW = styled.div`
width:40%;
height:70vh;
padding:5px;
border:1px solid grey;
background-color:white;
box-shadow: 1px 0px 5px 6px rgba(168,160,160,0.8);
-webkit-box-shadow: 1px 0px 5px 6px rgba(168,160,160,0.8);
-moz-box-shadow: 1px 0px 5px 6px rgba(168,160,160,0.8);
`
const Form = styled.form`
margin-left:6em;
margin-top:1.5em;
width:100%;
height:100%
`
const FormInput = styled.input`
font-family: 'Roboto', sans-serif;
  width:65%;  
  height:1.5em;
  font-size:1.5rem;
  margin-bottom: 1.4em;
  padding: 10px;
  border:2px solid black;
  border-radius:3px
`
const FormBtn = styled.button`
width:70%;
height:2.5em;
font-size:1.5rem;
background-color:transparent;
cursor:pointer;
background: #AA076B;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #61045F, #AA076B);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #61045F, #AA076B); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
color:#ffffff;
&:hover{
    color:grey;
    font-size:1.6rem;
    font-weight:bold;
    border:1.5px solid black;
}
`
const Logintxtcont = styled.div`
display:flex;
justify-content:center;
`
const Logintxt = styled.h1`
font-size:1.5rem;
`

    const Login = () =>{
        
    const [emailaddress,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errmsg,setErr] = useState("")
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();
        const formData = {emailaddress,password}
        try{
            const response = await axios.post('http://localhost:5000/v1/user/Adminlogin',formData)
            setEmail("")
            setPassword("")
            localStorage.setItem('token',response.data.token)
            navigate('/adminhome')
            dispatch(update({emailaddress}));
            console.log(user)
        }
        catch(err){
            console.log(err.response)
            setToggle(true)
            setErr(err.response.data)
        }
    }

    const [toggleview,setToggle] = useState(false)

    const ToggleState = () =>{
        setToggle((prev)=> !prev)
    }

    return(
        <Container>
            <Error style={{visibility:toggleview === false?"hidden":"visible"}}>
                <Errormsg >
                    {errmsg}
                </Errormsg>
                <X onClick={ToggleState}>x</X>
            </Error>

            <FormW>
                <Logintxtcont>
                <Logintxt>Admin Login</Logintxt>
                </Logintxtcont>
                <Form onSubmit={handleClick}>
                    <FormInput type="email" value={emailaddress} placeholder="Emailaddress" 
                    onChange={(e)=>setEmail(e.target.value)}/>
                    <FormInput type="password" value={password} 
                    onChange={(e)=> setPassword(e.target.value)} placeholder="password"/>
                    <FormBtn >login</FormBtn>
                </Form>
            </FormW>
        </Container>
    )
}

export default Login