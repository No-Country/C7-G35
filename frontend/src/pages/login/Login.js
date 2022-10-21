import styled from 'styled-components';

const WrapperLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  padding: 2rem;
`;

const WrapperLinkLogo = styled.div`
  padding: 2rem;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;
const Link = styled.a`
  width: min(300px, 80%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #000;
`;
const LogoGoogle = styled.img`
  width: 100%;
  object-fit: contain;
`;

const Texto = styled.p`
  font-size: 1.5rem;
  text-align: center;
`;
const Login = () => {
  return (
    <WrapperLogin>
      <WrapperLinkLogo>
        <Link href='https://pet-spaces-production.up.railway.app/api/auth/google'>
          <LogoGoogle src='https://1000logos.net/wp-content/uploads/2016/11/google-logo.jpg' />
          <Texto>Conectate con Google</Texto>
        </Link>
      </WrapperLinkLogo>
    </WrapperLogin>
  );
};

export default Login;
