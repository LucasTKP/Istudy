import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native'
import { Alert } from 'react-native'
import useAxios from '../hooks/useAxios'


export function Confirmation({navigation, route}) {

    //Codigo digitado
    const [code, setCode] = useState("")
    //Codigo enviao no email
    var codeEmail = route.params.code
    console.log(codeEmail)
    //Variavel Informação do axios
    const {navigationAxios, callAxios, answerAxios} = useAxios()
    //Variavel com nome da Pagina no navigation.navigate
    const [page, setPage] = useState("")
    //Variavel Loading
    const [visible, setVisible] = useState(false)
    
    
  
    useEffect(()=>{
      if(navigationAxios === true){
        navigation.navigate(page)
      }
    },[navigationAxios, answerAxios])

    //Cadastra o usuario no banco de dados
    async function Cadastrar(){
      if (code == codeEmail){
          
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
     <Loading visible={visible} />
     <Text> Digite o codigo que foi enviado para seu Email</Text>

     <Input  
        placeholder="Codigo"
        onChangeText={(Number) => setCode(Number)} 
        keyboardType={'number-pad'} 
        maxLength={6}>
     </Input>

     <ButtonVerify onPress={() => Cadastrar()}>
      <TextButtonVerify style={{color: 'white'}}>Verificar</TextButtonVerify>
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

const Input = styled.TextInput `
  border: 1px solid black;
  padding: 10px;
  margin-top: 50px;
  width: 300px;
  border-radius: 8px;
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
