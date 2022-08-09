import React, {useState, useEffect } from 'react';
import Button from '../components/Button'
import styled from 'styled-components/native'
import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading'
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native';
import  eye  from '../../assets/eye.png'
import  IconCorrect  from '../../assets/correct.png'
import  IconIncorrect  from '../../assets/incorrect.png'
import * as Animatable from 'react-native-animatable'
import { reloadAsync } from 'expo-updates';





export function ShowFlashCard({ navigation, route }) {
  //Variavel Informação do axios
  const {callAxios, answerAxios} = useAxios()
  //Variaveis de informação do flashCard
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [title, setTitle] = useState("")
  const [materia, setMateria] = useState("")  
  //Variavel com a resposta do axios
  const [dataFlash, setDataFlash] = useState("")
  //Variavel para contar as paginas que ja foram exibidas
  const [numberFlash, setNumberFlash] = useState(50)
  const [answerIncorrect, setAnswerIncorrect] = useState(0)
  //Variavel Loading
  const [visible, setVisible] = useState(false)
  const [showAnsewer, setShowAnsewer] = useState(false)
  //Executa a função de puxar os flahs apenas uma vez após abrir o app
  const [totalPage, setTotalPage] = useState(0)
  const [timeStart, setTimeStart] = useState(0)
  const [porcentageComplete, setPorcentageComplete] = useState(0)

  useEffect(() => {
    return navigation.addListener("focus", () => {
      showQuestionCard()
    });
}, [navigation]);

  //Seta a resposta do axios na variavel dataFlash
  useEffect(()=>{ 
    if(answerAxios.res){
    setMateria(answerAxios.res.category[0].name)
    setDataFlash(answerAxios.res.card_Answer)
    setTitle(answerAxios.res.title)
    setTotalPage(answerAxios.res.card_Answer.length)
    setTimeStart((new Date()))
    }
  },[answerAxios])
 
  //Executa a função de exibir o flash card após chegar as informaçoes dos flashcards
  useEffect(()=>{
  if(dataFlash[0]){
  setNumberFlash(0)
  }
  },[dataFlash])

  //Executa a função de exibir o flash card após chegar as informaçoes dos flashcards
  useEffect(()=>{
    if(numberFlash != 50){
      setFlashCard()
    }
    },[numberFlash])
  //Faz a logica para passar de pagina ou exibir a resposta  
   function setFlashCard(){
    
    setPorcentageComplete(numberFlash * (100 / dataFlash.length ))
    if(numberFlash < dataFlash.length) {
      if(numberFlash >= 0){
        setQuestion(dataFlash[numberFlash].question)
        setAnswer(dataFlash[numberFlash].answer)
      } else {
        navigation.navigate('Home')
      }
    } else{
      const endTime = new Date()
      const differenceTime = new Date( endTime - timeStart )
      const Statistics = {
        erros: answerIncorrect,
        acertos: dataFlash.length - answerIncorrect, 
        tempo: differenceTime.getMinutes() + ':' +  differenceTime.getSeconds(),
        idDeck: route.params
      }
      navigation.navigate('EndFlashCard', Statistics)
    }
  }
  //Axios puxando os flashCads no banco de dados
  async function showQuestionCard(){
    const data = {
    } 
    try{
      setVisible(true)
      await callAxios ("cards/one/" + route.params, data, "get")
    }catch(e){
      console.log(e)
    }finally{
      setVisible(false)
    }
  }
  return (
    <View style={styles.Container}>
      <Loading visible={visible}/>
      <View style={{width:'70%'}} >
        <Text style={styles.Title}>{title}</Text>
        <View style={styles.Incomplete}>
          <View style={{ width: porcentageComplete + '%', height:5, backgroundColor:'#91BDD8', borderRadius: 8}}/>
        </View>
        <Text style={styles.Fracao}>{numberFlash + 1}/{totalPage}</Text>
        <View style={{height: 400}}>
          <View style={styles.Question}>
              <View style={{width: '90%'}}>
                  <Text style={{fontSize: 16, fontWeight: '400', color: '#fff'}}>{question}</Text>
              </View>
          </View>
          {showAnsewer ? 
          <Animatable.View  delay={100} animation={'fadeInDown'} style={{width:291, height: 190, backgroundColor: '#7BACC9', marginTop:-50 , borderRadius: 30, alignItems: 'center', zIndex: -1, justifyContent: 'center'}}>
              <View style={{width: '90%', }}>
                  <Text style={{fontSize: 16, fontWeight: '800', color: '#fff'}}>{answer}</Text>
              </View>
          </Animatable.View>
          :
          <View style={{width:291, height: 190, backgroundColor: '#7BACC9', marginTop: showAnsewer ? -50 : -168, borderRadius: 30, alignItems: 'center', zIndex: -1, justifyContent: 'center'}}>
              <View style={{width: '90%', }}>
                  <Text style={{fontSize: 16, fontWeight: '800', color: '#fff'}}>{answer}</Text>
              </View>
          </View>
          }

        </View>  
        {showAnsewer ?
        <View style={styles.Feedback}>
          <TouchableOpacity onPress={() => (setShowAnsewer(!showAnsewer), setNumberFlash(numberFlash + 1), setAnswerIncorrect(answerIncorrect + 1))} style={styles.ButtonIncorrect}>
            <Image source={IconIncorrect}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => (setShowAnsewer(!showAnsewer), setNumberFlash(numberFlash + 1))} style={styles.ButtonCorrect}>
            <Image source={IconCorrect}></Image>
          </TouchableOpacity>
        </View> 
        :
        <TouchableOpacity onPress={() => setShowAnsewer(!showAnsewer)} style={styles.ButtonEye}>
          <Image source={eye}></Image>
        </TouchableOpacity>
        }
      </View>  
    </View>
  );
}

const styles = StyleSheet.create({
  Container: { 
    backgroundColor:'#005483', 
    width:'100%', 
    height:'100%', 
    alignItems: 'center',
  },
  Title: {
    color: '#fff', 
    fontSize: 30, 
    width:151, 
    fontWeight: '500'
  }, 
  Incomplete: {
    width:285,
    height:5, 
    backgroundColor: '#23709D',
    marginTop: 30, 
    borderRadius: 8,
  },
  Fracao: {
    alignSelf:'center', 
    color: '#91BDD8', 
    fontSize: 20, 
    fontWeight: '500',
  },
  Question: {
    width:291, 
    height: 168, 
    backgroundColor: '#23709D', 
    borderRadius: 30, 
    marginTop: 38, 
    alignItems: 'center',
  }, 
  Feedback: {
    width: 230, 
    height: 57, 
    backgroundColor: '#23709D', 
    alignSelf: 'center', 
    borderRadius: 20, 
    flexDirection: 'row', 
    borderWidth: 3, 
    borderColor: '#49B715'
  }, 
  ButtonIncorrect: {
    width: 124, 
    height: 57,
    marginLeft: -3, 
    borderWidth: 3, 
    marginTop: -3, 
    borderColor: '#940000', 
    borderRadius: 20, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  ButtonCorrect: {
    width: 100,
    height: 51, 
    borderRadius: 20, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  ButtonEye: {
    width: 102, 
    height: 66, 
    borderWidth: 3, 
    borderColor: '#23709D', 
    alignSelf: 'center', 
    borderRadius: 20, 
    alignItems: 'center', 
    justifyContent: 'center'
  }

})

