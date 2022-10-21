import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import {
  ButtonLogin,
  IconoMenu,
  ImgLogo,
  Link,
  LinkContainer,
  LinkHome,
  NavContainer,
} from './Navbar.styled';

import petSpaceLogo from '../../assets/petspace-logo.png';

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  return (
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
        <ButtonLogin href='/login'>Login</ButtonLogin>
        <IconoMenu onClick={() => { setClicked(!clicked); }}>
          <MdMenu />
        </IconoMenu>
      </NavContainer>
  );
};

export default Navbar;
