import React, {useState, useEffect, useContext} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Container, ScrollViewBase, ScrollViewComponent, Image} from 'react-native';
import IconHouse from '../../assets/ImageIcons/iconHouse.svg'
import { UserContext } from '../../App';

export function GameResult({route ,navigation}) {
  const {dataUser} = useContext(UserContext)
  const [finalText, setFinalText] = useState('')

  useEffect(() => {
    const myResults = route.params.result.find((stats) => stats.name == dataUser.name)
    const otherResults = route.params.result.find((stats) => stats.name != dataUser.name)

    if(myResults.correct >= otherResults.correct) {
      setFinalText('PARABENS!!!')
    } else {
      setFinalText('DERROTA!!!')
    }
  }, [])

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#005483'}}>
        <ScrollView contentContainerStyle={{width: '100%', height: '100%', alignItems: 'center'}}>
          <View style={styles.header}>
            <View style={{width: '94%', height: 3, backgroundColor: 'rgba(193, 193, 193, 1)', marginTop: 70}}>
              <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}></View>
            </View>
          </View>

        <Text style={{fontSize:50, fontWeight: '500', color:'#fff', marginTop: '12%'}}>{finalText}</Text>

        <View style={{width: '80%', height: '65%', alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.textArea}>
              <View style={styles.resultPlayer}>
              <Image style={styles.avatarPlayer} source={{uri: route.params.result[0].image ? route.params.result[0].image : ''}}></Image>
                <View>
                    <Text style={styles.namePlayer}>{route.params.result[0].name ? route.params.result[0].name : ''}</Text>
                    <Text style={styles.statistics}>{route.params.result[0].correct ? route.params.result[0].correct + `/${route.params.total}`: ''}</Text>
                </View>
                <Text style={styles.medalsPlayer}></Text>
              </View>

              <View style={styles.resultPlayer}>
              <Image style={styles.avatarPlayer} source={{uri: route.params.result[1].image ? route.params.result[1].image : ''}}></Image>
                <View>
                    <Text style={styles.namePlayer}>{route.params.result[1].name ? route.params.result[1].name : ''}</Text>
                    <Text style={styles.statistics}>{route.params.result[1].correct ? route.params.result[1].correct + `/${route.params.total}`: ''}</Text>
                </View>
                <Text style={styles.medalsPlayer}></Text>
              </View>
          </View>
          <TouchableOpacity style={styles.buttonHome} onPress={() => navigation.navigate('Home')}>
                <IconHouse  />
                <Text style={{fontSize: 17, fontWeight: '500', color: 'rgba(145, 189, 216, 1)'}}>Home</Text>
          </TouchableOpacity>

        </View> 
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    width: '100%', 
    height: 93, 
    alignItems: 'center', 
    marginTop: 50, 
    backgroundColor: 'rgba(35, 112, 157, 1)'
  },

  textArea:{
    width: '100%', 
    height: 250, 
    backgroundColor:'#fff', 
    borderRadius: 10, 
    borderWidth: 3, 
    borderColor: 'rgba(0, 0, 0, 1)', 
    alignItems:'center', 
    marginTop: 16
  }, 
  resultPlayer: {
    width: '90%',
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between'
  },
  avatarPlayer: {
    width: 75,
    height: 75,
    backgroundColor:'blue',
    borderRadius: 100
  }, 
  namePlayer: {
    fontSize: 18,
    fontWeight: '500',
  }, 
  statistics: {
    fontSize: 15, 
    fontWeight: '500', 
    alignSelf: 'center', 
    marginTop:20
  },
  medalsPlayer: {
    fontSize: 40,
    width: 50
  },
  buttonHome: {
    width: 136,
    height: 38,
    borderWidth: 2,
    borderColor: 'rgba(145, 189, 216, 1)',
    borderRadius: 5,
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})