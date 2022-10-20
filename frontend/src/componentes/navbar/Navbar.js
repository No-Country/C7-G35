import React from 'react';
import { Button, Link, LinkContainer, NavContainer } from './Navbar.styled';

import petSpaceLogo from '../../assets/petspace-logo.png';

const Navbar = () => {
  return (
    <div>
      <NavContainer>
        <div>
          <img src={petSpaceLogo} alt="" />
        </div>
        <LinkContainer>
          <span>
            <Link href="/see-all-lost">Buscador de mascotes</Link>
          </span>
          <span>
            <Link href="">Mis mascotas</Link>
          </span>
          <span>
            <Link href="">Sobre Nosotros</Link>
          </span>
        </LinkContainer>
        <Button>Login</Button>
      </NavContainer>
    </div>
  );
};

export default Navbar;
