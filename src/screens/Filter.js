import React, { useEffect } from 'react';
import styled from 'styled-components/native'
import { Text, ScrollView } from 'react-native';
import Ball from '../../assets/IconFilter/Ball.png'
import Book from '../../assets/IconFilter/Book.png'
import Bottle from '../../assets/IconFilter/Bottle.png'
import Count from '../../assets/IconFilter/Count.png'
import Globe from '../../assets/IconFilter/Globe.png'
import Guitar from '../../assets/IconFilter/Guitar.png'
import Leaf from '../../assets/IconFilter/Leaf.png'
import NoteBook from '../../assets/IconFilter/NoteBook.png'




export function Filter({ navigation }) {
    const [idFilter, setIdFilter] = React.useState("undefined")
    const [nameFilter, setNameFilter] = React.useState("undefined")
    React.useEffect(() => {
        if(nameFilter != 'undefined') {
            navigation.navigate("CreateNewDeck", {idFilter: idFilter, nameFilter: nameFilter})
        }
        },[nameFilter])

    
  return (
    <BugTeclado>
        <ScrollView>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 59, textAlign: 'center' }}>Selecione a Matéria</Text>
            <DivFilterOut>
                <DivFilterInside>
                    <ImageIcon source={Globe}/>
                    <NameIcon onPress={() => (setIdFilter(2), setNameFilter('Geografia'))}>Geofrafia</NameIcon>
                </DivFilterInside>

                <DivFilterInside>
                    <ImageIcon source={Count}/>
                    <NameIcon onPress={() => (setIdFilter(3), setNameFilter('Matemática'))}>Matemática</NameIcon>
                </DivFilterInside>

                <DivFilterInside>
                    <ImageIcon source={Book}/>
                    <NameIcon onPress={() => (setIdFilter(4), setNameFilter('Português'))}>Português</NameIcon>
                </DivFilterInside>
            </DivFilterOut>

            <DivFilterOut>
                <DivFilterInside>
                    <ImageIcon source={Guitar}/>
                    <NameIcon onPress={() => (setIdFilter(1), setNameFilter('História'))}>História</NameIcon>
                </DivFilterInside>

                <DivFilterInside>
                    <ImageIcon source={Leaf}/>
                    <NameIcon onPress={() => (setIdFilter(5), setNameFilter('Biologia'))}>Biologia</NameIcon>
                </DivFilterInside>

                <DivFilterInside>
                    <ImageIcon source={Ball}/>
                    <NameIcon onPress={() => (setIdFilter(6), setNameFilter('Física'))}>Física</NameIcon>
                </DivFilterInside>
            </DivFilterOut>

            <DivFilterOut>
                <DivFilterInside>
                    <ImageIcon source={Bottle}/>
                    <NameIcon onPress={() => (setIdFilter(7), setNameFilter('Química'))}>Química</NameIcon>
                </DivFilterInside>

                <DivFilterInside>
                    <ImageIcon source={NoteBook}/>
                    <NameIcon onPress={() => (setIdFilter(8), setNameFilter('Programação'))}>Programação</NameIcon>
                </DivFilterInside>

                <DivFilterInside>
                    <ImageIcon source={Book}/>
                    <NameIcon onPress={() => (setIdFilter(9), setNameFilter('Inglês'))}>Inglês</NameIcon>
                </DivFilterInside>
            </DivFilterOut>
        </ScrollView>
    </BugTeclado>
  );
}
const BugTeclado = styled.View `
align-items: center;
width: 100%;
height:100%;
margin-bottom: 40px;
background-color: #fff;
`

const DivFilterOut = styled.View `
width: 347px;
height: 202px;
flexDirection: row;
justifyContent: space-between;
`

const DivFilterInside = styled.View `
width: 110px;
height: 202px;
background-color: #F1F3F4;
border-radius: 16px;
justifyContent: center;
align-items: center;
`

const ImageIcon = styled.Image `
width:50px;
height:50px;
`

const NameIcon = styled.Text `
margin-top: 8px;
font-size: 14px;
font-weight: bold;
`