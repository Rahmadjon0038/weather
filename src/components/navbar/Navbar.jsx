import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { Container, Img, Nav } from './style';
import Serarch from '../search/Serarch';
function Navbar() {
  const navigate = useNavigate();
  return (
    <Container>
      <h1 onClick={() => navigate('/')}><Img src={logo} /> Ob havo uz</h1>
      <Serarch />
      <Nav>
        <NavLink to={'/day'} className={({ isActive }) => isActive ? 'link1' : "link"}>Bir kunlik</NavLink>
        <NavLink to={'/week'} className={({ isActive }) => isActive ? 'link1' : "link"}>Bir haftalik</NavLink>
      </Nav>
    </Container>
  )
}

export default Navbar
