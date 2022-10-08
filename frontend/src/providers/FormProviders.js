import { createContext, useContext, useState } from 'react';

const formContext = createContext();
const formChangeContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    tipo: '',
  });

  return (
    <formChangeContext.Provider value={setFormData}>
        <formChangeContext.Provider value={formData}>
            {children}
        </formChangeContext.Provider>
    </formChangeContext.Provider>
  );
};

export const useFormContext = () => {
  return useContext(formContext);
};

export const useFormChangeContext = () => {
  return useContext(formChangeContext);
};
