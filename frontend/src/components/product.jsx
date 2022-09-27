import React from 'react'
import styled from "styled-components"
import {Link} from "react-router-dom"

const Infoicon = styled.div`
border-radius:50%;
width:30px;
height:30px;
margin-right:1.9em;
&:hover {
  transform: scale(1.2);
}
`
const Info = styled.div`
display:flex;
justify-content:center;
align-item:center;
width:100%;
height:100%;
position:absolute;
background-color: rgba(0, 0, 0, 0.2);
top:0;
left:0;
opacity:0;
transition: all 0.5s ease;
cursor: pointer;
z-index:3;
`

const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
border-radius:8px;
width:300px;
height:300px;
margin-left:22px;
background-color: #f5fbfd;
position: relative;
object-fit:cover;
&:hover ${Info}{
  opacity: 1;
}
@media (max-width: 768px) {
  width:373px;
  margin-bottom:2rem;
}
`
const Img = styled.img`
width:100%;
height:100%;
z-index:2;
`
const Iconimg = styled.img`
height:100%;
&:hover{
  transform:scale(1.1)
}
`
const IconsWrap = styled.div`
display:flex;
align-items:center;
justify-content:center;
`
const Product = ({item}) => {
  return (
    <div>
      <Container>
        <Img src={item.img} />
        <Info>
          <IconsWrap>
            
          <Link to={"/product/"+item._id}>
          <Infoicon>
            <Iconimg src={"/icons/info.svg"} />
          </Infoicon>
          </Link>

          <Link to={"/cart"}>
          <Infoicon>
           < Iconimg src={"/icons/cart.svg"} />
          </Infoicon>
          </Link>
          </IconsWrap>
        </Info>
      </Container>
    </div>
  )
}

export default Product