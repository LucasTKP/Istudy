import React, { useEffect } from 'react';
import styled from 'styled-components/native'
import { Text, ScrollView, TouchableOpacity } from 'react-native';


export function TradeAvatar({ navigation }) {
    const [urlAvatar, setUrlAvatar] = React.useState("undefined")
    React.useEffect(() => {
        if(urlAvatar != 'undefined') {
            navigation.navigate("Profile", {urlAvatar: urlAvatar})
        }
        },[urlAvatar])

    
  return (
    <BugTeclado>
        <ScrollView>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 59, textAlign: 'center' }}>Selecione a Matéria</Text>
            <DivFilterOut>
                <DivFilterInside>
                    <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar2-removebg-preview.png')}>
                        <ImageIcon source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar2-removebg-preview.png'}} />
                    </TouchableOpacity>
                </DivFilterInside>

                <DivFilterInside>
                    <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar8-removebg-preview.png')}>
                        <ImageIcon source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar8-removebg-preview.png'}} />
                    </TouchableOpacity>
                </DivFilterInside>

                <DivFilterInside>
                    <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar9-removebg-preview.png')}>
                        <ImageIcon source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar9-removebg-preview.png'}} />
                    </TouchableOpacity>
                </DivFilterInside>
            </DivFilterOut>

            <DivFilterOut>
                <DivFilterInside>
                    <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar7-removebg-preview.png')}>
                        <ImageIcon source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar7-removebg-preview.png'}} />
                    </TouchableOpacity>
                </DivFilterInside>

                <DivFilterInside>
                    <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar1-removebg-preview.png')}>
                        <ImageIcon source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar1-removebg-preview.png'}} />
                    </TouchableOpacity>
                </DivFilterInside>

                <DivFilterInside>
                    <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar4-removebg-preview.png')}>
                        <ImageIcon source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar4-removebg-preview.png'}} />
                    </TouchableOpacity>
                </DivFilterInside>
            </DivFilterOut>

            <DivFilterOut>
                <DivFilterInside>
                    <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar10-removebg-preview.png')}>
                        <ImageIcon source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar10-removebg-preview.png'}} />
                    </TouchableOpacity>
                </DivFilterInside>

                <DivFilterInside>
                    <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar3-removebg-preview.png')}>
                        <ImageIcon source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar3-removebg-preview.png'}} />
                    </TouchableOpacity>
                </DivFilterInside>

                <DivFilterInside>
                    <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar6-removebg-preview.png')}>
                        <ImageIcon source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar6-removebg-preview.png'}} />
                    </TouchableOpacity> 
                </DivFilterInside>
            </DivFilterOut>

            <DivFilterOut>
                <DivFilterInside>   
                    <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar5-removebg-preview.png')}>
                        <ImageIcon source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar5-removebg-preview.png'}} />
                    </TouchableOpacity>
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
width:100px;
height:100px;
`
