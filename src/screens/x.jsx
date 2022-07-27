import React, {useState} from 'react';
import styled from 'styled-components/native'
import { Alert } from 'react-native'
import Input from '../components/Input'


export function ForgetPassword({navigation, route}) {
    //Variavel do codigo digitado
    const [code, setCode] = useState("")
    //Variavel com o email digitado no login
    const email = route.params.email
    //codigo enviado no email
    var codeEmail = route.params.code

    //Verifica se o codigo digitado é o enviado no email
    function VerifyCode(){ 
      if (code == codeEmail){
        codeEmail = null //Zera o codigo
        navigation.navigate('ResetPassword', {email: email})
      } else {
        Alert.alert(
            "Erro no Codigo",
            "O codigo que você digitou esta incorreto, verifique seu email e tente novamente",
            [{ text: "OK"}]
        );  
      }
    }

  return (
    <Container>
     <Text> Digite o codigo que foi enviado para seu Email</Text>
     <Input  
        placeholder="Codigo"
        onChangeText={(Number) => setCode(Number)} 
        keyboardType={'number-pad'} 
        maxLength={6}
      />

     <ButtonVerificar onPress={() => VerifyCode()}>
      <TextButton style={{color: 'white'}}>Verificar</TextButton>
     </ButtonVerificar>

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

const ButtonVerificar = styled.TouchableOpacity `
  border: 1px solid black;
  border-radius: 20px;
  width: 150px;
  height: 40px;
  align-items: center;
  background-color: #0353BF;
  margin-top: 50px;
`

const TextButton = styled.Text `
font-size: 15px;
width:100%;
height:100%;
margin-top: 8px;
text-align: center;
`
