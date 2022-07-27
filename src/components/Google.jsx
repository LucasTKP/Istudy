import styled from 'styled-components/native'
import * as AuthSession from 'expo-auth-session'
import  Icon  from 'react-native-vector-icons/Ionicons'
import IconGoogle from '../../assets/iconGoogle.png'


import React from 'react'
import { View, Image } from 'react-native'

function Google() {
    async function SingUpGoogle(user){
        setVisible(true)
        try{
            const urlCadastrar = "https://istudy-back-production.up.railway.app/api/v1/user"       
            
                  const data = {
                    name: user.name,
                    email: user.email,
                    senha: user.id,
                    image: user.picture
                }
                
                const config = {
                    headers:{
                      Authentication: "donos_do_codigo"
                    }
                }
    
                const resposta = await axios.post(urlCadastrar, data, config)
                console.log(resposta.data)
    
                if (resposta.data.status == 200){
                  StoreCache(resposta)
                    navigation.navigate('Home')
                }
    
            setVisible(false);
          } catch(e)  {
            setVisible(false);
            console.log(e)
          }
      }
      async function handleGoogleSignIn(){
        try{
          const Client_ID = "799907269970-ensptj6ekngvivertamcgf5df9f384dd.apps.googleusercontent.com"
          const Redirect_URI = "https://auth.expo.io/@lucastkp/authApp"
          const Scope = encodeURI("profile email")
          const Response_Type = "token"
    
          const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${Client_ID}&redirect_uri=${Redirect_URI}&response_type=${Response_Type}&scope=${Scope}`
    
         const  {type , params} = await AuthSession.startAsync({authUrl});
    
         if(type == 'success'){
          const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
          const user = await response.json();
          SingUpGoogle(user)
         }
        }catch(e){
          console.log(e)
        }
      }

  return (
    <ButtonLogin onPress={() => handleGoogleSignIn()}>
        <Image source={IconGoogle}  />
    </ButtonLogin>
  )
}



const ButtonLogin = styled.TouchableOpacity `
  border-radius: 20px;
  width: 55px;
  height: 55px;
  align-items: center;
  justifyContent: center;
  background-color: #FB8F8F;
  margin-top: 10%;
`


export default Google