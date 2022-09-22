import React, {useEffect, useState, useContext} from 'react'
import { Text, View, StyleSheet, ScrollView} from 'react-native';
import  TipHalf from '../../assets/ImageIcons/tipHalf.svg'
import  TipCarts  from '../../assets/ImageIcons/tipCarts.svg'
import useAxios from '../hooks/useAxios';
import { UserContext } from '../../App';
import io from "socket.io-client/dist/socket.io";

export function GameQuestion({route ,navigation}) {
  const {dataUser} = useContext(UserContext)
  const {callAxios, answerAxios} = useAxios()
  const [answered, setAnswered] = useState({letter: '', already: false, correct: false})
  const [question, setQuestion] = useState(0)
  const {roomId, flashId} = route.params
  const [already, setAlready] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const [corrects, setCorrects] = useState(0)
  const [wrongs, setWrongs] = useState(0)
  const [socket, setSocket] = useState('')
  const [result, setResult] = useState([])

  useEffect(() => {
    console.log(result)
    if (result[1]) {
      navigation.navigate('GameResult', {result, total: answerAxios.res[0].questions.length})
    }
  }, [result])

  useEffect(() => {
    setSocket(io("https://istudy-online.fly.dev", {
      transports: ["websocket"]
    }))
    async function questions() {
      await callAxios('cards/questions/' + flashId, '', 'get')
    }
    questions()
  }, [])

  function finishGame() {
    socket.emit('finish_game', {room_id: roomId, results: {name: dataUser.name , correct: corrects, wrong: wrongs, image: dataUser.image}})
    socket.on('resEnd', (res) => setResult(prev => [...prev, res])).on('disconnect')
  }

  function answer(letter) {
    if(answerAxios.res[0].questions[question].correct_letter == letter) {
     setAnswered({letter: letter, already: true, correct: true})
     setAlready(true)
     setCorrects(corrects + 1)
    } else {
      setAnswered({letter: letter, already: true, correct: false})
      setAlready(true)
      setWrongs(wrongs + 1)
    }
    socket.emit('answer_game', {room_id: roomId})

    socket.on('resAnswer', (msg) => {
      if(msg.ready) {
        setAnswered({letter: '', already: false, correct: false})
        setAlready(false)
        setWaiting(false)
        if(question + 1 < answerAxios.res[0].questions.length) {
          setQuestion(question + 1)
        } else {
          finishGame()
        }
      } else {
        setWaiting(true)
      }
    })
  }

  return (
    <View style={{flex:1, backgroundColor: '#005483'}}>
      {answerAxios.res && answerAxios.res[0] ?
        <ScrollView contentContainerStyle={{width: '100%', alignItems: 'center'}}>
          <View style={styles.header}>
            <Text onPress={() => navigation.navigate('GameAnswer')} style={{color: '#fff', fontSize: 20, fontWeight: '500', marginTop: 25}}>0:30</Text>
            <View style={{width: '94%', height: 3, backgroundColor: 'rgba(193, 193, 193, 1)'}}>
              <View style={{width: '50%', height: '100%', backgroundColor: '#fff'}}></View>
            </View>
          </View>

       <View style={{width: '80%', alignItems: 'center'}}>
        {waiting ? <Text style={{fontSize: 20, color: 'white'}}>Aguardando o outro jogador...</Text> : <Text></Text>}
        <Text style={styles.initialText}> {question + 1 + '/' + answerAxios.res[0].questions.length} </Text>

        <View style={styles.textArea}>
          <ScrollView nestedScrollEnabled contentContainerStyle={{width: '100%'}}>
          <Text  multiline={true} style={{fontSize: 16, fontWeight: '500', margin:20}}>{answerAxios.res[0].questions[question].text}</Text>
          </ScrollView>
        </View>

        <View style={{width: '80%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
          <TipCarts />
          <TipHalf />
        </View>
      
          <View style={styles.answerArea}>
            <View style={styles.configAnswer}>
              <View style={styles.divLetterAnswer}><Text style={styles.letterAnswer}>A</Text></View>
              <View style={{
                width: 230, 
                height: 40, 
                backgroundColor:  'rgba(158, 222, 254, 1)', 
                borderRadius: 8, 
                alignItems:'center', 
                justifyContent: 'center', 
                color: 'rgba(35, 112, 157, 1)',
                borderWidth: 3,
                borderColor: answered.already && answered.letter == 'A' && answered.correct ? '#35A700' : answered.correct == false && answered.letter == 'A' && answered.already? '#C53D34' :'#007FC7'
              }} onTouchStart={() => {
                if(already == false) {
                  answer('A')
                }
              }}><Text style={styles.answer}>{answerAxios.res[0].questions[question].letter_a}</Text></View>
            </View>

            <View style={styles.configAnswer}>
              <View style={styles.divLetterAnswer}><Text style={styles.letterAnswer}>B</Text></View>
              <View style={{
                width: 230, 
                height: 40, 
                backgroundColor: 'rgba(158, 222, 254, 1)', 
                borderRadius: 8, 
                alignItems:'center', 
                justifyContent: 'center', 
                color: 'rgba(35, 112, 157, 1)',
                borderWidth: 3,
                borderColor: answered.already && answered.letter == 'B' && answered.correct ? '#35A700' : answered.correct == false && answered.letter == 'B' && answered.already? '#C53D34' :'#007FC7'
              }} onTouchStart={() => {
                if(already == false) {
                  answer('B')
                }
              }}><Text style={styles.answer}>{answerAxios.res[0].questions[question].letter_b}</Text></View>
            </View>

            <View style={styles.configAnswer}>
              <View style={styles.divLetterAnswer}><Text style={styles.letterAnswer}>C</Text></View>
              <View style={{
                width: 230, 
                height: 40, 
                backgroundColor: 'rgba(158, 222, 254, 1)', 
                borderRadius: 8, 
                alignItems:'center', 
                justifyContent: 'center', 
                color: 'rgba(35, 112, 157, 1)',
                borderWidth: 3,
                borderColor: answered.already && answered.letter == 'C' && answered.correct ? '#35A700' : answered.correct == false && answered.letter == 'C' && answered.already? '#C53D34' :'#007FC7'
              }} onTouchStart={() => {
                if(already == false) {
                  answer('C')
                }
              }}><Text style={styles.answer}>{answerAxios.res[0].questions[question].letter_c}</Text></View>
            </View>

            <View style={styles.configAnswer}>
              <View style={styles.divLetterAnswer}><Text style={styles.letterAnswer}>D</Text></View>
              <View style={{
                width: 230, 
                height: 40, 
                backgroundColor: 'rgba(158, 222, 254, 1)', 
                borderRadius: 8, 
                alignItems:'center', 
                justifyContent: 'center', 
                color: 'rgba(35, 112, 157, 1)',
                borderWidth: 3,
                borderColor: answered.already && answered.letter == 'D' && answered.correct ? '#35A700' : answered.correct == false && answered.letter == 'D' && answered.already? '#C53D34' :'#007FC7'
              }} onTouchStart={() => {
                if(already == false) {
                  answer('D')
                }
              }}><Text style={styles.answer}>{answerAxios.res[0].questions[question].letter_d}</Text></View>
            </View>
          </View>
        </View> 
      </ScrollView>
      : <Text></Text>}
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

  initialText:{
    color: '#fff', 
    fontSize: 20, 
    fontWeight: '500', 
    marginTop: 16
  },
  textArea:{
    width: '100%', 
    height: 250, 
    backgroundColor:'#fff', 
    borderRadius: 10, 
    borderWidth: 3, 
    borderColor: 'rgba(0, 0, 0, 1)', 
    justifyContent: 'center', 
    alignItems:'center', 
    marginTop: 16
  },
  answerArea: {
    width: '100%', 
    height: 242, 
    borderRadius: 8, 
    backgroundColor: 'rgba(145, 189, 216, 0.18)', 
    marginTop: 15, 
    justifyContent: 'center', 
    alignItems:'center', 
    marginBottom: 30
  },
  configAnswer: {
    width: '90%', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    margin: 5
  },
  divLetterAnswer: {
    width: 42, 
    height: 42, 
    backgroundColor: 'rgba(158, 222, 254, 1)', 
    borderRadius: 100, 
    alignItems:'center', 
    justifyContent: 'center', 
    color: 'rgba(35, 112, 157, 1)',
    borderWidth: 3,
    borderColor: '#007FC7'
  }, 
  letterAnswer: {
    fontSize: 20, 
    fontWeight: '800'
  },
  answer: {
    fontSize: 14, 
    fontWeight: '800'
  }
})