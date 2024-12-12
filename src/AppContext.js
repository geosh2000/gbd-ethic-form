// AuthContext.js
import React, { createContext, useState } from 'react';

const AppContext = createContext({
  form: []
});

const AppProvider = ({ children }) => {
  const [step, setStep] = useState({});
  const [renderForm, setRenderForm] = useState({});

  return (
    <AppContext.Provider value={{ step, renderForm }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };