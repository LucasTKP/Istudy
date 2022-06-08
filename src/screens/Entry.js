import React from 'react';
import { Text } from 'react-native';
import logo from '../../assets/logo.png'
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native'

export function Entry({ navigation }) {
  return (
    // Container = View / Body (html), criado com o styled component na linha 28.
    <Container>
       {/* ImageIcon = Image do react-native */}
        <ImageIcon source={logo}/>

        <TextEntry>Conheça e estude com outros alunos </TextEntry>
        <Text2>Faça Já seu cadastro e venha estudar conosco: </Text2>
        
        <LoginButton
          onPress={() => navigation.navigate('Cadastro')}
        >
          <TextButton>Cadastro</TextButton>
        </LoginButton>

        <TextEntry>Já tem uma conta? Faça seu Login.</TextEntry>


        {/* LoginButton = TouchableOpacity */}
         <LoginButton
          onPress={() => navigation.navigate('Login')}
        >
        {/* Text puxado direto do react-native */}
          <TextButton>Login</TextButton>
        </LoginButton>

        <StatusBar style="auto" />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
`

const ImageIcon = styled.Image`
  margin-top: 30px;
`
const TextEntry = styled.Text `
font-size: 20px;
`

const Text2 = styled.Text `
font-size: 17px;
padding: 10px;
`

const TextButton = styled.Text `
font-size: 20px;
color: #fff;
`

const LoginButton = styled.TouchableOpacity `
  background: #0353BF;
  width: 200px;
  padding: 10px;
  align-items: center;
  margin: 10px;
  border-radius: 20px;
`