import { useEffect, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import {
  ButtonLogin,
  CerrarSesion,
  IconoMenu,
  ImgLogo,
  Item,
  ItemMobile,
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
  const [hasToken, setHasToken] = useState('');
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    setHasToken(token);
  }, []);

  const userMe = useFetch(
    'https://pet-spaces-production.up.railway.app/api/users/me',
    hasToken,
  );

  const [clicked, setClicked] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search.slice(1));
    params.delete('token');
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}${window.location.hash}`,
    );
    window.location.reload();
  };
  return (
    <NavContainer>
      <LinkHome href='/'>
        <ImgLogo src={petSpaceLogo} alt='Logo Pet Space' />
      </LinkHome>
      <LinkContainer clicked={clicked}>
        {hasToken && (
          <>
            <UserNameLink href='/user'>{userMe?.data?.user?.name}</UserNameLink>
            <CerrarSesion className='cerrar-seison' onClick={handleLogout}>
              <Link href='/'>Cerrar sesión</Link>
            </CerrarSesion>
          </>
        )}
        <ItemMobile>
          <Link href='/see-all-lost/loss'>Mascotas Perdidas</Link>
        </ItemMobile>
        <ItemMobile>
          <Link href='/see-all-lost/rescue'>Mascotas Encontradas</Link>
        </ItemMobile>
      </LinkContainer>
      {!hasToken ? (
        <ButtonLogin href='/login'>Login</ButtonLogin>
      ) : (
        <UserConfig>
          <UserName>{userMe?.data?.user?.name}</UserName>
          <Opciones>
            <Item href='/user'>Ver perfil</Item>
            <Item onClick={handleLogout}>Cerrar Sesión</Item>
          </Opciones>
        </UserConfig>
      )}
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
