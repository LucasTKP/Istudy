import React, {useState, useEffect} from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


function useAxios() {
  const navigation = useNavigation();
  // Variavel de resposta do axios
  const  [navigationAxios, setNavigationAxios] = useState(false)
  let answer
  const [message, setMessage] = useState(null)  

  const  [answerAxios, setanswerAxios] = useState({})

  const callAxios = React.useCallback(async(url, data, type, page) =>{
    
    const urlAxios = "https://istudy-back-production.up.railway.app/api/v1/" + url 

    const config = {
        headers:{
          Authentication: "donos_do_codigo"
        }
      }

      try {
        if (url != ""){
          if(type === "post") {
            answer = await axios.post(urlAxios, data, config)
          } else if (type === "get"){
            answer = await axios.get(urlAxios, config)
          }  else if (type === "put"){
            answer = await axios.put(urlAxios, data, config)  
          }
          setanswerAxios(answer.data)
          
          if (answer.data.status === 200){
            if(answer.data.message){ 
              Alert.alert(
                "Sucesso ",
                answer.data.message,
                [{ text: "OK"}]
              ) 
            }
            if(page != undefined){
              if(page === 'Modal'){
              
                setNavigationAxios("Modal")
              } else {
                navigation.navigate(page)
              }
            } 
            
            
          } 
          
          if (answer.data.status === 201){
              setMessage(answer.data.message)
          }
           
        }
        } catch (e) {
            console.log(e)
        }
    },[])
  return { 
    navigationAxios,
    message,
    answerAxios,
    callAxios
  }
}
export default useAxios
  
  


