import React, { useContext, useState, useEffect } from 'react';
import Loading from '../components/Loading'
import { UserContext } from '../../App';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, StatusBar  } from "react-native";
import Arrow from '../../assets/ImageNavBar/arrow.svg'
import { TextInput } from 'react-native-gesture-handler';
import { Profile } from '../components/Profile'
import { ScrollView } from 'react-native-gesture-handler';
import useAxios from '../hooks/useAxios';
import useEvent from '../components/useEvent'
import io from "socket.io-client/dist/socket.io";
import ImageChooseGame from '../../assets/ImagePages/chooseGame.svg'
import IconSearch from '../../assets/ImageIcons/iconSearch.svg'
import IconPen from '../../assets/ImageIcons/iconPen.svg'
import { AntDesign } from '@expo/vector-icons'; 


export function Home({ navigation }) {
  const {callAxios, answerAxios} = useAxios()
  const {returnedEventsOrderBy, visibleTests} = useEvent()
  const [select, setSelect] = useState({on: false, index: 5})

  const [visible, setVisible] = useState(false)
  const {dataUser, profile, setProfile} = useContext(UserContext)
  const [nextEvent, setNextEvent] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [dataFlash, setDataFlash] = useState({card_id: '', card_title: ''})
  const [roomCode, setRoomCode] = useState('')
  const [socket, setSocket] = useState('')
  
  useEffect(() => {
    if(returnedEventsOrderBy != undefined){
      if(returnedEventsOrderBy.NextEvent.length){
        setNextEvent(true)
      }   
    } 
},[returnedEventsOrderBy])


  useEffect(() => {
      async function topCards() {
        try {
          await callAxios('cards/top', '', 'get')
        } catch (e) {
          console.log(e)
        }
      }

     
      setSocket(io("https://istudy-online.fly.dev", {
        transports: ["websocket"]
      }))

      topCards()
  }, [])

  useEffect(() => {
    if(roomCode.length == 4) {
      try{
        socket.emit('join_room', {room_id: Number(roomCode), name: dataUser.name, foto: 'https://conteudo.imguol.com.br'})
        socket.on('resJoinRoom', (msg) => {
          console.log(msg)
          if(msg.ready) {
              navigation.navigate('GameQuestions', {roomId: msg.room, flashId: msg.flashId})
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }, [roomCode])

  function create(id, title) {
    try{
      socket.emit('create_room', {flash_id: id, name: dataUser.name, foto: 'https://conteudo.imguol.com.br'})

      socket.on('resJoinRoom', (msg) => {
        if (msg.ready) {
          navigation.navigate('GameQuestions', {roomId: msg.room, flashId: id})
        }
      })
      socket.on('resCreateRoom', (msg) => {
        navigation.navigate('WaitingPlayer', {name: title, roomId: msg.room, type: 'create', flashId: id})
      }) 
    } catch (e) {
      console.log(e)
    }
  }
  function play(id, title) {
    try{
      socket.emit('find_room', {flash_id: id, name: dataUser.name, foto: 'https://i1.sndcdn.com/avatars-000396781371-h4mpjo-t500x500.jpg'})
      socket.on('resFindRoom', (msg) => {
      if(msg.ready) {
          navigation.navigate('GameQuestions', {roomId: msg.room, flashId: id})
        } else {
          navigation.navigate('WaitingPlayer', {name: title, roomId: msg.room})
        }
      })
    } catch (e) {
      console(e)
    }
  }


  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor={'#004973'}/>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          setOpenModal(!openModal);
        }}
        >
          <TouchableOpacity onPress={() => setOpenModal(!openModal)} style={styles.Modal}>
            <TouchableOpacity activeOpacity={1} style={styles.CheckBox}>
              <View style={{width: '80%'}}>
                <Text onPress={() => setOpenModal(!openModal)} style={{fontSize: 35, color: '#fff', position: 'absolute', right: -20}}>✖</Text>
                <ImageChooseGame style={{marginTop: 20, alignSelf: 'center'}}/>
                <View style={{width: '70%', flexDirection: 'row', backgroundColor: 'rgba(145, 189, 216, .15)', justifyContent: 'space-between', marginTop: 20, borderWidth: 3,borderColor: '#91BDD8',borderRadius: 6, alignSelf: 'center'}}>
                  <TextInput style={styles.InputSearchMatch} placeholderTextColor='#fff' onChangeText={(text) => setRoomCode(text)} placeholder="Digite a Sala"></TextInput>
                  <TouchableOpacity style={styles.ButtonSearchMatch}><IconSearch /></TouchableOpacity>

                </View>
                <TouchableOpacity style={styles.CreateMatch} onPress={() => {create(dataFlash.card_id, dataFlash.card_title)
                  setOpenModal(!openModal)
                }}>
                  <IconPen style={{marginLeft: 10}} />
                  <Text style={{fontSize: 20, fontWeight: '400', color:'#91BDD8', marginRight: 10, paddingVertical: 5, paddingHorizontal: 10}}>Criar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {play(dataFlash.card_id, dataFlash.card_title)
                  setOpenModal(!openModal)
                }} style={styles.CreateMatch}>
                  <AntDesign name="play" size={28} style={{color:'#91BDD8', marginLeft: 10}} color="black" />
                  <Text style={{fontSize: 20, fontWeight: '400', color:'#91BDD8', marginRight: 10, padding: 5}}>Jogar</Text>
                </TouchableOpacity>
                 
              </View>
            </TouchableOpacity>
          </TouchableOpacity>

      </Modal>

      {profile ? <Profile /> : <Text style={{display: 'none'}}></Text> }
      <Loading visible={visible || visibleTests}/>
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
          </View>
          <View style={{flexDirection: 'row', width: 235, height: 211,}}>
            {answerAxios.top3 && answerAxios.top3[0] ? answerAxios.top3.map((card, index) => {
              return (
                <View key={index} onTouchStart={() => setSelect({on: true, index: index})} style={{width: 235, marginTop: 10 ,height: 211, backgroundColor: select.index == index && select.on == true ? '#23709D' : '#20638A' ,borderRadius: 20, position: 'absolute', zIndex: select.index == index && select.on == true ? 100 : card.stars, left: index == 1 ? 65 : index == 2 ? 135 : 0}}>
                  <Image style={styles.ImageFlashCard} source={{uri: card.image_url}}/>
                  <View style={styles.DivConfigComponents}>
                    <Text style={{ fontSize: 15, color: '#F5F5F5'}}>{card.title}</Text>
                  </View>
                    <View style={styles.DivConfigComponents}>
                        <View style={{flexDirection: 'row', width: 60, justifyContent: 'space-between'}} >

                            <View style={styles.DivDataDecks}>
                                <Text>⭐</Text>
                                <Text style={{fontWeight: '800'}}>{card.stars}</Text>
                            </View>
                            <View style={styles.DivDataDecks}>
                                <Text>🕓</Text>
                                <Text style={{fontWeight: '800'}}>10</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.ButtonJogar} onPress={() => {setOpenModal(!openModal)
                        setDataFlash({card_id: card.id, card_title: card.title})
                        }}>
                            <Text style={{color: 'white', fontSize: 20}}>Jogar</Text>
                        </TouchableOpacity>
                  </View>
                </View>
            )}) : <Text></Text>}
          </View>
        <Text style={{fontSize: 20, fontWeight: '400', color: '#D7E3EA', marginTop: 20, alignSelf: 'center'}}>Matérias</Text>
        <View style={{width: 50, height: 3, backgroundColor: '#D7E3EA', alignSelf: 'center'}}></View>
          <View style={{width: '90%', alignSelf: 'center'}}>
              <View style={{flexDirection: 'row', marginTop: 10, alignSelf: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate("FilterMaterial", {filter: 'História'})} style={styles.boxMetter}>
                  <Text style={styles.TextMetter}>️⌛ História</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("FilterMaterial", {filter: 'Matemática'})} style={styles.boxMetter}>
                  <Text style={styles.TextMetter}>📐 Matemática</Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                <TouchableOpacity onPress={() => navigation.navigate("FilterMaterial", {filter: 'Português'})} style={styles.boxMetter}>
                  <Text style={styles.TextMetter}>📚 Português</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("FilterMaterial", {filter: 'Inglês'})} style={styles.boxMetter}>
                  <Text style={styles.TextMetter}>🇺🇸 Inglês</Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate("FilterMaterial", {filter: 'Geografia'})} style={styles.boxMetter}>
                  <Text style={styles.TextMetter}>🗺️ Geografia</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("FilterMaterial", {filter: 'Ciências'})} style={styles.boxMetter}>
                  <Text style={styles.TextMetter}>🍃 Ciências</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate("Tests")} style={styles.BoxRemember}>
                <View style={styles.DetailsBoxRemember}></View>
                {nextEvent ? 
                  <>
                    <Text style={{fontSize: 15, fontWeight: '600', color: '#7BACC9', paddingVertical: 10, paddingLeft: 20}}>Lembretes: 📝  </Text>
                    <Text style={{fontSize: 15, fontWeight: '600', color: '#7BACC9', paddingRight: 20}}>{returnedEventsOrderBy.NextEvent[0].title + " " + returnedEventsOrderBy.NextEvent[0].date}</Text>
                  </>
                :
                <Text style={{fontSize: 18, fontWeight: '600', color: '#7BACC9', padding: 5, textAlign: 'center'}}>Anote seus próximos eventos escolares</Text>
                }
              </TouchableOpacity>
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
  Modal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  CheckBox: {
    width: 350,
    height: 400,
    backgroundColor: '#004973',
    borderRadius: 10,
    borderWidth: 2, 
    borderColor: '#fff',
    alignItems: 'center',
  },
  ButtonSearchMatch: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6
  },
  InputSearchMatch: {
    width: '75%',
    height: 30,
    padding: 4, 
    color: '#fff',
    fontSize: 16
  },
  CreateMatch: {
    borderWidth: 3,
    borderColor: '#91BDD8',
    borderRadius: 6,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20, 
    flexDirection: 'row',
    backgroundColor: 'rgba(145, 189, 216, .15)'
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


