import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity  } from "react-native";
import styled from 'styled-components/native'
import books from '../../assets/ImageNavBar/books.png'
import home from '../../assets/ImageNavBar/home.png'
import pen from '../../assets/ImageNavBar/pen.png'
import medals from '../../assets/ImageNavBar/medals.png'
import user from '../../assets/ImageNavBar/user.png'



export function Teste() {

  return (
    <Container>
        
        <DivNavBar>
            <BottonNavBar>
                <Image  style={{tintColor: '#23709D'}} source={user} />
                <TextButton>Criar</TextButton>
            </BottonNavBar>

            <BottonNavBar>
                <Image source={books} />
                <TextButton>Seus</TextButton>
            </BottonNavBar>

            <BottonNavBar style={{marginBottom: 50}}>
                <Image source={home} />
            </BottonNavBar>

            <BottonNavBar>
                <Image source={pen} />
                <TextButton>Criar</TextButton>
            </BottonNavBar>

            <BottonNavBar>
                <Image source={medals } />
                <TextButton>Medalhas</TextButton>
            </BottonNavBar>

        </DivNavBar>
    </Container>
  )
}
const Container =  styled.View `
width: 100%;
height: 73px;
align-items: center;
justifyContent: center;
background-color: #91BDD8;
flexDirection: row;
position: absolute;
bottom: 0
`

const DivNavBar = styled.View `
width: 94%;
align-items: center;
justifyContent: space-between;
flexDirection: row;
margin-top: 15px
margin-left: 15px
`

const BottonNavBar = styled.TouchableOpacity `
align-items: center;
`

const TextButton = styled.Text `
font-size: 12px;
color: #23709D
font-weight: bold;
`