import React, { useContext, useState, useEffect } from 'react';
import Loading from '../components/Loading'
import { UserContext } from '../../App';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity  } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import io from "socket.io-client/dist/socket.io";
import ImageChooseGame from '../../assets/ImagePages/chooseGame.svg'
import IconSearch from '../../assets/ImageIcons/iconSearch.svg'
import IconPen from '../../assets/ImageIcons/iconPen.svg'
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

export function Card({ id, title, image, stars }) {
  const {dataUser } = useContext(UserContext)
  const navigation = useNavigation();
  const [openModal, setOpenModal] = useState(false)
  const [roomCode, setRoomCode] = useState('')
  const [visible, setVisible] = useState(false)
  const [first, setFirst] = useState(false)

  useEffect(() => {
    if(roomCode.length == 4) {
      try{
        setVisible(true)
        const socket = io("https://istudy-online-production.up.railway.app", {
          transports: ["websocket"]
        })

        socket.emit('join_room', {room_id: Number(roomCode), name: dataUser.name, foto: 'https://conteudo.imguol.com.br'})
        socket.on('resJoinRoom', (msg) => {
          if(msg.ready) {
              setVisible(false)
              navigation.navigate('GameQuestions', {roomId: msg.room, flashId: msg.flashId, first: first})
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }, [roomCode])

  function create(flashId, flashTitle) {
    try{
      setVisible(true)
      const socket = io("https://istudy-online-production.up.railway.app", {
          transports: ["websocket"]
      })

      socket.emit('create_room', {flash_id: flashId, name: dataUser.name, foto: 'https://conteudo.imguol.com.br'})

      socket.on('resJoinRoom', (msg) => {
        if (msg.ready) {
          setVisible(false)
          navigation.navigate('GameQuestions', {roomId: msg.room, flashId: flashId, first: first})
        }
      })
      socket.on('resCreateRoom', (msg) => {
        setVisible(false)
        navigation.navigate('WaitingPlayer', {name: flashTitle, roomId: msg.room, type: 'create', flashId: flashId})
        setFirst(true)
      }) 
    } catch (e) {
      console.log(e)
    }
  }

  function play(flashId, flashTitle) {
    try{
      setVisible(true)
      const socket = io("https://istudy-online-production.up.railway.app", {
          transports: ["websocket"]
      })

      socket.emit('find_room', {flash_id: flashId, name: dataUser.name, foto: 'https://i1.sndcdn.com/avatars-000396781371-h4mpjo-t500x500.jpg'})
      socket.on('resFindRoom', (msg) => {
      if(msg.ready) {
          setVisible(false)
          navigation.navigate('GameQuestions', {roomId: msg.room, flashId: flashId, first: first})
        } else {
          setVisible(false)
          navigation.navigate('WaitingPlayer', {name: flashTitle, roomId: msg.room})
          setFirst(true)
        }
      })
    } catch (e) {
      console(e)
    }
  }

  return (
    <View style={styles.Container}>
      <ScrollView>
      <Loading visible={visible}/>
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
                <TouchableOpacity style={styles.CreateMatch} onPress={() => {create(id, title)
                  setOpenModal(!openModal)
                }}>
                  <IconPen style={{marginLeft: 10}} />
                  <Text style={{fontSize: 20, fontWeight: '400', color:'#91BDD8', marginRight: 10, paddingVertical: 5, paddingHorizontal: 10}}>Criar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {play(id, title)
                  setOpenModal(!openModal)
                }} style={styles.CreateMatch}>
                  <AntDesign name="play" size={28} style={{color:'#91BDD8', marginLeft: 10}} color="black" />
                  <Text style={{fontSize: 20, fontWeight: '400', color:'#91BDD8', marginRight: 10, padding: 5}}>Jogar</Text>
                </TouchableOpacity>
                 
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
                <View style={{width: 235, marginTop: 10 , marginBottom: 10 ,height: 211, backgroundColor: '#20638A' , borderRadius: 20 }}>
                <Image style={styles.ImageFlashCard} source={{uri: image}}/>
                <View style={styles.DivConfigComponents}>
                  <Text style={{ fontSize: 15, color: '#F5F5F5'}}>{title}</Text>
                </View>
                  <View style={styles.DivConfigComponents}>
                      <View style={{flexDirection: 'row', width: 60, justifyContent: 'space-between'}} >

                          <View style={styles.DivDataDecks}>
                              <Text>⭐</Text>
                              <Text style={{fontWeight: '800'}}>{stars}</Text>
                          </View>
                          <View style={styles.DivDataDecks}>
                              <Text>🕓</Text>
                              <Text style={{fontWeight: '800'}}>10</Text>
                          </View>
                      </View>
                      <TouchableOpacity style={styles.ButtonJogar} onPress={() => {setOpenModal(!openModal)
                      }}>
                          <Text style={{color: 'white', fontSize: 20}}>Jogar</Text>
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


