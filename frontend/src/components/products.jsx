import React from 'react'
import Product from './product'
import styled from 'styled-components'
import { useState,useEffect } from 'react'
import axios from "axios"

const Container = styled.div`
display:flex;
flex-direction:row;
width:100vw;
height:100vh;
flex-wrap:wrap;
margin-top:3rem;
margin-bottom:3rem;
@media (max-width: 768px) {
  overflow:auto;
}
`

const Products = ({cat}) => {
  const [products,setProducts] = useState([])
  const token = localStorage.getItem('token')
  
  const getProducts = async ()=> {
    try{
      
        let response = await axios.get( cat ?
          `https://fyresneaks.onrender.com/api/v1/product/pro/all?Category=${cat}`
          :`https://fyresneaks.onrender.com/api/v1/product/pro/all`,{
          headers:{
            'x-auth-token':token
          }
        })
        setProducts(response.data)
        console.log(response.data)
      }
    catch(err){
  
    }
  }
  useEffect(()=>{
    getProducts()
  },[cat])
  
  return (
    <div>
      <Container>
        {products.map((item)=> (
            <Product item={item} key={item._id} />
        ))}
        </Container>
    </div>
  )
}

export default Products