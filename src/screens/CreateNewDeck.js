import React, { useContext, useState, useEffect } from 'react';
import Button from '../components/Button'
import styled from 'styled-components/native'
import { Text} from 'react-native';
import { UserContext } from '../../App';
import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading'
import BoxAlert from '../components/BoxAlert'



export function CreateNewDeck({ navigation, route }) {
  //Variavei com informação dos flashCards
  const [title, setTitle] = useState("")
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [nameCategory, setNameCategory] = useState("")
  const [idCategoria, setIdCategoria] = useState("")
  const [nameIcon, setNameIcon] = useState('https://istudy.sfo3.cdn.digitaloceanspaces.com/Categorys/ImageDefault.png')
  //Variavel para verificar se é a primeira pagina, onde se cria o titulo, imagem entre outros
  const [pageOne, setPageOne] = useState(true)
  //Variavel que muda components após passar da primeira pagina
  const [justify, setJustify] = useState("space-between")
  //Variavel que junta as informações dos flash e envia para o banco de dados
  const [flashCard, setFlashCard] = useState(null)
  //Variaveis para limitar a quantidade de flash cards criadas
  const [maxPage, setMaxPage] = useState(false)
  const [Counter, setCounter] = useState(1)
  //Variavel Global
  const {dataUser} = useContext(UserContext)
  //Variavel Loading
  const [visible, setVisible] = useState(false)
  //Variavel Informação do axios
  const {callAxios, answerAxios} = useAxios()
  //Variavel de alert
  const [alert, setAlert] = useState(false)

  //Seta o id e o nome da materia selecionada 
  useEffect(()=>{
    if(route.params != undefined){
      setIdCategoria(route.params.idFilter)
      setNameCategory(route.params.nameFilter)
    }
  },[route.params])

  //Função que salva o flashCard no banco de dados
  async function SalvarCard(){
    try{
      setVisible(true)
      await callAxios ("cards/answers/" + answerAxios.createCard.id , flashCard, "post")
    }catch(e){
      console.log(e)
    }finally{
    setVisible(false)
    }
  }

  //Função que cria executa em ordem a função de criar e a de salvar no banco de dados
  async function Create(){
    await Salvar()
    SalvarCard()
  }
  
  //Função que salva o flash card na Variavel flashCard
  async function Salvar(){
    if (title != "" && question != "" && answer != "" && idCategoria != ""){
      if (pageOne === false ){
        const flashCardEnd = flashCard
        flashCardEnd.push({question,answer})
        setFlashCard(flashCardEnd)
      }
      if (pageOne === true){
        const flashCardEnd = [flashCard] 
        flashCardEnd.push({question,answer})
        setFlashCard(flashCardEnd)
        flashCardEnd.shift()

        const data = {
          id_user: dataUser.id,
          id_category: idCategoria,
          title: title,
        } 

        try{
          setVisible(true)
          await callAxios ("cards", data, "post") 
        }catch(e){
          console.log(e)
        }finally{
          setVisible(false)
        }
      }
      setPageOne(false)
      setJustify("center")
      setQuestion("")
      setAnswer("")
      setCounter(Counter + 1)

    if (Counter > 8) {  
      setMaxPage(true)
    }
  
  } else {
    setAlert(true)
  }
  }
  

  return (
    <Container>
      {alert ? <BoxAlert type = {'erro'} message = {'Preencha todos os campos e escolha a materia'} /> : <Text style={{display:'none'}}></Text>}
      <Loading visible={visible} />
      <BugTeclado>
        <DivHeader justify = {justify}>
          {pageOne ? <InputTitleFlash placeholder = "Título do Flashcard" onChangeText={(Text) => setTitle(Text)}></InputTitleFlash> : <TextTitle>{title}</TextTitle>}
          {pageOne ? <ButtonChooseMateria onPress={() => navigation.navigate('Filter')}><Text style={{fontSize: 20}}> Materia </Text></ButtonChooseMateria> : <Text> </Text>}
        </DivHeader>

        <DivImageDeck>
          <ImageDeck source={{uri: nameIcon}}>
          </ImageDeck>
        </DivImageDeck>  
        {pageOne ? <ButtonChooseImage><Text style={{fontSize: 12, color: 'white'}}> Selecionar Imagem</Text></ButtonChooseImage> : <Text> {Counter} </Text>}

        <DivShowTitle>
          {pageOne ?  <Text style={{fontSize: 16, fontWeight: 'bold'}}>Título do Flashcard</Text> : <Text style={{fontSize: 16, fontWeight: 'bold'}}>{title}</Text>}
          {pageOne ?  <Text style={{fontSize: 16}}>Matéria</Text> : <Text>{nameCategory}</Text>}
        </DivShowTitle>

        <DivInfoFlash>
          <InputQuestion placeholder= "Tema" value = {question} onChangeText={(Text) => setQuestion(Text)}></InputQuestion>
          <InputAnnotation placeholder = "Anotações"  value = {answer} onChangeText={(Text) => setAnswer(Text)}></InputAnnotation>
        </DivInfoFlash>

        {maxPage ? <Text></Text> : <Button Text= "Salvar" fontSize = {16} onPress={() => Salvar()}/>}
        {pageOne ? <Text></Text> : <Button onPress={() => Create()} Text= "Salvar e criar" fontSize = {16}/>}

      </BugTeclado>
    </Container>
  );
}
const Container = styled.ScrollView `
height:100%;
`

const BugTeclado = styled.KeyboardAvoidingView `
align-items: center;
width: 100%;
height:100%;
margin-bottom: 40px;
`
const DivHeader = styled.View `
flexDirection: row;
width: 350px;
justifyContent: ${props => props.justify};
margin-top: 10px;
`

const InputTitleFlash = styled.TextInput `
border: 1px solid black;
border-radius: 4px;
width: 184px;
height: 39px;
`

const TextTitle = styled.Text `
font-size: 16px;
font-weight: bold;
`

const ButtonChooseMateria = styled.TouchableOpacity `
  background: #B7B7B7;
  width: 88px;
  height: 32px;
  align-items: center;
  border-radius: 20px;
  font-size: 20px;
`

const DivImageDeck = styled.View `
width: 138px;
height: 146px;
background-color: #D9D9D9;
margin-top: 15px;
align-items: center;
justifyContent: center;
align-text: center;
`

const ImageDeck = styled.Image `
width: 97px;
height: 117px;
`
const ButtonChooseImage = styled.TouchableOpacity `
margin-top: 19px;
width: 114px;
height: 32px;
border-radius:5px;
background-color: #0353BF
justifyContent: center;
`
const DivShowTitle = styled.View `
width: 266px;
height: 56px;
background-color: #42BEFB
margin-top: 18px;
align-items: center;
justifyContent: center;
`
const DivInfoFlash = styled.View `
width: 266px;
height: 352px;
background-color: #9EDEFE;
align-items: center;
`

const InputQuestion = styled.TextInput `
width: 222px;
height: 74px;
background-color: #fff;
margin-bottom:19px;
margin-top: 26px;
text-align: center;
`
const InputAnnotation = styled.TextInput `
width: 222px;
height: 155px;
background-color: #fff;
text-align: center;
`
