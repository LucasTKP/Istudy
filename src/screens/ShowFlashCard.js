import React, {useState, useEffect } from 'react';
import Button from '../components/Button'
import styled from 'styled-components/native'
import { Text, Alert} from 'react-native';
import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading'




export function ShowFlashCard({ navigation }) {
  //Variavel Informação do axios
  const {navigationAxios, callAxios, answerAxios} = useAxios()
  //Variaveis de informação do flashCard
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [title, setTitle] = useState("")
  const [materia, setMateria] = useState("")  
  //Variavel com a resposta do axios
  const [dataFlash, setDataFlash] = useState("")
  //Variavel para verificar se é pra trocar de pagina ou exibir resposta
  const [proxPage, setProxPage] = useState(true)
  //Variavel para contar as paginas que ja foram exibidas
  const [numberFlash, setNumberFlash] = useState(50)
  //Variavel Loading
  const [visible, setVisible] = useState(false)

  //Executa a função de puxar os flahs apenas uma vez após abrir o app
  useEffect(()=>{
    showQuestionCard()
  },[])



  //Seta a resposta do axios na variavel dataFlash
  useEffect(()=>{
    
    if(answerAxios.res){
    setMateria(answerAxios.res.category[0].name)
    setDataFlash(answerAxios.res.card_Answer)
    setTitle(answerAxios.res.title)
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
    if(numberFlash < dataFlash.length) {
      if(numberFlash >= 0){
        setQuestion(dataFlash[numberFlash].question)
        setAnswer(dataFlash[numberFlash].answer)
      } else {
        navigation.navigate('Home')
      }
    } else{
      setNumberFlash(numberFlash - 1)
      Alert.alert(
        "Falha ao ir pro proximo",
        "Você esta na ultima pagina" ,
        [{ text: "OK"}]
      ) 
    }
  }

  //Axios puxando os flashCads no banco de dados
  async function showQuestionCard(){
    const data = {
    } 
    try{
      setVisible(true)
      await callAxios ("cards/one/" + 5, data, "get", false)
    }catch(e){
      console.log(e)
    }finally{
      setVisible(false)
    }
  }

  return (
    <Container>
      <Loading visible={visible} />
      <BugTeclado>
        <DivShowTitle>
          <Text style={{fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase'}}>{title}</Text>
          <Text style={{fontSize: 20}}>{materia}</Text>
        </DivShowTitle>

        <ShowTheme> 
          {proxPage ? <TextShowQuestion>{question}</TextShowQuestion> : <TextShowQuestion>{answer}</TextShowQuestion> }
        </ShowTheme>

        { proxPage ? <Button Text= "Resposta" fontSize = {16} onPress={() => (setProxPage(!proxPage))}/>  :  <Button Text= "Proximo" fontSize = {16} onPress={() => (setProxPage(!proxPage), setNumberFlash(numberFlash + 1))}/>}
        { proxPage ? <Button Text= "Voltar" fontSize = {16} onPress={() => (setProxPage(!proxPage), setNumberFlash(numberFlash - 1))} /> :  <Button Text= "Voltar" fontSize = {16}  onPress={() => (setProxPage(!proxPage))} />}
        </BugTeclado>
    </Container>
  );
}
const Container = styled.ScrollView `
height:100%;
background-color: #9EDEFE;
`

const BugTeclado = styled.KeyboardAvoidingView `
align-items: center;
width: 100%;
height:100%;
margin-bottom: 40px;
`

const DivShowTitle = styled.View `
width: 100%;
height: 129px;
background-color: #42BEFB
align-items: center;
justifyContent: center;
`

const ShowTheme = styled.View `
width: 313px;
height: 172px;
background-color: #fff;
margin-bottom:19px;
margin-top: 50px;
justifyContent: center;
align-items: center;
`
const TextShowQuestion = styled.Text `
width: 199px;
font-size: 16px;
text-align: center;
text-transform: uppercase;
`
