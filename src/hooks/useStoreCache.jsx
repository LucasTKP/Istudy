import React from 'react'
import { UserContext } from '../../App';
import * as SecureStore from 'expo-secure-store';

function useStoreCache() {
    
    //Variavel global
    const {setDataUser} = React.useContext(UserContext) 
    const callStoreCache = React.useCallback(async(User) =>{    
        // Armazenando dados
        await SecureStore.deleteItemAsync('User')
        await SecureStore.setItemAsync('User', JSON.stringify(User))
        setDataUser(User)
        

        // Puxando dados do cache
        const data =  await SecureStore.getItemAsync('User')
        const dataFilter = (JSON.parse(data));
        },[])
  return {
    callStoreCache
    }
}

export default useStoreCache