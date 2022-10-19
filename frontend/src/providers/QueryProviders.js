import { createContext, useContext, useState } from 'react';

const queryContext = createContext();
const queryChangeContext = createContext();

export const QueryProvider = ({ children }) => {
  const [queryData, setQueryData] = useState({
    token: '',
  });

  return (
    <queryChangeContext.Provider value={setQueryData}>
        <queryContext.Provider value={queryData}>
            {children}
        </queryContext.Provider>
    </queryChangeContext.Provider>
  );
};

export const useQueryContext = () => {
  return useContext(queryContext);
};

export const useQueryChangeContext = () => {
  return useContext(queryChangeContext);
};
