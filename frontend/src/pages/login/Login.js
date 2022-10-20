import { useCookies } from 'react-cookie';

const Login = () => {
  const [cookies, setCookie] = useCookies(['token']);
  function onChange() {
    setCookie('token', { path: '/' });
  }

  localStorage.setItem('token', JSON.stringify(cookies));

  return (
    <div onChange={onChange}>
      <a href='http://localhost:8000/api/auth/google'> login </a>
    </div>
  );
};

export default Login;
