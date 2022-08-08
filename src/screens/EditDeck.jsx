import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native';
import Edit from '../../assets/edit.png'

export function EditDeck({ navigation, route }) {
    console.log(route.params)

  return (
    <View style={{backgroundColor:'#005483', height:'100%', width:'100%', alignItems: 'center'}}>
      <View style={{flexDirection:'row'}}>
        <View style={{justifyContent: 'space-between', width:'50%'}}>
          <Text style={{fontSize: 30, color: 'white'}}>Editar Deck</Text>
          <TouchableOpacity style={{
                    marginTop: 40,
                    backgroundColor: '#91BDD8',
                    borderRadius: 10,
                    width: 130
                }}><Text style={{color: '#23709D', padding: 10, fontSize: 20, fontWeight: '600', textAlign: 'center'}}>Salvar</Text></TouchableOpacity>
        </View>
        <Image source={Edit} style={{width: 120, height: 120}}/>
      </View>
      
    </View> 
  );
}

const styles = StyleSheet.create({
  
});
