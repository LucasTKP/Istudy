import React, { useContext, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, Modal} from 'react-native';
import { UserContext } from '../../App';
import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading'
import BoxAlert from '../components/BoxAlert'
import Cake from '../../assets/ImagePages/cake.svg'
import pen from '../../assets/ImageNavBar/pen.svg'
import { Feather } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';



export function CreateNewDeck({ navigation }) {
  //Variavel global
  const {setAlert, dataUser} = useContext(UserContext)
  //Variavei com informação dos flashCards
  const [title, setTitle] = useState("")
  //Infos da categoria
  const [nameCategory, setNameCategory] = useState("")
  const [idCategory, setIdCategory] = useState("")
  //Variavel Loading
  const [visible, setVisible] = useState(false)
  //Variavel Informação do axios
  const {callAxios, answerAxios} = useAxios()
  const [message, setMessage] = useState("")
  const [historia, setHistoria] = useState(false)
  const [geografia, setGeografia] = useState(false)
  const [matematica, setMatematica] = useState(false)
  const [portugues, setPortugues] = useState(false)
  const [ciencias, setCiencias] = useState(false)
  const [ingles, setIngles] = useState(false)
  const [imageDeck, setImageDeck] = useState('https://images-ext-1.discordapp.net/external/mQ4fekOE77byAKCyCeTlRa1JdV4tvSw63e_-bC8_89w/%3Falt%3Dmedia%26token%3Dca6095d8-121f-42b6-beaf-72a57369f9b4/https/firebasestorage.googleapis.com/v0/b/istudy-f79b7.appspot.com/o/cards%252FGroup%2520%281%29.png')
  const [modalImage, setModalImage] = useState(false)

  async function CreateDeck(){
    if (Validate()){
      const data = {
        id_user: dataUser.id,
        id_category: idCategory,
        title: title,
        image: imageDeck,
      } 
      try{
        setVisible(true)
        await callAxios ("cards", data, "post") 
      }catch(e){
        console.log(e)
      }finally{
        setVisible(false)
      }
    } else {
      setAlert(true)
      setMessage("Preencha todos os campos para criar o flashcard")
    }
  }

  function Validate(){
    if(title != "" && idCategory != ""){
      return true
    }
    return false
  }

  useEffect(() => {
    if(answerAxios.status === 200){
      navigation.navigate('InsertFlashCard', {id: answerAxios.createCard.id})
    }
  },[answerAxios])

  useEffect(() => {
    if(nameCategory != ""){
      setHistoria(false)
      setMatematica(false)
      setGeografia(false)
      setPortugues(false)
      setCiencias(false)
      setIngles(false)
      SelectCategory()
    }
  },[nameCategory])


  function SelectCategory(){
    if(nameCategory === 'Historia'){
      setHistoria(true)
    } if(nameCategory === 'Matematica'){
      setMatematica(true)
    } else if(nameCategory === 'Geografia'){
      setGeografia(true)
    }else if(nameCategory === 'Ciencias'){
      setCiencias(true)
    }else if(nameCategory === 'Portugues'){
      setPortugues(true)
    }else if(nameCategory === 'Ingles'){
      setIngles(true)
    }
  }

  useEffect(()=>{
    if(imageDeck != 'https://istudy.sfo3.cdn.digitaloceanspaces.com/Cards/Group%2053.png'){
      setModalImage(!modalImage)
    }
    },[imageDeck])


  return (
    <ScrollView contentContainerStyle={{paddingBottom: 50, backgroundColor: '#005483'}} >
    <View style={{backgroundColor:'#005483', height:'100%', width:'100%', alignItems: 'center'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalImage}
        onRequestClose={() => {
          setModalImage(!modalImage);
        }}
      >
        <ScrollView>
          <TouchableOpacity onPress={() => setModalImage(!modalImage)} style={styles.PageTradeAvatar}>
        
            <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 20, marginBottom: 20, textAlign: 'center', color: 'white' }}>Selecione A Imagem do seu Deck</Text>

            <TouchableOpacity style={styles.NewImage} onPress={() => setImageDeck('https://images-ext-1.discordapp.net/external/mQ4fekOE77byAKCyCeTlRa1JdV4tvSw63e_-bC8_89w/%3Falt%3Dmedia%26token%3Dca6095d8-121f-42b6-beaf-72a57369f9b4/https/firebasestorage.googleapis.com/v0/b/istudy-f79b7.appspot.com/o/cards%252FGroup%2520%281%29.png')}>
              <Image style={{width: 295, height:118}} source={{uri: 'https://images-ext-1.discordapp.net/external/mQ4fekOE77byAKCyCeTlRa1JdV4tvSw63e_-bC8_89w/%3Falt%3Dmedia%26token%3Dca6095d8-121f-42b6-beaf-72a57369f9b4/https/firebasestorage.googleapis.com/v0/b/istudy-f79b7.appspot.com/o/cards%252FGroup%2520%281%29.png'}} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.NewImage} onPress={() => setImageDeck('https://images-ext-1.discordapp.net/external/-t1Y7c1sUOJhrJ1bOR1Li7n8Y_k36e4ALx2gkTDWy0E/%3Falt%3Dmedia%26token%3D8f056608-373c-418e-8349-55805b2ead79/https/firebasestorage.googleapis.com/v0/b/istudy-f79b7.appspot.com/o/cards%252FGroup%2520%282%29.png')}>
              <Image style={{width: 295, height:118}} source={{uri: 'https://images-ext-1.discordapp.net/external/-t1Y7c1sUOJhrJ1bOR1Li7n8Y_k36e4ALx2gkTDWy0E/%3Falt%3Dmedia%26token%3D8f056608-373c-418e-8349-55805b2ead79/https/firebasestorage.googleapis.com/v0/b/istudy-f79b7.appspot.com/o/cards%252FGroup%2520%282%29.png'}} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.NewImage} onPress={() => setImageDeck('https://images-ext-2.discordapp.net/external/8pu7Kj-zkajKItaorhy9JF0AOExrDj6NpSNhFh_I1IM/%3Falt%3Dmedia%26token%3Dcea5df49-5a39-41c7-92f4-e28537c62ddc/https/firebasestorage.googleapis.com/v0/b/istudy-f79b7.appspot.com/o/cards%252FGroup%2520%283%29.png')}>
              <Image style={{width: 295, height:118}} source={{uri: 'https://images-ext-2.discordapp.net/external/8pu7Kj-zkajKItaorhy9JF0AOExrDj6NpSNhFh_I1IM/%3Falt%3Dmedia%26token%3Dcea5df49-5a39-41c7-92f4-e28537c62ddc/https/firebasestorage.googleapis.com/v0/b/istudy-f79b7.appspot.com/o/cards%252FGroup%2520%283%29.png'}} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.NewImage} onPress={() => setImageDeck('https://images-ext-2.discordapp.net/external/NwP1VpZWD6gfatqF6LQZxNy3pFrnvSEpPlU-9xP6Lzg/%3Falt%3Dmedia%26token%3D11fd4d13-7cb2-4ab0-8df2-43165d6b157a/https/firebasestorage.googleapis.com/v0/b/istudy-f79b7.appspot.com/o/cards%252FGroup%2520%284%29.png')}>
              <Image style={{width: 295, height:118}} source={{uri: 'https://images-ext-2.discordapp.net/external/NwP1VpZWD6gfatqF6LQZxNy3pFrnvSEpPlU-9xP6Lzg/%3Falt%3Dmedia%26token%3D11fd4d13-7cb2-4ab0-8df2-43165d6b157a/https/firebasestorage.googleapis.com/v0/b/istudy-f79b7.appspot.com/o/cards%252FGroup%2520%284%29.png'}} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.NewImage} onPress={() => setImageDeck('https://images-ext-2.discordapp.net/external/hk-6A74-wR6y7Jc9Ai7ZbH8JDTHzU23SSQ5yxE1AHFo/%3Falt%3Dmedia%26token%3D406e139e-4f8a-48b1-83c7-f14b18208959/https/firebasestorage.googleapis.com/v0/b/istudy-f79b7.appspot.com/o/cards%252FGroup%2520%285%29.png')}>
              <Image style={{width: 295, height:118}} source={{uri: 'https://images-ext-2.discordapp.net/external/hk-6A74-wR6y7Jc9Ai7ZbH8JDTHzU23SSQ5yxE1AHFo/%3Falt%3Dmedia%26token%3D406e139e-4f8a-48b1-83c7-f14b18208959/https/firebasestorage.googleapis.com/v0/b/istudy-f79b7.appspot.com/o/cards%252FGroup%2520%285%29.png'}} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.NewImage} onPress={() => setImageDeck('https://images-ext-1.discordapp.net/external/sSGbYf1ya2H895v9aETiaRdHSUSHjdNuvY7B9xabiZU/%3Falt%3Dmedia%26token%3D44957bd3-78fd-492b-9698-7a9ad4b9fb04/https/firebasestorage.googleapis.com/v0/b/istudy-f79b7.appspot.com/o/cards%252FGroup%2520%286%29.png')}>
              <Image style={{width: 295, height:118}} source={{uri: 'https://images-ext-1.discordapp.net/external/sSGbYf1ya2H895v9aETiaRdHSUSHjdNuvY7B9xabiZU/%3Falt%3Dmedia%26token%3D44957bd3-78fd-492b-9698-7a9ad4b9fb04/https/firebasestorage.googleapis.com/v0/b/istudy-f79b7.appspot.com/o/cards%252FGroup%2520%286%29.png'}} />
            </TouchableOpacity>
        
          </TouchableOpacity>
        </ScrollView>
      </Modal>


      <Loading visible={visible}/>
      <BoxAlert message={message} type={'erro'}/>
      <View style={{flexDirection:'row'}}>
        <View style={{justifyContent: 'space-between', width:'50%'}}>
          <Text style={{fontSize: 30, color: 'white'}}>Criar</Text>
          <Text style={{width: 149, fontSize: 13, color:'#91BDD8'}}>Crie os seus próprios Flashcards para estudar como nunca antes!</Text>
        </View>
        <Cake />
      </View>
      <View style={{marginTop: 50}}>
        <Image style={{width: 295, height:118}}source={{uri: imageDeck}}></Image>
        <View style={{alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: 10, marginTop: -10}}>
          <View style={styles.TradeImage}>
            <Feather name="edit-3" size={30} color="black" onPress={() => setModalImage(!modalImage)} />
          </View>
        </View>

        <View style={styles.InfoDecks}>

          <View style={{borderBottomWidth: 2 , borderColor: '#005483', border: 'solid', width: 240, marginBottom: 10}}>
            <Text style={{fontSize: 18, color: '#004973'}}>Título: </Text>
            <TextInput onChangeText={(Text) => setTitle(Text)}></TextInput>
          </View> 

          <Text style={{fontSize: 18, color: '#004973', fontWeight: '500' }}> Materia:</Text>

          <View style={styles.DivFilterOut}>
            <TouchableOpacity style={  historia ? styles.DivSelectFilter : styles.DivFilter } onPress={() => (setNameCategory('Historia'),  setIdCategory(1))} >
              <Text style={styles.TextFilter}> ️⌛  Historia</Text>
            </TouchableOpacity>

            <TouchableOpacity style={  matematica ? styles.DivSelectFilter : styles.DivFilter } onPress={() => (setNameCategory('Matematica'),  setIdCategory(3))}>
              <Text style={styles.TextFilter}> 📐 Matematica</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.DivFilterOut}>

            <TouchableOpacity style={  portugues ? styles.DivSelectFilter : styles.DivFilter } onPress={() => (setNameCategory('Portugues'),  setIdCategory(4))}>
              <Text style={styles.TextFilter}> 📚 Português</Text>
            </TouchableOpacity>

            <TouchableOpacity style={  ingles ? styles.DivSelectFilter : styles.DivFilter } onPress={() => (setNameCategory('Ingles'),  setIdCategory(9))}>
              <Text style={styles.TextFilter}> ⚡ Inglês </Text>
            </TouchableOpacity>

          </View>

          <View style={styles.DivFilterOut}>

            <TouchableOpacity style={  geografia ? styles.DivSelectFilter : styles.DivFilter } onPress={() => (setNameCategory('Geografia'),  setIdCategory(2))}>
              <Text style={styles.TextFilter}> 🗺️ Geografia</Text>
            </TouchableOpacity>

            <TouchableOpacity style={  ciencias ? styles.DivSelectFilter : styles.DivFilter } onPress={() => (setNameCategory('Ciencias'),  setIdCategory(5))}>
              <Text style={styles.TextFilter}> 🍃 Ciências</Text>
            </TouchableOpacity>

          </View>

        </View> 
        <View style={{alignItems: 'center', marginTop: 50}}>
          <TouchableOpacity style={styles.ButtonCreate} onPress={() => CreateDeck()}>
            <Image source={pen} style={{tintColor: '#7BACC9'}}></Image>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#7BACC9'}}> Criar </Text>
          </TouchableOpacity> 
        </View>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  TradeImage: {
    width: 45, 
    height: 45, 
    backgroundColor: '#7BACC9', 
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'absolute',
    borderRadius: 100,
    marginRight: 100,
    marginBottom: 10,
  }, 
  InfoDecks: {
    width: 295, 
    height: 230, 
    backgroundColor: '#7BACC9', 
    marginTop: 20, 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  DivSelectFilter: { 
    height: 29, 
    borderWidth: 2, 
    borderColor: '#004973', 
    borderRadius: 50, 
    justifyContent: 'center',
    margintLeft: 10,
    marginRight: 10,
    backgroundColor: '#23709D'
  }, 
  DivFilter: { 
    height: 29, 
    borderWidth: 2, 
    borderColor: '#004973', 
    borderRadius: 50, 
    justifyContent: 'center',
    margintLeft: 10,
    marginRight: 10,
  }, 
  TextFilter: {
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center', 
    fontSize: 14, 
    fontWeight: 'bold',
    color: '#004973'
  }, 
  DivFilterOut: {
  flexDirection: 'row',  
  justifyContent: 'space-between',
  marginTop: 10,
  }, 
  ButtonCreate: {
    borderWidth: 3, 
    borderColor:'#91BDD8', 
    width: 141, 
    height: 53, 
    borderRadius: 8, 
    backgroundColor: '#005483', 
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'row'
  },
  PageTradeAvatar: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.80)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Modal de icones
  BackgroundIcon:{
    backgroundColor: '#005483', 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center'  
  }, 
  NewImage: {
    marginTop: 10,
    marginBottom: 20,
  }
});
