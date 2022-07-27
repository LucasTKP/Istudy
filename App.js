import 'react-native-gesture-handler';
import React from 'react';
import { Routes } from './src/routes'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = React.createContext();

export default function App() {
  const [dataUser, setDataUser] = React.useState ({})

  return (
    <UserContext.Provider value={{dataUser, setDataUser}}>
      <Routes />
    </UserContext.Provider>
    
  );
}



