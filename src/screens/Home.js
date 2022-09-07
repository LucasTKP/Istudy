import React, { useContext, useState } from 'react';
import styled from 'styled-components/native'
import { UserContext } from '../../App';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity  } from "react-native";
import Arrow from '../../assets/ImageNavBar/arrow.svg'
import { Profile } from '../components/Profile'
import { ScrollView } from 'react-native-gesture-handler';
export function Home({ navigation }) {
  const {dataUser, profile, setProfile} = useContext(UserContext)
  return (
    <View style={styles.Container}>
      {profile ? <Profile /> : <Text style={{display: 'none'}}></Text> }
      <ScrollView style={{width: '100%'}}>
        <TouchableOpacity  onPress={() => setProfile(!profile)} style={styles.DivHeader}>
          <View style={styles.ButtonHeader} onPress={() => setProfile(true)}>
            <View style={{width: 100, height: 100}}>
              <Image style={styles.ImageProfile} source={{uri: dataUser.image}}></Image>
            </View>
            <Text style={{fontSize:20, fontWeight:'bold' , width: 140, color: '#fff'}}> Bons Estudos {dataUser.name}</Text>
              <Arrow  />
          </View>
        </TouchableOpacity>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between'}}>
            <View>
              <Text style={{fontSize:20, fontWeight:'400', color: '#F0F0F0'}}>Cards</Text>
              <View style={{width: 55, height: 3, backgroundColor: '#F0F0F0'}}></View>
            </View>
            <Text style={{fontSize: 20, fontWeight: '400', color: '#91BDD8'}}>Ver Mais</Text>
          </View>
          <View style={{flexDirection: 'row', width: 235, height: 211,}}>
            <View style={{width: 235, height: 211, backgroundColor: '#23709D', borderRadius: 20, position: 'absolute', zIndex: 3}}>
                  <Image style={styles.ImageFlashCard}/>
                  <View style={styles.DivConfigComponents}>
                      <Text style={{ fontSize: 15, color: '#F5F5F5'}}>Revolução Francesa</Text>
                      <View style={styles.FlashCardDificulty}>
                          <Text style={{fontSize: 8, paddingLeft: 2}}>🔴</Text>
                          <Text style={{fontSize: 8}}>🟡</Text>
                          <Text style={{fontSize: 8, paddingRight: 2}}>🟢</Text>
                      </View>
                  </View>
                      <View style={styles.DivConfigComponents}>
                          <View style={{flexDirection: 'row', width: 60, justifyContent: 'space-between'}} >

                              <View style={styles.DivDataDecks}>
                                  <Text>⭐</Text>
                                  <Text style={{fontWeight: '800'}}>10</Text>
                              </View>

                              <View style={styles.DivDataDecks}>
                                  <Text>🕓</Text>
                                  <Text style={{fontWeight: '800'}}>10</Text>
                              </View>
                          </View>
                          <TouchableOpacity style={styles.ButtonJogar}>
                              <Text style={{color: 'white', fontSize: 20}}> Jogar</Text>
                          </TouchableOpacity>
                  </View>
            </View>

            <View style={{width: 235, height: 211, backgroundColor: '#23709D', borderRadius: 20, position: 'absolute',zIndex: 2, left: 65}}>
                  <Image style={styles.ImageFlashCard}/>
                  <View style={styles.DivConfigComponents}>
                      <Text style={{ fontSize: 15, color: '#F5F5F5'}}>Revolução Francesa</Text>
                      <View style={styles.FlashCardDificulty}>
                          <Text style={{fontSize: 8, paddingLeft: 2}}>🔴</Text>
                          <Text style={{fontSize: 8}}>🟡</Text>
                          <Text style={{fontSize: 8, paddingRight: 2}}>🟢</Text>
                      </View>
                  </View>
                  <View style={styles.DivConfigComponents}>
                          <View style={{flexDirection: 'row', width: 60, justifyContent: 'space-between'}} >

                              <View style={styles.DivDataDecks}>
                                  <Text>⭐</Text>
                                  <Text style={{fontWeight: '800'}}>10</Text>
                              </View>

                              <View style={styles.DivDataDecks}>
                                  <Text>🕓</Text>
                                  <Text style={{fontWeight: '800'}}>10</Text>
                              </View>
                          </View>
                          <TouchableOpacity style={styles.ButtonJogar}>
                              <Text style={{color: 'white', fontSize: 20}}> Jogar</Text>
                          </TouchableOpacity>
                  </View>
            </View>

            <View style={{width: 235, height: 211, backgroundColor: '#23709D', borderRadius: 20, position: 'absolute',zIndex: 1, left: 130}}>
                  <Image style={styles.ImageFlashCard}/>
                  <View style={styles.DivConfigComponents}>
                      <Text style={{ fontSize: 15, color: '#F5F5F5'}}>Revolução Francesa</Text>
                      <View style={styles.FlashCardDificulty}>
                          <Text style={{fontSize: 8, paddingLeft: 2}}>🔴</Text>
                          <Text style={{fontSize: 8}}>🟡</Text>
                          <Text style={{fontSize: 8, paddingRight: 2}}>🟢</Text>
                      </View>
                  </View>
                  <View style={styles.DivConfigComponents}>
                          <View style={{flexDirection: 'row', width: 60, justifyContent: 'space-between'}} >

                              <View style={styles.DivDataDecks}>
                                  <Text>⭐</Text>
                                  <Text style={{fontWeight: '800'}}>10</Text>
                              </View>

                              <View style={styles.DivDataDecks}>
                                  <Text>🕓</Text>
                                  <Text style={{fontWeight: '800'}}>10</Text>
                              </View>
                          </View>
                          <TouchableOpacity style={styles.ButtonJogar}>
                              <Text style={{color: 'white', fontSize: 20}}> Jogar</Text>
                          </TouchableOpacity>
                  </View>
            </View>
          </View>

        <Text style={{fontSize: 20, fontWeight: '400', color: '#D7E3EA', marginTop: 20}}>Matérias</Text>
        <View style={{width: 50, height: 3, backgroundColor: '#D7E3EA'}}></View>
          <View style={{width: '90%', alignSelf: 'center'}}>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <TouchableOpacity style={styles.boxMetter}>
                  <Text style={styles.TextMetter}>️⌛ História</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMetter}>
                  <Text style={styles.TextMetter}>📐 Matematica</Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                <TouchableOpacity style={styles.boxMetter}>
                  <Text style={styles.TextMetter}>📚 Português</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMetter}>
                  <Text style={styles.TextMetter}>🇺🇸 Inglês</Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.boxMetter}>
                  <Text style={styles.TextMetter}>🗺️ Geografia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMetter}>
                  <Text style={styles.TextMetter}>🍃 Ciências</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.BoxRemember}>
                <View style={styles.DetailsBoxRemember}></View>
                <Text style={{fontSize: 17, fontWeight: '600', color: '#7BACC9', paddingVertical: 10, paddingLeft: 20}}>Lembretes: 📝  </Text>
                <Text style={{fontSize: 17, fontWeight: '600', color: '#7BACC9', paddingRight: 20}}>Próxima prova 21/05</Text>
              </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
  flex: 1,
  backgroundColor: '#005483',
  alignItems: 'center',
  }, 
  DivHeader: {
    width: '100%',
    marginTop: -4,
    height: 130,
    backgroundColor: '#23709D',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.42)',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  ButtonHeader: {
    width: '85%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  ImageProfile: {
    width:75,
    height:75,
    borderRadius: 50,
 },
