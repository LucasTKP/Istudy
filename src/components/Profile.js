import React, { useState, useContext, useEffect } from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput } from "react-native";
import { UserContext } from '../../App';
import { Ionicons, Feather } from '@expo/vector-icons'; 
import useStoreCache from '../hooks/useStoreCache';
import Loading from '../components/Loading'
import useAxios from '../hooks/useAxios'
import { useNavigation } from '@react-navigation/native';
import  BoxAlert  from '../components/BoxAlert'
import * as SecureStore from 'expo-secure-store';
import  Icon  from 'react-native-vector-icons/MaterialIcons'


export function Profile() {
  
  const {setProfile, dataUser, setDataUser, setAlert} = useContext(UserContext)
  const [name, setName] = useState(dataUser.name)
  const [visible, setVisible] = useState(false)
  const {callAxios, answerAxios} = useAxios()
  const navigation = useNavigation();
  const [avatarModal, setAvatarModal] = useState(false)
  const [urlAvatar, setUrlAvatar] = useState(dataUser.image)
  const [tradeName, setTradeName] = useState(false)
  const [message, setMessage] = useState("")
  const [newName, setNewName] = useState("")
  //Variavel Informação do StoreCache
  const {callStoreCache} = useStoreCache()


  const [exitAlert, setExitAlert] = useState(false)



   //executa o validar apos o nome ser trocado
   useEffect(()=>{
    Validar()
  },[name])

   //executa o validar apos o nome ser trocado
   useEffect(()=>{
    Validar()
  },[newName])

  //Troca a photo da pagina se vim uma nova url de foto
  useEffect(()=>{
    if (urlAvatar != dataUser.image){
      UpdateImage()
      setAvatarModal(false)
      
    }
  },[urlAvatar])

  //Verifica se o nome que esta sendo trocado esta correto de acordo com a regex
  function Validar(){
    const regexName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
    if ( name.length > 4 && regexName.test(name) && newName.length === 0){
        return true
      } 
    if ( newName.length > 4 && regexName.test(newName)){
        return true
    }  
      return false
  }
  //Armazena o avatar no banco de dados
  async function UpdateImage(){
    const data = {
      image: urlAvatar
    } 
    try{
      setVisible(true)
      await callAxios ("user/image/" + dataUser.id, data, "put") 
    } catch(e) {
      console.log(e)
    } finally {
      setVisible(false)
    }
  }
  //Armazena o avatar no cache
  async function UpdateImageCache(){
    dataUser.image = urlAvatar
    const newData = dataUser
    setDataUser(newData)
    try {
    callStoreCache(newData)
    } catch(e) {
    console.log(e)
    }  
  }

//Altera o nome no banco de dados e no app
 async  function AlterTableName(){
      Validar()
    if(newName === "" || newName === name) {

    } else {
      if (Validar() === true) {
          const data = {
            name: newName
          } 
          try{
            setVisible(true)
            await callAxios ("user/" + dataUser.id, data, "put") 
          } catch(e) {
            console.log(e)
          } finally {
            setVisible(false)
          }
      } else {
        setMessage("Não foi possivel alterar seu nome, utilize um nome com 5 letras e nenhum caracter especial")
        setAlert(true)
      }
    }  
  } 
//Altera o nome na variavel global
useEffect(()=>{
  if(answerAxios.type === 'userName'){
    if(answerAxios.status === 200){
      setName(newName)
      dataUser.name = newName
      const newData = dataUser
      setDataUser(newData)
      StorageCache(newData)
      setTradeName(false)
    } else {
      setName(dataUser.name)
      setAlert(true)
      setMessage(answerAxios.message) 
    }
  } else if(answerAxios.type === 'userImage'){
    if (answerAxios.status === 200){
      UpdateImageCache()
    }
  }
},[answerAxios])


//Altera o nome no cache
async function StorageCache(newData){   
  try {
    callStoreCache(newData)
  } catch(e) {
    console.log(e)
  }
} 

async function Exit(){
  await SecureStore.deleteItemAsync('User')
  setDataUser()
}
console.log(exitAlert)
  return (
    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.51)', height: '100%'}}>
          <Loading visible={visible} />
          <BoxAlert message={message} type={'erro'}/>
        <View style={styles.Modal}>
          <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', width: '90%', marginTop: '10%'}}>
            <Ionicons name="exit-outline" size={30} color="white" onPress={() => setExitAlert(!exitAlert)} />
            <Image style={styles.ImageProfile} source={{uri: urlAvatar}}></Image>
            <Feather name="save" size={30} color="white" onPress={() => AlterTableName()} />
          </View>

          <View style={styles.EditPhoto}>
            <Feather name="edit-3" size={24} color="black" onPress={() => (setAvatarModal(!avatarModal)) }/>
          </View>
          
          <View style={{marginTop: 10}}>
            <Text style={{color:'#91BDD8', fontSize: 20, textAlign: "left"}}>Nome</Text>
            {tradeName ?
            <View style={{flexDirection: 'row'}}>
              <View style={{borderWidth: 2, borderColor: '#F9B84F', alignItems: 'center', borderRadius: 10, width: 150}}>
                <TextInput style={{ width: '90%', fontSize: 16}} onChangeText={(Text) => setNewName(Text)} placeholder="Digite o Nome"></TextInput>
              </View>
              <TouchableOpacity style={styles.AlterCancel} onPress={() => (setTradeName(false)) }>
                 <Text style={{fontSize: 20, color:'#972F2F', fontWeight: 'bold'}}> X </Text>
              </TouchableOpacity>           
            </View>
            : <View style={{flexDirection: 'row'}}>
                <Text style={{color:'white', fontSize: 20, textAlign: "left"}}>{name}</Text>
                <TouchableOpacity style={styles.AlterName} onPress={() => setTradeName(true)}>
                  <Text style={{fontSize: 20, color:'#23709D'}}> Editar </Text>
                </TouchableOpacity>
              </View> } 

            <Text style={{color: '#91BDD8', fontSize: 20, marginTop: 37, paddingBottom: 20}}> Estatisticas: </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> 
              <View style={styles.Statistics}>
                <Text style={{color:'#004973', fontSize: 32, fontWeight: 'bold'}}>0</Text>
                <Text style={{color:'#fff', fontSize: 16, fontWeight: 'bold'}}>Vítorias</Text>
              </View> 

              <View style={{width: 3, height: 30, backgroundColor: '#fff', marginTop: 10}} />

              <View style={styles.Statistics}>
                <Text style={{color:'#004973', fontSize: 32, fontWeight: 'bold'}}>0</Text>
                <Text style={{color:'#fff', fontSize: 16, fontWeight: 'bold'}}>Derrotas</Text>
              </View>

              <View style={{width: 3, height: 30, backgroundColor: '#fff', marginTop: 10}} />

              <View style={styles.Statistics}>
                <Text style={{color:'#004973', fontSize: 32, fontWeight: 'bold'}}>0</Text>
                <Text style={{color:'#fff', fontSize: 16, fontWeight: 'bold'}}>Jogadas</Text>
              </View>
            </View>

            <View style={{alignItems: 'center', justifyContent: 'center'}}> 
              <TouchableOpacity style={styles.Achievement} onPress={() => navigation.navigate('AllConquest')}>
                <Text style={{color: '#23709D', fontSize: 20, fontWeight: 'bold'  }}>Conquistas</Text>
              </TouchableOpacity>
            </View>

          </View> 
        </View>

        <TouchableOpacity style={{flex:1}} onPress={() =>  setProfile(false)}>

        </TouchableOpacity>

              {/* Pagina de Trocar o avatar de perfil */}
      <Modal
          animationType="slide"
          transparent={true}
          visible={avatarModal}
          onRequestClose={() => {
          setAvatarModal(!avatarModal);
          }}>
          <TouchableOpacity onPress={() => setAvatarModal(!avatarModal)} style={styles.PageTradeAvatar}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 20, textAlign: 'center', color: 'white' }}>Selecione O Avatar</Text>
              <View style={{width: 347, height: 150, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.BackgroundIcon}>
                  <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar7-removebg-preview.png')}>
                    <Image style={{width:100, height:100}} source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar7-removebg-preview.png'}} />
                  </TouchableOpacity>
                </View>

                <View style={styles.BackgroundIcon}>
                  <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar8-removebg-preview.png')}>
                    <Image style={{width:100, height:100}} source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar8-removebg-preview.png'}} />
                  </TouchableOpacity>
                </View>

                <View style={styles.BackgroundIcon}>
                  <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar9-removebg-preview.png')}>
                    <Image style={{width:100, height:100}} source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar9-removebg-preview.png'}} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{width: 347, height: 150, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.BackgroundIcon}>
                  <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar2-removebg-preview.png')}>
                    <Image style={{width:100, height:100}} source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar2-removebg-preview.png'}} />
                  </TouchableOpacity>
                </View>

                <View style={styles.BackgroundIcon}>
                  <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar6-removebg-preview.png')}>
                    <Image style={{width:100, height:100}} source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar6-removebg-preview.png'}} />
                  </TouchableOpacity>
                </View>

                <View style={styles.BackgroundIcon}>
                  <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar5-removebg-preview.png')}>
                    <Image style={{width:100, height:100}} source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar5-removebg-preview.png'}} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{width: 347, height: 150, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.BackgroundIcon}>
                  <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar1-removebg-preview.png')}>
                    <Image style={{width:100, height:100}} source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar1-removebg-preview.png'}} />
                  </TouchableOpacity>
                </View>

                <View style={styles.BackgroundIcon}>
                  <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar4-removebg-preview.png')}>
                    <Image style={{width:100, height:100}} source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar4-removebg-preview.png'}} />
                  </TouchableOpacity>
                </View>

                <View style={styles.BackgroundIcon}>
                  <TouchableOpacity onPress={() => setUrlAvatar('https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar10-removebg-preview.png')}>
                    <Image style={{width:100, height:100}} source={{uri: 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Avatares/Avatar10-removebg-preview.png'}} />
                  </TouchableOpacity>
                </View>
              </View>
          </TouchableOpacity>
        </Modal>



      {/* Modal de Confirmação de saida */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={exitAlert}
        onRequestClose={() => {
          setExitAlert(!exitAlert);
        }}>

        <TouchableOpacity style={styles.buttonSair} onPress={() => setExitAlert(!exitAlert)}>
          <View style={styles.box}>
              <Icon style={{marginTop:10,  marginRight: 5, color: 'white'}} name='warning' size= {50}/>
              <Text style={styles.textWarning}>Tem certeza que deseja sair de sua conta?</Text>
              <TouchableOpacity style={styles.buttonOk} onPress={() => setExitAlert(!exitAlert)}>
              <Text onPress={() => Exit()} style={styles.textButtonSair}>Sair</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>       

    </View>  
  )
}
const styles = StyleSheet.create({
  Modal: {
    backgroundColor: "#23709D",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    height: "80%",
  },
  ImageProfile: {
  width: 192,
  height: 192,
  borderRadius: 100,
  }, 
  EditPhoto: {
    backgroundColor: 'rgba(0, 73, 115, 0.78)', 
    borderRadius: 100, 
    width: 50, 
    height: 50, 
    marginTop: -40, 
    marginLeft: 85,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  AlterName: {
    width: 91,
    height: 32,
    backgroundColor: '#91BDD8',
    borderRadius: 8,
    marginLeft: 77,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  AlterCancel: {
    width: 32,
    height: 32,
    backgroundColor: '#91BDD8',
    borderRadius: 8,
    marginLeft: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#972F2F',
  },
  Statistics: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  Achievement: {
    width: 184,
    height: 46,
    backgroundColor: '#91BDD8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 2,
    borderColor: '#F9B84F',
  },


  //Modal de trocar os icones
  PageTradeAvatar: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.80)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Modal de icones
  BackgroundIcon:{
    width: 110, 
    height: 110, 
    backgroundColor: '#005483', 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center'  
  }, 
  InputTradeName: {
  },



//Modal de Confirmação de saida
  buttonSair:{
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.80)',
  },
  box:{
    width:300,
    height:308,
    backgroundColor: '#004973',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2, 
    borderColor: '#FFF',
    borderRadius: 8,
  },
  textWarning:{
    width: 227,
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
  },
  buttonSair:{
    width:91,
    height:32,
    borderRadius: 8,
    backgroundColor: '#91BDD8',
    alignItems: 'center',
    marginTop: 30,
  },
  textButtonOk:{
    color: 'black',
    fontSize: 20,
  },

});