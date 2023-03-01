import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Container, ScrollViewBase, ScrollViewComponent} from 'react-native';

export function GameAnswer({navigation}) {
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#005483'}}>
        <ScrollView contentContainerStyle={{width: '100%', height: '100%', alignItems: 'center'}}>
          <View style={styles.header}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: '500', marginTop: 25}}>0:05</Text>
            <View style={{width: '94%', height: 3, backgroundColor: 'rgba(193, 193, 193, 1)'}}>
              <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}></View>
            </View>
          </View>

        <View style={{width: '80%', height: '70%', alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.textArea}>
              <Text onPress={() => navigation.navigate('GameResult')} style={{fontSize: 20, fontWeight: '500', marginTop:'20%'}}>A resposta certa é...</Text>
              <Text  style={{fontSize: 20, fontWeight: 'bold', marginTop:20}}>C)A queda da Bastilha</Text>
          </View>
          <Text style={{fontSize: 20, fontWeight: '500', marginTop:45, color: '#fff'}}>+1 Ponto</Text>
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
  }
})