DivFlashRecomendation2: {
    width: 235,
    height: 211,
    backgroundColor: '#23709D',
    borderRadius: 20,
    position: 'absolute',
    marginLeft: 40,

},
ImageFlashCard: {
    width: 235,
    height: 120,
    backgroundColor: 'black',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
}, 
DivConfigComponents: {
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  width: '90%', 
  alignSelf: 'center', 
  marginTop:  10
},
FlashCardDificulty: {
    width: 40, 
    height: 16, 
    backgroundColor: '#4B82A3', 
    borderRadius: 20, 
    justifyContent: 'space-between', 
    alignItems:'center', 
    flexDirection: 'row'
}, 

DivDataDecks:{
    width: 25, 
    height: 45, 
    borderRadius: 10, 
    backgroundColor: '#4B82A3', 
    alignItems: 'center', 
    justifyContent: 'center'
},
ButtonJogar: {
    width: 77, 
    height: 31, 
    backgroundColor: '#005483', 
    borderRadius: 10, 
    borderWidth: 2, 
    borderColor: '#007FC7', 
    justifyContent: 'center', 
    alignItems: 'center'
}, 

boxMetter:{
  borderWidth: 2, 
  borderColor: '#7BACC9', 
  marginTop: 5, 
  borderRadius: 50, 
  marginRight: 20
},
TextMetter: {
  fontSize: 16, 
  fontWeight: '400', 
  color: '#D7E3EA', 
  paddingVertical: 5, 
  paddingHorizontal: 15
}, 
BoxRemember: {
  flexDirection: 'row', 
  borderWidth: 2, 
  backgroundColor: 'rgba(123, 172, 201, .2)',  
  borderColor: 'rgba(123, 172, 201, 1)', 
  borderRadius: 8, 
  marginTop: 50, 
  justifyContent: 'center',
  alignItems: 'center'
},
DetailsBoxRemember: { 
  width: 10, 
  height: 10, 
  borderWidth: 2, 
  borderColor: '#7BACC9' , 
  position: 'absolute', 
  left: 5, 
  top: 5, 
  borderRadius: 100
}
  

})


