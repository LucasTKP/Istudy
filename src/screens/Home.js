import React, { useContext, useState } from 'react';
import styled from 'styled-components/native'
import { UserContext } from '../../App';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity  } from "react-native";
import Arrow from '../../assets/ImageNavBar/Arrow.png'
import { Profile } from '../components/Profile'

import { useNavigation} from '@react-navigation/native'
export function Home({ navigation }) {
  const {setDataUser, dataUser, profile, setProfile} = useContext(UserContext)
  console.log(dataUser)
  const [name, setName] = useState(dataUser.name)
  return (
    // Container = View / Body (html), criado com o styled component na linha 28.
    <Container>
      {profile ? <Profile /> : <Text style={{display: 'none'}}></Text> }
      <DivHeader style={{borderBottomRightRadius: 50, borderBottomLeftRadius: 50}}>
        <ButtonHeader onPress={() => setProfile(true)}>
          <ImageProfile></ImageProfile>
          <TextName>Bons Estudos {'Natã 🤞'}</TextName>
          <ButtonProfile>
            <Image source={Arrow}></Image>
          </ButtonProfile>
        </ButtonHeader>
      </DivHeader>

      <TouchableOpacity style={{marginTop: 100,}}
        onPress={ () => navigation.navigate('Decks')}
      >       
             <Text>Entrar</Text>
      </TouchableOpacity>
    </Container>
  );
}

const Container = styled.View `
  flex: 1;
  background-color: #005483;
  align-items: center;
` 

const DivHeader = styled.View `
width: 105%;
height: 130px;
background-color: #23709D;
align-items: center;
justifyContent: center;
border: 3px solid rgba(255, 255, 255, 0.42);
`

const ButtonHeader = styled.TouchableOpacity `
width: 85%;
align-items: center;
justify-content: space-between;
flexDirection: row;
`

const ImageProfile = styled.Image `
width:51px;
height:51px;
background-color: white;
border-radius: 50px;
`

const TextName = styled.Text `
font-size: 20px;
font-weight: bold;
width: 140px
color: white;
`

const ButtonProfile = styled.TouchableOpacity `

`


