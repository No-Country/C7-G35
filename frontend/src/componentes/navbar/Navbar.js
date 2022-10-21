import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import {
  ButtonLogin,
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
} from './Navbar.styled';

import petSpaceLogo from '../../assets/petspace-logo.png';
import useFetch from '../../customHooks/useFetch';

const Navbar = () => {
  const token = JSON.parse(localStorage.getItem('token'));

  const userMe = useFetch(
    'https://pet-spaces-production.up.railway.app/api/users/me',
    token,
  );

  console.log(userMe);

  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
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
      {!userMe.data && !token ? <ButtonLogin href='/login'>Login</ButtonLogin>
        : <UserConfig>
            <UserName>{userMe?.data?.user?.name}</UserName>
            <Opciones>
              <Item href='/user'>Ver perfil</Item>
              <Item onClick={handleLogout}>Cerrar Sesión</Item>
            </Opciones>
          </UserConfig>}
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
