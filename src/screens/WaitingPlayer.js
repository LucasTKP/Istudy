import React, {useEffect, useState} from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Clock from '../../assets/ImagePages/clock.svg'
import io from "socket.io-client/dist/socket.io";


export function WaitingPlayer({route, navigation}) {
  const [socket, setSocket] = useState('')
  const {name} = route.params
  const {roomId} = route.params

  useEffect(() => {
    setSocket(io("https://istudy-online.fly.dev", {
      transports: ["websocket"]
    }))
  }, [])

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();

        Alert.alert(
          'Sair?',
          'Deseja mesmo deixar a fila de espera?',
          [
            { text: "Não sair", style: 'cancel', onPress: () => {} },
            {
              text: 'Sair',
              style: 'destructive',
              onPress: () => {
                socket.emit('finish_game', {room_id: roomId})
                socket.on('disconnect')
                navigation.dispatch(e.data.action)
              },
            },
          ]
        );
      }),
    [navigation, socket]
  );

  return (
    <ScrollView contentContainerStyle={{width: '100%', height: '100%', backgroundColor: '#005483', alignItems: 'center'}}>
      <View style={{width: '70%', alignItems: 'center'}}>
        <Text onPress={() => navigation.navigate('GameQuestion')} style={{fontWeight: '600', fontSize:20, color: '#fff', marginTop:36, alignSelf: 'flex-start'}}>Esperando Por Jogadores...</Text>
        <View style={{width: 70, height: 3, backgroundColor: '#fff', alignSelf: 'flex-start', marginTop: 5}}></View>
        <TouchableOpacity style={styles.buttons}><Text style={{fontSize:20, color: '#fff', fontWeight: '400'}}>{name}</Text></TouchableOpacity>
        <Clock style={{marginTop: 180}}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttons:{
    width: 350,
    height: 35,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#fff',
    marginTop: 27,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
