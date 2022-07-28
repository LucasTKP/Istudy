import React, { useContext, useState, useEffect } from 'react';
import { Text } from 'react-native';
import logo from '../../assets/logo.png'
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading'

export function Autenticacion({ navigation }) {
  //Variavel Informação do axios
  const {callAxios, answerAxios} = useAxios()
  //Variavel Loading
  const [visible, setVisible] = useState(false)
  //Variavel do que contem no chache
  const [dataFilterGlobal, setDataFilterGlobal] = useState()

  GetCache()

  //Puxa oque esta no chache
  async function GetCache(){
    const data =  await AsyncStorage.getItem('User');
    const dataFilter = (JSON.parse(data));
    setDataFilterGlobal(dataFilter)
  }

  //Verifica se existe o token e se é valido
 async  function verifyUser() {
  if(dataFilterGlobal){
      const data = {
        token: dataFilterGlobal.token
      }
      setVisible(true)
      try{
        await callAxios ("user/token", data, "post", 'Home')
      }catch(e){
        console.log(e)
      }finally{
        setVisible(false)
      }
    } else {
      navigation.navigate("SignIn")
    }
}

//Executa apos vim uma resposta do axios
useEffect(()=>{
  if(answerAxios.status === 200){
    setDataUser(dataFilterGlobal)
  } 
},[answerAxios])

  return (
    // Container = View / Body (html), criado com o styled component na linha 28.
    <Container>
      <Loading visible={visible} />
       {/* ImageIcon = Image do react-native */}
        <ImageIcon source={logo}/>
        <TextEntry>Conheça e estude com outros alunos </TextEntry>
        <Text2>Faça Já seu cadastro e venha estudar conosco: </Text2>
        {/* LoginButton = TouchableOpacity */}
         <ButtonEntry onPress={() => verifyUser()}>
        {/* Text puxado direto do react-native */}
          <TextButton>Vamos la!</TextButton>
        </ButtonEntry>

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
padding-top: 20px;
padding-bottom: 20px;
`

const TextButton = styled.Text `
font-size: 20px;
color: #fff;
align-items: center;
margin: 0 auto;
margin-top:10px;
`

const ButtonEntry= styled.TouchableOpacity `
  background: #0353BF;
  width: 200px;
  height: 50px;
  align-items: center;
  margin: 25px 10px 25px 10px;
  border-radius: 20px;
`