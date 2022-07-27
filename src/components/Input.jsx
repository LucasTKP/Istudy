import React, {useState} from 'react'
import styled from 'styled-components/native'
import  Icon  from 'react-native-vector-icons/Ionicons'

function Input(props) {
  return (
    <DivInputs style={{flexDirection: 'row'}}>
        <InputText 
            value ={props.value}
            onChangeText={props.onChangeText} 
            placeholder={props.placeholder}
            secureTextEntry={props.secureTextEntry} 
            keyboardType={props.keyboardType}>
        </InputText>
        <Icon style={{marginTop:10,  marginRight: 5, color: 'border: 1px solid rgba(0, 0, 0, 0.38)'}} name={props.name} size={props.size} color={props.color} onPress={props.onPress}/>
    </DivInputs>
  )
}



const InputText = styled.TextInput `
  height: 100%;
  width: 85%;
  margin: 0 auto;
`

const DivInputs = styled.View `
border: 1px solid rgba(0, 0, 0, 0.38);
width: 312px;
height: 56px;
margin-top:20px;
background-color: #EBEBEB
`



export default Input