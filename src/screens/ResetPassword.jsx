import React, {useState, useEffect, useContext} from 'react';
import { Text, KeyboardAvoidingView, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native'
import Loading from '../components/Loading'
import useAxios from '../hooks/useAxios'
import Input from '../components/Input'
import BoxAlert from '../components/BoxAlert'
import { UserContext } from '../../App';
import ImageNewPassword from '../../assets/ImageNavBar/arrow.svg'
import ArrowRight from '../../assets/ImageNavBar/arrow.svg'
import ImageGoogle from '../../assets/ImageNavBar/arrow.svg'

export function ResetPassword({navigation, route}) {
     //Variavel global
  const {setAlert} = useContext(UserContext)
    //Variaveis de senha e confirmação de senha
    const [password, setPassword] = useState("")
    const [confirmationPassword, setConfirmationPassword] = useState("")
    //Variaveis erro
    const [errorPassword, setErrorPassword] = useState(true)
    const [errorEqualsPassword, setErrorEqualsPassword] = useState(true)
    //Variavel de Loading
    const [visible, setVisible] = useState(false)
    //Variavel Icon/View Password
    const [viewPassword, setViewPassword] = useState(true); 
    //Variavel Informação do axios
    const {callAxios, answerAxios} = useAxios()
    //Variavel NameIcon
    const [nameIcon, setNameIcon] = useState("eye-off");
    //Variavei do alert
    const [message, setMessage] = useState()
    const [typeAlert, setTypeAlert] = useState()



    useEffect(()=>{
      if(answerAxios.status === 200){
        setTypeAlert("sucesso")
        setMessage(answerAxios.message)
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
          navigation.navigate('SignIn')
        }, 1000)
      } else if(answerAxios.status === 201) {
        setTypeAlert("erro")
        setMessage(answerAxios.message)
        setAlert(true)
      }
    },[answerAxios])


    //Função para executar a validação da senha
    useEffect(()=>{
      isValidatad()
    },[password])
    useEffect(()=>{
      isEqualsPasswords()
    },[confirmationPassword])


    //função para validar a password 
    function isValidatad(){
        const regexPassword = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/
    
        setErrorPassword(true)
      
        if (password.length > 1 && !regexPassword.test(password)){
          setErrorPassword(false)
          return false
        }
      }
    //Função para mudar o icone do input password
      function VerifyEye(){
        if(viewPassword === true){
          setNameIcon("eye")
        } else if (viewPassword === false){
          setNameIcon("eye-off")
        }
      }

    //função para verificar se as senhas estao iguais
    function isEqualsPasswords(){
      if (password === confirmationPassword){
        setErrorEqualsPassword(false)
        return true
      } else {
        setErrorEqualsPassword(true)
      }
    }  
    //função para trocar a senha
  async function AlterPassword(){ 
    if (errorEqualsPassword === false){

      setVisible(true)
      const data = {
        senha: password
      } 
      try{
        await callAxios ("user/password/" + route.params.email, data, "put")
      }catch(e){
        console.log(e)
      }finally{
        setVisible(false)
      }
    }
  } 

  return (
    <View style={styles.container}>
      <BoxAlert message={message} type={typeAlert} />

      <View style={styles.containerLogo}>
        <ImageNewPassword />
      </View>

     
      <Loading visible={visible} />
      <View style={styles.containerForm}>
      <Text style={styles.title}> Redefinir Senha</Text>
        <Input 
        //Infor input
        onChangeText={(Text)=> (setPassword(Text))}
        placeholder="Senha"
        secureTextEntry={viewPassword}
        //Info Icon
        onPress={()=> (setViewPassword(!viewPassword), VerifyEye())} 
        style={{marginTop:10,  marginRight: 5}} 
        name={nameIcon} 
        size={26} 
        color={"#444"}
        /> 
        {errorPassword? <Text style={{height:0}}></Text> : <TextError>A senha deve conter 8 letras, minusculas, maiusculas e numeros</TextError>}

        <Input 
        //Infor input
        onChangeText={(Text)=> (setConfirmationPassword(Text))}
        placeholder="Confirme sua Senha"
        secureTextEntry={viewPassword}
        //Info Icon
        onPress={()=> (setViewPassword(!viewPassword), VerifyEye())} 
        style={{marginTop:10,  marginRight: 5}} 
        name={nameIcon} 
        size={26} 
        color={"#444"}
        /> 
     {errorEqualsPassword ? <TextError>As senhas nao estão iguais</TextError> :  <Text style={{height:0}}></Text> }
     
     <TouchableOpacity style={styles.buttonVerify} onPress={() =>  AlterPassword()}>
      <ArrowRight />
     </TouchableOpacity>
     </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#004973',
  },
  containerLogo:{
    flex:1,
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',

  },
  title:{
    fontSize: 30,
    fontWeight:'bold',
    color: '#FFFF', 
    marginTop: 40,
    width: '85%',
  },
  containerForm:{
    flex:2,
    marginTop: 0,
    alignItems: 'center',
  },
  buttonVerify:{
    marginTop: 48,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: "#007FC7",
    borderRadius: 100,
    paddingVertical: 25,
    paddingHorizontal: 35,
    width: 30  
  },



})


const Container = styled.View `
  margin-top:101px; 
  align-items: center;
  height: 100%;
`

const Ttext = styled.Text `
font-size:20px;
text-align:center;
width:80%;
`

const ButtonVerify = styled.TouchableOpacity `
  border: 1px solid black;
  border-radius: 20px;
  width: 150px;
  height: 40px;
  align-items: center;
  background-color: #0353BF;
  margin-top: 50px;
`

const TextButtonVerify = styled.Text `
font-size: 15px;
width:100%;
height:100%;
margin-top: 8px;
text-align: center;
`

const TextError = styled.Text `
color: red;
width: 300px;
text-align: center;
`
