import React, { useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../App';
import useAxios from '../hooks/useAxios'

import { NavigationContainer } from '@react-navigation/native';
import { StackRoutes } from './Stack.routes'
import { AuthRoutes } from './Auth.routes'

export function Routes() {



      //Variavel global
      const {setDataUser} = useContext(UserContext)
      //Variavel do que contem no chache
      const [dataFilterGlobal, setDataFilterGlobal] = useState()
      const [firstPage, setFirstPage] = useState(false)

      useEffect(()=>{
        GetCache()
      },[dataFilterGlobal])
       
    
      //Puxa oque esta no chache
       async function GetCache(){
        const data =  await AsyncStorage.getItem('User');
        const dataFilter = (JSON.parse(data));
        setDataFilterGlobal(dataFilter)
        await verifyUser()
      }
    
      //Verifica se existe o token e se é valido
     async  function verifyUser() {
      if(dataFilterGlobal){
          setFirstPage(true) 
          
        }
    }
    console.log(firstPage)
    
    return (
    <NavigationContainer>
     {firstPage ? <StackRoutes />  :  <AuthRoutes />}   
    </NavigationContainer>
    )   
}


