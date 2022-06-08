import React, {useState} from 'react';
import styled from 'styled-components/native'
import { Text, Alert } from 'react-native';
import  axios  from 'axios'

export function SignIn({navigation}) {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  async function Logar(){
  const urlLogar = "https://istudy-back-production.up.railway.app/api/v1/users/login"

    const data = {
      email: email,
      senha: senha
    }

    const config = {
      headers:{
        Authentication: "donos_do_codigo"
      }
    }

    const resposta = await axios.post(urlLogar, data, config)
    console.log(resposta.status)

      if (resposta.data.status == 200){
         navigation.navigate('Home')

      } else {
        Alert.alert(
          "Erro no Codigo",
            resposta.data.message,
          [{ text: "OK"}]
        )  
      }
  }

  return (
    <Container>
      <Input 
        placeholder="Email"
        onChangeText={(Text) =>setEmail(Text)}
        keyboardType='email-address'>          
        </Input>

      <Input 
        placeholder="Senha"
        onChangeText={(Text) =>setSenha(Text)}
        secureTextEntry={true}>    
        </Input>

      <Login 
        onPress={() => Logar()}>
        <TextButton>Entrar</TextButton>
      </Login>
      
    </Container>
  );
}

const Container = styled.View`
  align-items: center;
`

const Input = styled.TextInput `
  border: 1px solid black;
  padding: 10px;
  margin-top: 50px;
  width: 300px;
  border-radius: 8px;
`

const Login = styled.TouchableOpacity `
  border: 1px solid black;
  padding: 10px;
  width: 300px;
  margin-top: 50px;
  align-items: center;
  background-color: darkblue;
`
const TextButton = styled.Text `
color:white;
`
