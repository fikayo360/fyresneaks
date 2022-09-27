import React from 'react'
import styled from "styled-components"
import { Cate } from '../data'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
width:100vw;
height:50vw;
@media (max-width: 768px) {
  height:100vh;
  margin-bottom:30rem;
}
`
const CategoryHeading = styled.h1`
font-size : 2.7rem;
font-wieght:bold;
color:black;
margin-bottom:3em;
margin-left:2rem;
font-family: 'Russo One', sans-serif;
@media (max-width: 768px) {
  margin-bottom:1rem;
}
`
const CategoryContainer = styled.div`
margin:0;
display:flex;
width:98%;
height:40%;
justify-content:space-between;
align-items:center;
text-align:center;
@media (max-width: 768px) {
  flex-direction:column;
  justify-content:flex-start;
  width:95%;
  height:100%;
}
`
const CategoryLink = styled(Link)`
width:32%;
list-style:none;
@media (max-width: 768px) {
  width:100%;
  height:50%;
  margin-bottom:2rem;
  }
`
const Category = styled.div`
height:25em; 
border-radius:20px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
object-fit:cover;
position:relative;
`
const Categorytext = styled.h1`
font-size:2.4rem;
color:black;
font-weight:bold;
font-family: 'Russo One', sans-serif;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Info = styled.div`
position:absolute;
top:0;
left:0;
width: 100%;
height: 100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
@media (max-width: 768px) {
  top:10px;
}
`
const Categories = () => {
  return (
    <Wrapper>
    <CategoryHeading>Categories</CategoryHeading>
    <CategoryContainer>
        {Cate.map((item)=>(
           <CategoryLink to={"/productsPage/" + item.cat}>
          <Category  key={item.id}>
              <Image src={item.img} />
            <Info>
            <Categorytext>{item.title}</Categorytext> 
            </Info>
            </Category>
            </CategoryLink>
        ))}
        
    </CategoryContainer>
    </Wrapper>
  )
}

export default Categories