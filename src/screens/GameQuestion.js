import React, {useEffect, useState, useContext} from 'react'
import { Text, View, StyleSheet, ScrollView, Modal, TouchableOpacity, Alert} from 'react-native';
import  TipHalf from '../../assets/ImageIcons/tipHalf.svg'
import  TipCarts  from '../../assets/ImageIcons/tipCarts.svg'
import  A  from '../../assets/ImageIcons/Group-1.svg'
import  Two  from '../../assets/ImageIcons/Group-3.svg'
import  Three  from '../../assets/ImageIcons/Group-2.svg'
import  Back  from '../../assets/ImageIcons/Group.svg'
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
  const [resetCount, setResetCount] = useState(false)
  const [result, setResult] = useState([])
  const [count, setCount] = useState(50)
  const [afk, setAfk] = useState(0)
  const [clicked1, setClicked1] = useState(false)
  const [clicked2, setClicked2] = useState(false)
  const [wrongQuestions, setWrongsQuestions] = useState([])
  const [alert, setAlert] = useState(false)
  const [cardSelected, setCardSelected] = useState()
  const [quantityWrongs, setQuantityWrongs] = useState(0)
  const [a, setA] = useState(false)
  
  const cards = [<Back width='50'/>, <A width='50'/>, <Two width='50'/>, <Three width='50'/>]

  useEffect(() => {
    if (result[1]) {
      navigation.navigate('GameResult', {result, total: answerAxios.res[0].questions.length})
    }
  }, [result])

  useEffect(() => {
    if(socket != '') {
      socket.emit('left_game', {room_id: 6931, afk: false})
      socket.on('resAfk', (msg) => {
        if(msg.afk && a == false) {
          navigation.navigate('Home')
        }
      })
    }
  }, [socket])

  useEffect(() => {
    setSocket(io("https://istudy-online.fly.dev", {
      transports: ["websocket"]
    }))

    async function questions() {
      await callAxios('cards/questions/' + flashId, '', 'get')
    }
    questions()
  }, [])

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        if(a == false) {
          Alert.alert(
            'Deixar partida?',
            'Deseja mesmo deixar a partida? (Se não clicou em nenhum botão para sair, possivelmente seu adversario está AFK)',
            [
              { text: "Não sair", style: 'cancel', onPress: () => {} },
              {
                text: 'Sair',
                style: 'destructive',
                onPress: () => {
                  setA(true)
                  socket.emit('finish_game', {room_id: roomId})
                  socket.on('disconnect')
                  socket.emit('left_game', {room_id: 6931, afk: true})
                  navigation.dispatch(e.data.action)
                },
              },
            ]
          )
        };
      }),
    [navigation, socket]
  );

  useEffect(() => {
    if(resetCount == false) {
      const interval = setInterval(() => {
        if(count == 0) {
          setAfk(afk + 1)
          endQuestion()
        } else {
          setCount(count - 1)
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [count])

  useEffect(() => {
    if(wrongQuestions.find((letter) => letter == answerAxios.res[0].questions[question].correct_letter)) {
      tips(2)
    } 
  }, [wrongQuestions])

  function tips(n) {
    const letters = ['A', 'B', 'C', 'D']
    setWrongsQuestions(letters
    .map(x => ({ x, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(a => a.x)
    .slice(0, quantityWrongs > 0 ? quantityWrongs : n))

    setTimeout(() => setAlert(false), 1000)
  }

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
    setResetCount(true)
    endQuestion()
  }

  function endQuestion() {
    socket.emit('answer_game', {room_id: roomId})

    socket.on('resAnswer', (msg) => {
      if(msg.ready) {
        setAnswered({letter: '', already: false, correct: false})
        setAlready(false)
        setWaiting(false)
        setResetCount(false)
        setWrongsQuestions([])
        setQuantityWrongs(0)
        setCount(50)
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={alert}
        onRequestClose={() => {
          setAlert(!alert);
        }}>

        <View style={styles.buttonSair}>
          <View style={styles.box}>
            <Text style={styles.textWarning}>Escolha uma carta</Text>
            <View style={styles.cards}>
              <View onTouchStart={() => {
                setCardSelected(1) 
                setQuantityWrongs(Math.floor(Math.random() * (3 - 0 + 1)) + 0)
                setClicked1(true)
                tips()
              }} style={{marginRight: 8}}>{cardSelected == 1 ? cards[quantityWrongs] : <Back width='50'/>}</View>
              <View onTouchStart={() => {
                setCardSelected(2) 
                setQuantityWrongs(Math.floor(Math.random() * (3 - 0 + 1)) + 0)
                setClicked1(true)
                tips()
              }} style={{marginRight: 8}}>{cardSelected == 2 ? cards[quantityWrongs] : <Back width='50'/>}</View>
              <View onTouchStart={() => {
                setCardSelected(3) 
                setQuantityWrongs(Math.floor(Math.random() * (3 - 0 + 1)) + 0)
                setClicked1(true)
                tips()
              }} style={{marginRight: 8}}>{cardSelected == 3 ? cards[quantityWrongs] : <Back width='50'/>}</View>
              <View onTouchStart={() => {
                setCardSelected(4) 
                setQuantityWrongs(Math.floor(Math.random() * (3 - 0 + 1)) + 0)
                setClicked1(true)
                tips()
              }}>{cardSelected == 4 ? cards[quantityWrongs] : <Back width='50'/>}</View>
            </View>
            {cardSelected ? <Text></Text> : <TouchableOpacity style={styles.buttonOk} onPress={() => {setAlert(!alert)
            setClicked1(false)}}>
              <Text style={styles.textButtonOk}>Cancelar</Text>
            </TouchableOpacity>}
          </View>
        </View>
      </Modal>


      {answerAxios.res && answerAxios.res[0] ?
        <ScrollView contentContainerStyle={{width: '100%', alignItems: 'center'}}>
          <View style={styles.header}>
            <Text onPress={() => navigation.navigate('GameAnswer')} style={{color: '#fff', fontSize: 20, fontWeight: '500', marginTop: 25}}>{`0:${count}`}</Text>
            <View style={{width: '94%', height: 3, backgroundColor: 'rgba(193, 193, 193, 1)'}}>
              <View style={{width: `${count + count}%`, height: '100%', backgroundColor: '#fff'}}></View>
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
          <View style={{opacity: clicked1 ? 0.3 : 1}} onTouchStart={() => {
            if(clicked1 == false && already == false) {
              setAlert(true)
              setClicked1(true)
          }}}><TipCarts /></View>
          <View style={{opacity: clicked2 ? 0.3 : 1}} onTouchStart={() => {
            if(clicked2 == false && already == false) {
            tips(2)
            setClicked2(true)
          }}}><TipHalf /></View>
        </View>
      
          <View style={styles.answerArea}>
            <View style={styles.configAnswer}>
              <View style={styles.divLetterAnswer}><Text style={styles.letterAnswer}>A</Text></View>
              <View style={{
                width: 230, 
                height: 40, 
                backgroundColor:  wrongQuestions[0] && wrongQuestions.includes('A') ? '#C53E' : 'rgba(158, 222, 254, 1)', 
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
                backgroundColor: wrongQuestions[0] && wrongQuestions.includes('B') ? '#C53E' : 'rgba(158, 222, 254, 1)', 
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
                backgroundColor: wrongQuestions[0] && wrongQuestions.includes('C') ? '#C53E' : 'rgba(158, 222, 254, 1)', 
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
                backgroundColor: wrongQuestions[0] && wrongQuestions.includes('D') ? '#C53E' : 'rgba(158, 222, 254, 1)', 
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

  buttonSair:{
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.80)',
  },
  cards: {
    flexDirection: 'row'
  },
  box:{
    width:300,
    padding: 20,
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
  buttonOk:{
    width:91,
    height:32,
    borderRadius: 8,
    backgroundColor: '#91BDD8',
    alignItems: 'center'
  },
  textButtonOk:{
    color: 'black',
    fontSize: 20,
  },


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