import { createContext, useContext, useState } from 'react';

const formContext = createContext();
const formChangeContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    type: '',
  });

  return (
    <formChangeContext.Provider value={setFormData}>
        <formContext.Provider value={formData}>
            {children}
        </formContext.Provider>
    </formChangeContext.Provider>
  );
};

export const useFormContext = () => {
  return useContext(formContext);
};

export const useFormChangeContext = () => {
  return useContext(formChangeContext);
};
