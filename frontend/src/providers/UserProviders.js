import { createContext, useContext, useState } from 'react';

const userContext = createContext();
const userChangeContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    token: '',
  });

  return (
    <userChangeContext.Provider value={setUserData}>
        <userContext.Provider value={userData}>
            {children}
        </userContext.Provider>
    </userChangeContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};

export const useUserChangeContext = () => {
  return useContext(userChangeContext);
};
