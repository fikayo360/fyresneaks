import styled from "styled-components"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import Products from "../components/products"
import { useParams } from "react-router-dom"

import React from 'react'

const ProductsPage = () => {
  const {category} = useParams()
  return (
    <div>
      <Navbar/>
      <Products cat={category}/>
      <Footer/>
    </div>
  )
}

export default ProductsPage