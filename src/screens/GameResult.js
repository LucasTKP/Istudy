import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Container, ScrollViewBase, ScrollViewComponent} from 'react-native';
import IconHouse from '../../assets/ImageIcons/iconHouse.svg'
export function GameResult() {
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#005483'}}>
        <ScrollView contentContainerStyle={{width: '100%', height: '100%', alignItems: 'center'}}>
          <View style={styles.header}>
            <View style={{width: '94%', height: 3, backgroundColor: 'rgba(193, 193, 193, 1)', marginTop: 70}}>
              <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}></View>
            </View>
          </View>

        <Text style={{fontSize:50, fontWeight: '500', color:'#fff', marginTop: '12%'}}>PARABÉNS!!!</Text>

        <View style={{width: '80%', height: '65%', alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.textArea}>
              <View style={styles.resultPlayer}>
                <View style={styles.avatarPlayer}></View>
                <View>
                    <Text style={styles.namePlayer}>LucasTKP</Text>
                    <Text style={styles.statistics}>7/10</Text>
                </View>
                <Text style={styles.medalsPlayer}>🥇</Text>
              </View>

              <View style={styles.resultPlayer}>
                <View style={styles.avatarPlayer}></View>
                <View>
                    <Text style={styles.namePlayer}>Vinicim</Text>
                    <Text style={styles.statistics}>4/10</Text>
                </View>
                <Text style={styles.medalsPlayer}>🥈</Text>
              </View>
          </View>
          <TouchableOpacity style={styles.buttonHome}>
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