import React from 'react'
import { sliderItems } from "../data";
import { useState } from "react";
import styled from "styled-components"


const Container = styled.div` 
    width: 100vw;
    height: 100vh;
    display: flex;
    position: relative;
    margin-top:1.1em;
    overflow:hidden;
    @media (max-width: 768px) {
      margin-top:0;
      width: 100%;
      margin-bottom:3rem;
    }`

const Arrow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${(props) => props.direction === "left" && "10px"};
    right: ${(props) => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);`

const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${(props) => props.bg};`

const ImgContainer = styled.div`
    height: 100%;
    width:100%;
    flex: 1;
    @media (max-width: 768px) {
      position:relative;
      width:100%;
    }
    `

const Image = styled.img`
  height: 100%;
  width:100%;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
    margin-right:2rem;
    @media (max-width: 768px) {
      flex: 0;
      width:50%;
      position:absolute;
      z-index:3;
      top:10%;
      padding:0;
      margin-left:5em;
    }
 `
 
const Title = styled.h1`
  font-size: 74px;
  font-family: 'Rubik Puddles', cursive;
  color:#080808;
  @media (max-width: 768px) {
    font-size: 2rem;
    font-weight:bold;
  }
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 3px;
  @media (max-width: 768px) {
    font-size: 1.2rem;
    font-weight:bold;
    width:50%;
  }
`

const ImgArrow = styled.img`
width:50px;
height:50px;
@media (max-width: 768px) {
  font-size: 1rem;
  width:30px;
  height:30px;
}
`


const Slider = () => {

  const [slideIndex, setSlideIndex] = useState(0);
  
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  return (
        <Container>
         <Arrow direction="left" onClick={() => handleClick("left")}>
            <ImgArrow src="icons/backward.svg" />
          </Arrow>
          <Wrapper slideIndex={slideIndex}>
            {sliderItems.map((item) => (
              <Slide bg={item.bg} key={item.id}>
                <ImgContainer>
                  <Image src={item.img} />
                </ImgContainer>
                <InfoContainer>
                  <Title>{item.title}</Title>
                  <Desc>{item.desc}</Desc>
                </InfoContainer>
              </Slide>
            ))}
          </Wrapper>
        
          <Arrow direction="right" onClick={() => handleClick("right")}>
          <ImgArrow src="icons/forward.svg" width="44" height="70" />
          </Arrow>
          
          
        </Container>
      );
}

export default Slider