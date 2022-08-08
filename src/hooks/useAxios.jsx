import React, {useState, useEffect} from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';



function useAxios() {
  const navigation = useNavigation();
  // Variavel de resposta do axios
  const  [navigationAxios, setNavigationAxios] = useState(false)

  const  [answerAxios, setanswerAxios] = useState({})

  

  const callAxios = React.useCallback(async(url, data, type) =>{
    
    const urlAxios = "https://istudy-back-production.up.railway.app/api/v1/" + url 

    const config = {
        headers:{
          Authentication: "donos_do_codigo"
        }
      }

      try {
        if (url != ""){
          if(type === "post") {
            const answer = await axios.post(urlAxios, data, config)
            setanswerAxios(answer.data)
          } else if (type === "get"){
            const answer = await axios.get(urlAxios, config)
            setanswerAxios(answer.data)
          }  else if (type === "put"){
            const answer = await axios.put(urlAxios, data, config)
            setanswerAxios(answer.data)  
          }
        }
        } catch (e) {
            console.log(e)
        }
    },[])
  return { 
    navigationAxios,
    answerAxios,
    callAxios
  }
}
export default useAxios
  
  


