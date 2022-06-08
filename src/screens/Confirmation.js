import React, {useState} from 'react';
import styled from 'styled-components/native'
import axios from 'axios';
import { Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

export function Confirmation({navigation, route}) {
    console.log(route.params.code)
    
    const [codeVerification, setCodeVerification] = useState("")
    async function Cadastrar(){
        const urlCadastrar = "https://istudy-back-production.up.railway.app/api/v1/users/create"
        
        if (codeVerification == route.params.code){
              const data = {
                name: route.params.name,
                email: route.params.email,
                senha: route.params.senha
            }

            const config = {
                headers:{
                  Authentication: "donos_do_codigo"
                }
            }

            const resposta = await axios.post(urlCadastrar, data, config)

            if (resposta.status == 200){
                route.params.code = 0
                navigation.navigate('Login')
            }

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
        onChangeText={(Number) => setCodeVerification(Number)} 
        keyboardType={'number-pad'} 
        maxLength={6}>
     </Input>

     <ButtonVerificar><TextButton 
      style={{color: 'white'}}
      onPress={() => Cadastrar()}>
      Verificar</TextButton></ButtonVerificar>

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

const Input = styled.TextInput `
  border: 1px solid black;
  padding: 10px;
  margin-top: 50px;
  width: 300px;
  border-radius: 8px;
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
