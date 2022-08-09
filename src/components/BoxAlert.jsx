import React, { useState, useContext } from "react";
import { Alert, Modal, StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";
import  Icon  from 'react-native-vector-icons/MaterialIcons'
import { UserContext } from '../../App';


export default function BoxAlert({message, type}) {
  //Variavel global
  const {setAlert, alert} = useContext(UserContext)
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
          setAlert(!alert);
        }}>

        <TouchableOpacity style={styles.buttonSair} onPress={() => setAlert(!alert)}>
          <View style={styles.box}>
          <Icon style={{marginTop:10,  marginRight: 5, color: 'white'}} name={name} size= {50}/>

            <Text style={styles.textWarning}>{message}</Text>
              
            <TouchableOpacity style={styles.buttonOk} onPress={() => Exit()}>
              <Text style={styles.textButtonOk}>OK</Text>
            </TouchableOpacity>
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
  box:{
    width:300,
    height:308,
    backgroundColor: '#004973',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2, 
    borderColor: '#FFF',
    borderRadius: 8,
  },
  textWarning:{
    width: 227,
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
  },
  buttonOk:{
    width:91,
    height:32,
    borderRadius: 8,
    backgroundColor: '#91BDD8',
    alignItems: 'center',
    marginTop: 30,
  },
  textButtonOk:{
    color: 'black',
    fontSize: 20,
  },
  
})
