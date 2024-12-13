// src/App.js

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css'
import './Stepper.css'

import { AppProvider } from './appContext';

import EthicForm from './components/form/EthicForm';




const App = ( ) => {
    
    return (
    <AppProvider>
      <EthicForm></EthicForm>
    </AppProvider>
    );
};

export default App;
