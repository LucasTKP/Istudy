import React, { useState, useContext, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Image } from "react-native";
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native';
import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading'
import { UserContext } from '../../App';
import BoxAlert from './BoxAlert'




export default function BoxCode({codeEmail, email, password, name, funcao}) {
    //variavel de navegação
    const navigation = useNavigation();
    const [error, setError] = useState(false)
    const [bordererror, setBorderError] = useState('white')
    //Variavel Informação do axios
    const { callAxios, answerAxios} = useAxios()
    //Variavel de mensagem
    const [message, setMessage] = useState()

    const {modal, setModal, setAlert} = useContext(UserContext)
    //Variavel do codigo digitado
    const [input1, setInput1] = useState("")
    const [input2, setInput2] = useState("")
    const [input3, setInput3] = useState("")
    const [input4, setInput4] = useState("")

    useEffect(()=>{
      if(answerAxios.status === 200){
        navigation.navigate('SignIn')
      } else if (answerAxios.status === 201){
        setMessage(answerAxios.message)
      }
    },[answerAxios])
    
    //Variavel Loading
    const [visible, setVisible] = useState(false)
      //Verifica se o codigo digitado é o enviado no email
      async function VerifyCode(){ 
        var code = (input1 + input2 + input3 + input4)
        if (code == codeEmail){
          if(funcao === 'Cadastro'){
            const data = {
              name: name,
              email: email,
              senha: password
            }
            setVisible(true)
            try{
              await callAxios ("user/", data, "post")
            }catch(e){
              console.log(e)
            }finally{
              setVisible(false)
            }
            setModal(!modal)
            codeEmail = null //Zera o codigo
          } else {
          setModal(!modal)
          navigation.navigate('ResetPassword', {email: email, password:password})
          }
        } else {
          setError(true)
          setBorderError('#FC0004')
        }
      }


  return (
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModal(!modal);
        }}
      >
      <BoxAlert message={message} type={"erro"}/>
      <ButtonSair onPress={() => setModal(!modal)}>
          <Loading visible={visible} />
          <Box color = {bordererror}>
          <Image source={{uri: 'https://cdn.discordapp.com/attachments/964683470842499182/999797344465854579/Group_38.png'}} style={{width: 60, height: 50}}></Image>

          <TextWarning>Enviamos um email de verificação, digite o código:</TextWarning>

          <DivInputCode>
            <InputCode maxLength={1} onChangeText={(text) => setInput1(text)} />
            <InputCode maxLength={1} onChangeText={(text) => setInput2(text)}/>
            <InputCode maxLength={1} onChangeText={(text) => setInput3(text)}/>
            <InputCode maxLength={1} onChangeText={(text) => setInput4(text)}/>
          </DivInputCode>
            
          <ButtonEnviar onPress={() => VerifyCode()}>
            <TextButtonEnviar>Enviar</TextButtonEnviar>
          </ButtonEnviar>

          {error ? <TextError>O CODIGO DIGITADO ESTA ERRADO, TENTE NOVAMENTE</TextError> : <Text style={{display: 'none'}}></Text>}
        </Box>
      </ButtonSair>
      </Modal>

  )
}
const ButtonSair = styled.TouchableOpacity `
height: 100%;
 alignItems: center;
 justifyContent: center;
 background: rgba(0, 0, 0, 0.80);
`

const TextError = styled.Text `
color: white;
width:200px;
margin-top: 5px;
font-size: 13px;
text-align: center;
`

 const Box = styled.View `
 width:300px
 height:308px
 background-color: #004973;
 alignItems: center;
 justifyContent: center;
 border: 2px solid  ${props => props.color};
 border-radius: 8px
 `

 const DivInputCode = styled.View `
 flexDirection: row;
 justifyContent: space-between;
 width:80%; 
 marginTop: 15px ;
 fontSize: 20px
 ` 

 const TextWarning = styled.Text `
 width: 227px;
 fontSize: 20px;
 color: white;
 text-align: center;
 `

 const InputCode = styled.TextInput `
 width: 40px;
 height: 43px;
 border-radius: 8px;
 background-color: #91BDD8;
 border: 1px solid #007FC7;
 font-size: 30px;
 text-align: center;
 `
const ButtonEnviar = styled.TouchableOpacity `
width:91px;
height:32px;
border-radius: 8px;
background-color: #91BDD8;
alignItems: center;
margin-top: 30px;
`

const TextButtonEnviar = styled.Text `
color: black;
fontSize: 20px;
`

