import React, { useState, useContext, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Image, TouchableOpacity, View} from "react-native";
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native';
import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading'
import { UserContext } from '../../App';
import BoxAlert from './BoxAlert'
import { TextInput } from "react-native-gesture-handler";
import CodeInput from 'react-native-confirmation-code-input';




export default function BoxCode({codeEmail, email, password, name, funcao}) {
    console.log(codeEmail)
    //variavel de navegação
    const navigation = useNavigation();
    const [error, setError] = useState(false)
    const [bordererror, setBorderError] = useState('white')
    //Variavel Informação do axios
    const { callAxios, answerAxios} = useAxios()
    //Variavel de mensagem
    const [message, setMessage] = useState()
    const [code, setCode] = useState()

    const {modal, setModal, setAlert} = useContext(UserContext)
    //Variavel do codigo digitado

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
      <TouchableOpacity style={styles.buttonSair} onPress={() => setModal(!modal)}>
          <Loading visible={visible} />
          <View  style={{width: 300,
    height:308,
    backgroundColor: '#004973',
    alignItems: 'center',
    justifyContent: 'center', 
    borderRadius: 8, borderWidth: 2, borderColor: bordererror}}>
          <Image source={{uri: 'https://cdn.discordapp.com/attachments/964683470842499182/999797344465854579/Group_38.png'}} style={{width: 60, height: 50}}></Image>

          <Text style={styles.textWarning}>Enviamos um email de verificação, digite o código:</Text>

          <View style={styles.divInputCode}>
          <CodeInput
            keyboardType="numeric"
            className={'border-b'}
            space={10}
            codeLength={4}
            size={30}
            inputPosition='center'
            onFulfill={(code) => setCode(code)}
          />
          </View>
            
          <TouchableOpacity style={styles.buttonEnviar} onPress={() => VerifyCode()}>
            <Text style={styles.textButtonEnviar}>Enviar</Text>
          </TouchableOpacity>

          {error ? <Text style={styles.textError}>O CODIGO DIGITADO ESTA ERRADO, TENTE NOVAMENTE</Text> : <Text style={{display: 'none'}}></Text>}
        </View>
      </TouchableOpacity>
      </Modal>

  )
}

const styles = StyleSheet.create({
  buttonSair:{
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.80)',
  },
  textError:{
    color: 'white',
    width: 200,
    marginTop: 5,
    fontSize: 13,
    textAlign: 'center',
  },
  box:{
    width: 300,
    height:308,
    backgroundColor: '#004973',
    alignItems: 'center',
    justifyContent: 'center', 
    borderRadius: 8,
  },
  divInputCode:{
    flexDirection: 'row',
    justifyContent: "space-between" ,
    width: '80%',
    marginTop: 15,
    fontSize: 20,
  },
  textWarning:{
    width: 227,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  inputCode:{
    width: 40,
    height: 43,
    borderRadius: 8,
    backgroundColor: '#91BDD8',
    borderWidth: 1, 
    borderColor: '#007FC7',
    fontSize: 30,
    textAlign: 'center',
  },
  buttonEnviar:{
    width:91,
    height:32,
    borderRadius: 8,
    backgroundColor: '#91BDD8',
    alignItems: 'center',
    marginTop: 30,
  },
  textButtonEnviar:{
    color: 'black',
    fontSize: 20,
  }

})
