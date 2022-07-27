import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native'
import Loading from '../components/Loading'
import useAxios from '../hooks/useAxios'
import Input from '../components/Input'

export function ResetPassword({navigation, route}) {
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
    const {navigationAxios, callAxios, answerAxios} = useAxios()
    //Variavel para mudar de pagina
    const [page, setPage] = useState("")
    //Variavel NameIcon
    const [nameIcon, setNameIcon] = useState("eye-off");


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
    console.log(isEqualsPasswords)
    if (errorEqualsPassword === false){

      setVisible(true)
      const data = {
        senha: password
      } 
      try{
        await callAxios ("user/password/" + route.params.email, data, "put", 'Login')
      }catch(e){
        console.log(e)
      }finally{
        setVisible(false)
      }
    }
  } 

  return (
    <Container>
     <Text> Redefinir Senha</Text>
      <Loading visible={visible} />
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
        placeholder="Confirme suaSenha"
        secureTextEntry={viewPassword}
        //Info Icon
        onPress={()=> (setViewPassword(!viewPassword), VerifyEye())} 
        style={{marginTop:10,  marginRight: 5}} 
        name={nameIcon} 
        size={26} 
        color={"#444"}
        /> 
     {errorEqualsPassword ? <TextError>As senhas nao estão iguais</TextError> :  <Text style={{height:0}}></Text> }
     
     <ButtonVerify onPress={() =>  AlterPassword()}>
      <TextButtonVerify style={{color: 'white'}}>Redefinir</TextButtonVerify>
     </ButtonVerify>

    </Container>
  );
}

const Container = styled.View `
  margin-top:101px; 
  align-items: center;
  height: 100%;
`

const Text = styled.Text `
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
