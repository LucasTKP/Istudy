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

  const [data, setData] = React.useState([])

    React.useEffect(() => {
        const bootstrapAsync = async () => {
          let userToken;
          try {
            userToken = await SecureStore.getItemAsync('User');
            setData(userToken)
          } catch (e) {
            console.log(e)
          }
        };
    
        bootstrapAsync();
      }, [dataUser]);

  return (
    <UserContext.Provider value={{dataUser, setDataUser, modal, setModal, alert, setAlert, profile, setProfile}} >
      <NavigationContainer>
            {data == null ? <AuthRoutes /> : <NavRoutes />}
      </NavigationContainer>
    </UserContext.Provider>
    
  );
}



