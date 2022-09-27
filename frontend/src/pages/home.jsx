import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/navbar'
import Slider from '../components/slider'
import Categories from '../components/categories'
import Footer from '../components/footer'

const Container = styled.div`
padding:0;
margin:10px;
width: 100vw;
height: 100vh;
@media (max-width: 768px) {
  margin:0;
  padding:5px;
}
`;

const Home = () => {
  return (
    <Container>
    <Navbar/>
      <Slider/>
      <Categories/>
      <Footer/>
      </Container>
  )
}

export default Home