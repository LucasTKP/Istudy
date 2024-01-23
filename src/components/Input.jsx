import React, {useState} from 'react'
import { View, 
  Text, 
  StyleSheet, TextInput} from 'react-native';
import styled from 'styled-components/native'
import  Icon  from 'react-native-vector-icons/Ionicons'

function Input(props) {
  return (
    <View style={styles.divInputs}>
        <TextInput style={styles.inputText} 
            value ={props.value}
            onChangeText={props.onChangeText} 
            placeholder={props.placeholder}
            secureTextEntry={props.secureTextEntry}
            placeholderTextColor="#FFF"
            keyboardType={props.keyboardType}>
              
        </TextInput>
        <Icon style={{marginTop:10,  marginRight: 5, color:  '#FFF'}} 
        name={props.name} 
        size={props.size} 
        color={props.color} 
        onPress={props.onPress}/>
    </View>
  )
}

const styles = StyleSheet.create({
 divInputs: {
  flexDirection: 'row',
  width: 312,
  height: 45,
  marginTop:18,
  borderBottomWidth: 2,
  borderBottomColor: '#FFF',

 },

 inputText:{
  color: '#FFF',
  fontSize: 20, 
  height: '100%',
  width: '85%',
  margin: 0,
  margin: 'auto',
 }


})


export default Input