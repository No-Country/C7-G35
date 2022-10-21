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
  UserConfig,
  UserName,
} from './Navbar.styled';

import petSpaceLogo from '../../assets/petspace-logo.png';
import useFetch from '../../customHooks/useFetch';

const Navbar = () => {
  const token = localStorage.getItem('token');

  const userMe = useFetch(
    'https://pet-spaces-production.up.railway.app/api/users/me',
    token,
  );

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
      {!token ? <ButtonLogin href='/login'>Login</ButtonLogin>
        : <UserConfig><UserName>{userMe?.data?.user?.name}</UserName></UserConfig>}
      <IconoMenu
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        <MdMenu />
      </IconoMenu>
    </NavContainer>
  );
};

export default Navbar;
