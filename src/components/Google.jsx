import * as AuthSession from 'expo-auth-session'
import Loading from '../components/Loading'
import axios from 'axios';
import React from 'react'
import {Image, TouchableOpacity, StyleSheet, Text } from 'react-native'
import useStoreCache from '../hooks/useStoreCache'
import ImageGoogle from '../../assets/ImageAutentication/imageGoogle.svg'

function Google() {
  const [visible, setVisible] = React.useState(false)
  //Variavel Informação do StoreCache
  const {callStoreCache} = useStoreCache()
    async function SingUpGoogle(user){
        setVisible(true)
        try{
          const urlCadastrar = "https://istudy-back-production.up.railway.app/api/v1/user/"       

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

          if (resposta.data.status == 200){
            const User = {
              id: resposta.data.data.id,
              email:resposta.data.data.email,
              name: resposta.data.data.name,
              token: resposta.data.token,
              image: resposta.data.data.image_url,
              matches: resposta.data.statistics[0].playeds,
              wins: resposta.data.statistics[0].wins,
              defeats: resposta.data.statistics[0].loses
            }
            callStoreCache(User)
          }
          } catch(e)  {
            
            console.log(e)
          } finally {
            setVisible(false);
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
    <>
    <Loading visible={visible} />
    <TouchableOpacity style={styles.buttonLogin} onPress={() => handleGoogleSignIn()}>
        <ImageGoogle />
        <Text style={styles.buttonText}>Entrar com o Google</Text>
    </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  buttonLogin:{
  marginTop: 20,
  backgroundColor: "#FFF",
  borderRadius: 20,
  paddingVertical: 15,
  paddingHorizontal: 20,
  width: 262,
  height: 54,
  flexDirection: 'row',
  },
  buttonText:{
    fontSize: 16,
    color: '#004973',
    marginLeft: 24,
},
buttonGoogle:{
    alignSelf: 'center',
},

})


export default Google