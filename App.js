import 'react-native-gesture-handler';
import React from 'react';
import { NavRoutes } from './src/routes/Navbar.routes'
import { AuthRoutes } from './src/routes/Auth.routes';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';

export const UserContext = React.createContext();

export default function App() {
  const [dataUser, setDataUser] = React.useState ({})
  const [modal, setModal] = React.useState (false)
  const [alert, setAlert] = React.useState (false)
  const [profile, setProfile] = React.useState (false)

    React.useEffect(() => {
        const bootstrapAsync = async () => {
          let user;
          try {
            user = await SecureStore.getItemAsync('User');
            setDataUser(JSON.parse(user))
          } catch (e) {
            console.log(e)
          }
        };
    
        bootstrapAsync();
      }, [dataUser]);
      console.log("a")
  return (
    <UserContext.Provider value={{dataUser, setDataUser, modal, setModal, alert, setAlert, profile, setProfile}} >
      <NavigationContainer>
            {dataUser == null ? <AuthRoutes /> : <NavRoutes />}
      </NavigationContainer>
    </UserContext.Provider>
    
  );
}



