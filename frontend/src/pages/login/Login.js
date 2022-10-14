import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useUserChangeContext, useUserContext } from '../../providers/UserProviders';

const Login = () => {
  const [cookies, setCookie] = useCookies(['token']);
  function onChange() {
    setCookie('token', { path: '/' });
  }

  const useUserChangeData = useUserChangeContext();
  const useUserData = useUserContext();

  useEffect(() => {
    useUserChangeData((prevState) => ({
      ...prevState,
      token: cookies,
    }));
  }, []);

  console.log(useUserData);

  return (
    <div onChange={onChange}>
      <a href='http://localhost:8000/api/auth/google'> login </a>
    </div>
  );
};

export default Login;
