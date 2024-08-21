//store es el modelo de datos donde se guarda la info
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store; 
