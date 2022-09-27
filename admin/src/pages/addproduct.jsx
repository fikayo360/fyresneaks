import styled from "styled-components";
import Sidebar from "../components/side";
import Navbar from "../components/nav";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {getStorage, ref, uploadBytesResumable,getDownloadURL} from "firebase/storage"
import app from "../firebase"

const Wrapper = styled.div`
display:flex;
width:100%;
`
const MainContainer = styled.div`
display:flex;
flex-direction:column;
width:84%;
height:100vh;
overflow:scroll;
`
const MainHeadBox = styled.div`
display:flex;
justify-content:center;
margin-top:3em;
`
const MainHead = styled.h1`
font-size:2rem;
`
const FormContainer = styled.div`
width:100%;
height:100%;
padding:10px;
display:flex;
justify-content:center;
`
const Form = styled.form`
width:100%;
height:100%;
margin-left:17em;
`
const Input = styled.input`
 font-family: 'Roboto', sans-serif;
  width:65%;  
  height:1.5em;
  font-size:1.5rem;
  margin-bottom: 1.4em;
  padding: 10px;
  border:2px solid black;
  border-radius:3px
`
const Label = styled.span`
font-size:1.5rem;
margin-bottom:1em;
`
const AddButton = styled.button`
width:65%;
height:2.5em;
font-size:1.5rem;
background-color:transparent;
cursor:pointer;
background-color:grey;
`
const TextArea = styled.textarea`
font-family: 'Roboto', sans-serif;
width:70%;  
height:7em;
font-size:1.5rem;
margin-bottom: 1.4em;
padding: 5px;
border:2px solid black;
border-radius:3px;
`
const InputWrap = styled.div`
display:flex;
flex-direction:column;
`
const FileInput = styled.input`
border:none;
height:3em;
`
const FileInputcont = styled.div`
margin-top:1em;
margin-bottom:1em;
display:flex;
flex-direction:column;
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

const AddProduct = () => {

    const [title,setTitle] = useState("")
    const [file,setFile] = useState(null)
    const [description,setDescription] = useState("")
    const [categories,setCategories] = useState([])
    const [price,setPrice] = useState(0)
    const [msg,setMsg] = useState("")
    const [toggleview,setToggle] = useState(false)

    const ToggleState = () =>{
        setToggle((prev)=> !prev)
        setMsg("")
    }

    const handleClick = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const filename = new Date().getTime() +file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file);
        setToggle(true)
        console.log(filename)
        // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = { title, img: downloadURL,description,categories,price };
             axios.post('http://localhost:5000/api/v1/product/add',product,{
                    headers:{
                        'x-auth-token':token
                    }
                }).then((response)=>{
                  console.log(response.data)
                  setMsg(response.data)
                  setTitle("")
                  setDescription("")
                  setFile("")
                  setCategories("")
                  setPrice("")
                }).catch((err)=>{
                  console.log(err)
                })
          });
        }
      );
    }

    return(
        <div>
           <Navbar/>
           <Wrapper>
               <Sidebar/>
               <MainContainer>
               <Msg style={{visibility:toggleview === false?"hidden":"visible"}}>
                <Msgmsg >
                    {msg === ""?"uploading please wait...":msg}
                </Msgmsg>
                <X onClick={ToggleState}>x</X>
            </Msg>
                   <MainHeadBox>
                       <MainHead> Add products </MainHead>
                   </MainHeadBox>
                   <FormContainer>
                       <Form onSubmit={handleClick}>
                           <InputWrap>
                           <Label>Title</Label>
                           <Input type="text" value={title}
                            placeholder="Add title ..." onChange={(e)=> setTitle(e.target.value)} />
                           </InputWrap>

                           <FileInputcont>
                           <Label>Img</Label>
                           <FileInput  type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                           </FileInputcont>

                           <InputWrap>
                           <Label>Description</Label>
                           <TextArea type="text-area" value={description} placeholder="Description" 
                           onChange={(e)=> setDescription(e.target.value)}
                           />
                           </InputWrap>

                           <InputWrap>
                           <Label>Categories</Label>
                           <Input type="text" value={categories} placeholder="Add categories ..." 
                           onChange={(e)=> setCategories(e.target.value.split(","))}
                           />
                           </InputWrap>

                           <InputWrap>
                           <Label>Price</Label>
                           <Input type="number" value={price} placeholder="Add Price ..."
                           onChange={(e)=> setPrice(parseInt(e.target.value))}
                            />
                           </InputWrap>
                           <AddButton>Add Button</AddButton>
                       </Form>
                   </FormContainer>
               </MainContainer>
           </Wrapper>
        </div>
    )
}

export default AddProduct