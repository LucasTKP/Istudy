import React, {useState, useEffect} from 'react';
import axios from 'axios';



function useAxios() {
  // Variavel de resposta do axios
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
          } else if (type === "delete"){
            const answer = await axios.delete(urlAxios, config)
            setanswerAxios(answer.data) 
          }
        }
        } catch (e) {
            console.log(e)
        }
    },[])
  return { 
    answerAxios,
    callAxios
  }
}
export default useAxios
  
  


