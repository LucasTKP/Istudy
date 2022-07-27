import React from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity, Text } from 'react-native';
function Button(props) {
  return (
    <ButtonPadrao onPress={props.onPress}>
        <Text style={{fontSize: props.fontSize, color: 'white'}}> {props.Text} </Text>
    </ButtonPadrao>
  )
}

const ButtonPadrao = styled.TouchableOpacity `
    margin-top: 19px;
    width: 114px;
    height: 32px;
    border-radius:5px;
    background-color: #0353BF
    justifyContent: center;
    align-items: center;
`

export default Button

