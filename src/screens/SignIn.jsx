import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components/native'
import { Text, KeyboardAvoidingView } from 'react-native';
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
  const {setReload, setModal, setAlert} = useContext(UserContext)
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
     setReload(true)
    }
  return (
    <Container>
        <Loading visible={visible} />
        <BoxCode codeEmail={codeEmail} funcao={'Esqueceu a senha'} email={email} />
        <BoxAlert message={message} type={'erro'} />
            <TextLogar> Login </TextLogar>

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

              <ButtonForgetPassword onPress={() => ForgetPassword()}>
              <TextForgetPassword>Esqueci minha senha</TextForgetPassword>
              </ButtonForgetPassword>

              <Text style={{fontSize: 16, marginTop: 20}}>Outras formas de login</Text>
              <Google />
              <ButtonLogin style={{flexDirection: 'row'}}
                onPress={() => Login()}>
              <TextButton>Login</TextButton>
              </ButtonLogin>
              <Text style={{fontSize: 16, marginTop:20, textAlign: 'right'}} onPress={() => navigation.navigate('SignUp')}>Quero me cadastrar</Text>
    </Container>
  );
}

const Container = styled.KeyboardAvoidingView `
  align-items: center;
  background: white;  
`


const TextLogar = styled.Text `
font-size: 30px;
margin-top: 20px;
font-weight: bold;
`
const ButtonForgetPassword = styled.TouchableOpacity `
`

const TextForgetPassword = styled.Text `
margin-top: 3px;
margin-left: 100px;
color: #0353BF;
font-size: 16px;
text-align: right;
`

const ButtonLogin = styled.TouchableOpacity `
  border: 1px solid black;
  border-radius: 20px;
  width: 295px;
  height: 69px;
  justifyContent: center;
  align-items: center;
  background-color: #0353BF;
  margin-top: 50px;
`
const TextButton = styled.Text `
font-size: 25px;
font-size: 24px;
color:white;
`


const TextError = styled.Text `
color: red;
width: 300px;
text-align: center;
`

