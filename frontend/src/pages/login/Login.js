import {
  Link,
  LogoGoogle,
  Texto,
  WrapperLinkLogo,
  WrapperLogin,
} from './login.styled';

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
