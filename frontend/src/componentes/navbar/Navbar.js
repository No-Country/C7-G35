import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import {
  ButtonLogin,
  CerrarSesion,
  IconoMenu,
  ImgLogo,
  Item,
  Link,
  LinkContainer,
  LinkHome,
  NavContainer,
  Opciones,
  UserConfig,
  UserName,
  UserNameLink,
} from './Navbar.styled';

import petSpaceLogo from '../../assets/petspace-logo.png';
import useFetch from '../../customHooks/useFetch';

const Navbar = () => {
  const token = JSON.parse(localStorage.getItem('token'));

  const userMe = useFetch(
    'https://pet-spaces-production.up.railway.app/api/users/me',
    token,
  );

  const [clicked, setClicked] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
    const url = window.location;
    const params = new URLSearchParams(url.search);
    params.delete('token');
    window.history.replaceState({}, '', params);
  };
  return (
    <NavContainer>
      <LinkHome href='/'>
        <ImgLogo src={petSpaceLogo} alt='Logo Pet Space' />
      </LinkHome>
      <LinkContainer clicked={clicked}>
        <UserNameLink href='/user'>{userMe?.data?.user?.name}</UserNameLink>
        <CerrarSesion className='cerrar-seison' onClick={handleLogout}>
          <Link href='/'>Cerrar sesión</Link>
        </CerrarSesion>
        <span>
          <Link href='/see-all-lost/loss'>Mascotas Perdidas</Link>
        </span>
        <span>
          <Link href='/see-all-lost/rescue'>Mascotas Encontradas</Link>
        </span>
      </LinkContainer>
      {!userMe?.data && !token
        ? <ButtonLogin href='/login'>Login</ButtonLogin>
        : <UserConfig>
          <UserName>{userMe?.data?.user?.name}</UserName>
          <Opciones>
            <Item href='/user'>Ver perfil</Item>
            <Item onClick={handleLogout}>Cerrar Sesión</Item>
          </Opciones>
        </UserConfig>
     }
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
