import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components/native'
import { Text, KeyboardAvoidingView, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { UserContext } from '../../App';
import Google from '../components/Google'
import Input from '../components/Input'
import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading'
import useStoreCache from '../hooks/useStoreCache';
import BoxCode from '../components/BoxCode'
import BoxAlert from '../components/BoxAlert'

export function SignIn({navigation}) {

  //Variavel global
  const {setDataUser, setModal, setAlert} = useContext(UserContext)
  // Variavel que recebe o campo email e o campo senha
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  //Variaveis erro
  const [errorPassword, setErrorPassword] = useState("true")
  //Variavel Loading
  const [visible, setVisible] = useState(false)
  //Variavel Icon/View Password
  const [viewPassword, setViewPassword] = useState(true); 
  //Variavel NameIcon
  const [nameIcon, setNameIcon] = useState("eye-off");
  //Variavel Informação do axios
  const {callAxios, answerAxios} = useAxios()
  //Variavel Informação do StoreCache
  const {callStoreCache} = useStoreCache()
  //codigo que chega no email
  const [codeEmail, setCodeEmail] = useState("")
  //Variavel de mensagem
  const [message, setMessage] = useState()

  //executa apos o answerAxios alterar
  useEffect(()=>{
    
    if(answerAxios.data){
      if(answerAxios.status === 200){
      StoreCache()
      }
    } else if(answerAxios.status === 201){
      setAlert(true)
      setMessage(answerAxios.message)
    }else if(answerAxios.status === 200){
      setModal(true)
      setCodeEmail(answerAxios.code)
    }
},[answerAxios])

  //executa apos o password ser mudado
  useEffect(()=>{
    Validate()
  },[password])

  //Valida a senha de acordo com o regex
   function Validate(){
    const regexPassword = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/

    setErrorPassword(true)
  
    if (password.length > 1 && !regexPassword.test(password)){
      setErrorPassword(false)
      return false
    }
  }

  //change the name of Icon of eye of input de password
  function VerifyEye(){
    if(viewPassword === true){
      setNameIcon("eye")
    } else if (viewPassword === false){
      setNameIcon("eye-off")
    }
  }

  //Executa a função do axios para verificar se o email e senha
  async function Login(){
    setVisible(true)
    const data = {
      email: email,
      senha: password
    } 
    try{
      await callAxios ("user/Login", data, "post")
    }catch(e){
      console.log(e)
    }finally{
      setVisible(false)
    }
  }
 
  //Executa a função do axios para verificar se o email existe
  async function ForgetPassword(){
    setVisible(true)
    const data = {
      email: email
    } 
    try{
      await callAxios ("user/password", data, "post") 
    } catch(e) {
      console.log(e)
    } finally {
      setVisible(false)
    }
}

//Executa o useSroteCache e armazena o cache
    function StoreCache(){
      const User = {
        id: answerAxios.data.id,
        email: answerAxios.data.email,
        name: answerAxios.data.name,
        token: answerAxios.token,
        image: answerAxios.data.image_url,
        matches: answerAxios.statistics[0].playeds,
        wins: answerAxios.statistics[0].wins,
        defeats: answerAxios.statistics[0].loses
      }
     callStoreCache(User)
     navigation.navigate('Home')
    }
  return (
    <View style={styles.container}>
        <Loading visible={visible} />
        <BoxCode codeEmail={codeEmail} funcao={'Esqueceu a senha'} email={email} />
        <BoxAlert message={message} type={'erro'} />

            <TouchableOpacity 
                style={styles.seta}
                onPress={ () => navigation.navigate('Entry')}>
                <Image source={require('../../assets/seta.png')} />
            </TouchableOpacity>

            <View style={styles.containerLogo}>
                <Image 
                source={require('../../assets/imageSingIn.png')} />
            </View>

            <Text style={styles.textTitle}> Login </Text>

            <View style={styles.containerForm}>

                <Input  
                // Propriedade dos Inputs
                  onChangeText={(Text)=> (setEmail(Text), Validate())}
                  placeholder="Email" 
                  keyboardType='email-address'

                // Propriedade dos Icones
                  name="md-mail" 
                  size={26} 
                  color={"#444"}
                  /> 

                <Input 
                  // Propriedade dos Inputs
                  onChangeText={(Text)=> (setPassword(Text))}
                  placeholder="Senha"
                  secureTextEntry={viewPassword} 
                  
                  // Propriedade dos Icones
                  onPress={()=> (setViewPassword(!viewPassword), VerifyEye())}  
                  name={nameIcon} 
                  size={26} 
                  color={"#444"}/>

                  {/* Erro De senha */}
                  {errorPassword ? <Text style={{height:0}}></Text> : <TextError>A senha deve conter 8 letras, minusculas, maiusculas e numeros</TextError>}  

              <TouchableOpacity style={styles.buttonForgetPassword} onPress={() => ForgetPassword()}>
              <Text style={styles.textForgetPassword}>Esqueci minha senha</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonLogin}
                onPress={() => Login()}>
                <Image source={require('../../assets/setaDireita.png')} />
              </TouchableOpacity>
              
              {/*<Text style={{fontSize: 16, marginTop:20, textAlign: 'right'}} onPress={() => navigation.navigate('SignUp')}>Quero me cadastrar</Text>*/}
              <Google/>
              </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#004973',
    
  },
  seta:{
    marginTop: 40,
    marginLeft: 40,

  },
  containerLogo: {
    flex:1,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle:{
    fontSize: 30,
    fontWeight:'bold',
    color: '#FFFF', 
    marginTop: 40,
    marginLeft: 40,
  },
  containerForm:{
    flex:2,
    marginTop: 0,
    alignItems: 'center',
  },
  textForgetPassword:{
    color: '#91BDD8',
    fontSize: 14,
  },
  buttonForgetPassword:{
    marginLeft: -180,
    marginTop:10,
  },
  buttonLogin:{
    marginTop: 48,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: "#007FC7",
    borderRadius: 100,
    paddingVertical: 25,
    paddingHorizontal: 35,
    width: 30
  }




})


const TextError = styled.Text `
color: red;
width: 300px;
text-align: center;
`

