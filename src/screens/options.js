import React from 'react'
import { Text, View, StyleSheet, Modal, Image, TouchableOpacity, ScrollView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ImageChooseGame from '../../assets/ImagePages/chooseGame.svg'
import IconSearch from '../../assets/ImageIcons/iconSearch.svg'
import IconPen from '../../assets/ImageIcons/iconPen.svg'
import { AntDesign } from '@expo/vector-icons'; 

export function Options({navigation}) {
  const [chooseGame, setChooseGame] = React.useState(true)
  return (
    <TouchableOpacity onPress={() => setChooseGame(!chooseGame)} style={{width: '100%', height: '100%', backgroundColor: 'blue'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={chooseGame}
        onRequestClose={() => {
          setChooseGame(!chooseGame);
        }}
        >
          <TouchableOpacity onPress={() => setChooseGame(!chooseGame)} style={styles.Modal}>
            <TouchableOpacity activeOpacity={1} style={styles.CheckBox}>
              <View style={{width: '80%'}}>
                <Text onPress={() => setChooseGame(!chooseGame)} style={{fontSize: 35, color: '#fff', position: 'absolute', right: -20}}>✖</Text>
                <ImageChooseGame style={{marginTop: 20, alignSelf: 'center'}}/>
                <View style={{width: '70%', flexDirection: 'row', backgroundColor: 'rgba(145, 189, 216, .15)', justifyContent: 'space-between', marginTop: 20, borderWidth: 3,borderColor: '#91BDD8',borderRadius: 6, alignSelf: 'center'}}>
                  <TextInput style={styles.InputSearchMatch} placeholderTextColor='#fff' placeholder="Digite a Sala"></TextInput>
                  <TouchableOpacity style={styles.ButtonSearchMatch}><IconSearch /></TouchableOpacity>

                </View>
                <TouchableOpacity style={styles.CreateMatch}>
                  <IconPen style={{marginLeft: 10}} />
                  <Text style={{fontSize: 20, fontWeight: '400', color:'#91BDD8', marginRight: 10, paddingVertical: 5, paddingHorizontal: 10}}>Criar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.CreateMatch}>
                  <AntDesign name="play" size={28} style={{color:'#91BDD8', marginLeft: 10}} color="black" />
                  <Text style={{fontSize: 20, fontWeight: '400', color:'#91BDD8', marginRight: 10, padding: 5}}>Jogar</Text>
                </TouchableOpacity>
                 
              </View>
            </TouchableOpacity>
          </TouchableOpacity>

      </Modal>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
  }

})

