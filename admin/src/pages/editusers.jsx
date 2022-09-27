import React from 'react'
import Navbar from '../components/nav'
import styled from 'styled-components'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MainContainer = styled.div`
display:flex;
flex-direction:column;
width:100%;
height:100vh;
overflow:hidden;
`
const MainHeadBox = styled.div`
display:flex;
width:100%;
justify-content:center;
margin-top:3em;
`
const MainHead = styled.h1`
font-size:2rem;
`
const Updatebox = styled.div`
width:90%;
display:flex;
flex-direction:column;
aligm-items:center;
justify-content:center;
margin-left:1.5em;
margin-top:1em;
`
const FormContainer = styled.div`
width:100%;
height:100%;
padding:10px;
display:flex;
justify-content:center;
`
const UpdateButtonCont = styled.div`
display:flex;
justify-content:center;
align-items:center;
margin-top:5em;
margin-left:5em;
`
const UpdateButton = styled.button`
width:40%;
height:3em;
color:black;
font-size:2rem;
border:1px solid black;
background-color:transparent;
cursor:pointer;
&:hover{
    color:limegreen;
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

const Editusers = () => {
  const [data,setData] = useState("")
  const [msg,setMsg] = useState("")
    const [toggleview,setToggle] = useState(false)
    const token = localStorage.getItem('token')
    const { id } = useParams()
    const navigate = useNavigate()

    const ToggleState = () =>{
        setToggle((prev)=> !prev)
        setMsg("")
    }

    const toggleAdmin = async(id) => {
      const data = {swap:true}
      try{
          let response = await axios.patch(`http://localhost:5000/v1/user/toggleAdmin/${id}`,data,{
          headers:{
              'x-auth-token': token
          }
      })
      setToggle(true)
      setMsg(response.data)
      }
      catch(err){
          console.log(err.response.data)
      }
  }

  return (
    <div>
        <MainContainer>
        <Navbar/>
        <Msg style={{display:toggleview === false?"none":"flex"}}>
                <Msgmsg >
                    {msg === ""?"loading":msg}
                </Msgmsg>
                <X onClick={ToggleState}>x</X>
            </Msg>
        <MainHeadBox>
          <MainHead>Give user admin priveledges </MainHead>
        </MainHeadBox>
        <Updatebox>
        <UpdateButtonCont>
          <UpdateButton onClick={()=>{toggleAdmin(id)}}>Make Admin</UpdateButton>
        </UpdateButtonCont>
        </Updatebox>
      </MainContainer>
    </div>
  )
}

export default Editusers