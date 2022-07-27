
import React from 'react'
import { UserContext } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useStoreCache() {
    //Variavel global
    const {setDataUser} = React.useContext(UserContext) 
    const callStoreCache = React.useCallback(async(User) =>{    
        
        // Armazenando dados
        await AsyncStorage.setItem('User', JSON.stringify(User));
        setDataUser(User)

        // Puxando dados do cache
        const data =  await AsyncStorage.getItem('User');
        const dataFilter = (JSON.parse(data));
        },[])
  return {
    callStoreCache
    }
}

export default useStoreCache