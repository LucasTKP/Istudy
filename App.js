import 'react-native-gesture-handler';
import React from 'react';
import { Routes } from './src/routes'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = React.createContext();

export default function App() {
  const [dataUser, setDataUser] = React.useState ({})
  const [modal, setModal] = React.useState (false)
  const [alert, setAlert] = React.useState (false)

  return (
    <UserContext.Provider value={{dataUser, setDataUser, modal, setModal, alert, setAlert}} >
      <Routes />
    </UserContext.Provider>
    
  );
}



