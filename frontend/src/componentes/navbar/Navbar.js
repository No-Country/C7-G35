import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import {
  Button,
  IconoMenu,
  ImgLogo,
  Link,
  LinkContainer,
  LinkHome,
  NavContainer,
} from './Navbar.styled';

import petSpaceLogo from '../../assets/petspace-logo.png';

const Navbar = () => {
  const [clicked, setClicked] = useState(true);
  return (
    <div>
      <NavContainer>
        <LinkHome href='/'>
          <ImgLogo src={petSpaceLogo} alt='Logo Pet Space' />
        </LinkHome>
        <LinkContainer clicked={clicked}>
          <span>
            <Link href='/see-all-lost/loss'>Mascotas Perdidas</Link>
          </span>
          <span>
            <Link href='/see-all-lost/rescue'>Mascotas Encontradas</Link>
          </span>
        </LinkContainer>
        <Button>Login</Button>
        <IconoMenu onClick={() => { setClicked(!clicked); }}>
          <MdMenu />
        </IconoMenu>
      </NavContainer>
    </div>
  );
};

export default Navbar;
