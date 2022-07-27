import React, { useState, useContext } from "react";
import { Alert, Modal, StyleSheet, Text, Image } from "react-native";
import styled from 'styled-components/native'
import  Icon  from 'react-native-vector-icons/MaterialIcons'
import { UserContext } from '../../App';


export default function ConfirmationCode({message, type}) {

  //Variavel global
  const {setAlert, alert} = useContext(UserContext)
  console.log(alert)
    var name = ""
    if(type === 'sucesso'){
      name = 'file-download-done'
    } else if (type === 'erro'){
      name = 'warning'
    }

  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={alert}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setAlert(!alert);
        }}>

        <ButtonSair onPress={() => setAlert(!alert)}>
          <Box>
          <Icon style={{marginTop:10,  marginRight: 5, color: 'white'}} name={name} size= {50}/>

            <TextWarning>{message}</TextWarning>
              
            <ButtonEnviar onPress={() => setAlert(!alert)}>
              <TextButtonEnviar>OK</TextButtonEnviar>
            </ButtonEnviar>
          </Box>
        </ButtonSair>
      </Modal>

  )
}
 const Box = styled.View `
 width:300px
 height:308px
 background-color: #004973;
 alignItems: center;
 justifyContent: center;
 border: 2px solid  white;
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

const ButtonSair = styled.TouchableOpacity `
height: 100%;
 alignItems: center;
 justifyContent: center;
 background: rgba(0, 0, 0, 0.80);
`