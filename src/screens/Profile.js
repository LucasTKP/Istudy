import React, {useState, useContext, useEffect} from 'react';
import { Text, TouchableOpacity, Inpu, Image, KeyboardAvoidingView, Alert, ScrollView} from 'react-native';
import styled from 'styled-components/native'
import  Icon  from 'react-native-vector-icons/Ionicons'
import Salvar from '../../assets/Salvar.png'
import useStoreCache from '../hooks/useStoreCache';
import { UserContext } from '../../App';
import Loading from '../components/Loading'
import useAxios from '../hooks/useAxios'


export function Profile({ navigation, route }) {
    const {callStoreCache} = useStoreCache()
    //Variavel global
    const {dataUser} = useContext(UserContext)
    const {setDataUser} = useContext(UserContext)

    const [name, setName] = useState(dataUser.name)
   //Variavel que executa o Loading
    const [visible, setVisible] = useState(false)
    //Variavel Informação do axios
    const {callAxios, answerAxios} = useAxios()

    const [urlAvatar, setUrlAvatar] = useState(dataUser.image)

    //executa o validar apos o nome ser trocado
    useEffect(()=>{
      Validar()
    },[name])
    //Troca a photo da pagina se vim uma nova url de foto
    useEffect(()=>{
      if (route.params){
        UpdateImage()
        setUrlAvatar(route.params.urlAvatar)
      }
    },[route])

    //Troca avatar apos armazenar no banco de dados
    useEffect(()=>{
      if (answerAxios.status === 200){
        UpdateImageCache()
        setUrlAvatar(route.params.urlAvatar)
      } else if(answerAxios.status === 201) {
        
      }
    },[answerAxios])

    //Verifica se o nome que esta sendo trocado esta correto de acordo com a regex
    function Validar(){
      const regexName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/

       if ( 'a '> 0 && regexName.test(name)){
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
      dataUser.image = route.params.urlAvatar
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
      if (name === dataUser.name){
        Alert.alert(
          "Sucesso", 
          "Usuario atualizado com sucesso",
          [{ text: "OK"}]
        )
      } else {
        Validar()
        if (Validar() === true) {
            setVisible(true)
            const data = {
              name: name
            } 
            try{
              await callAxios ("user/" + dataUser.id, data, "put", false) 
            } catch(e) {
              console.log(e)
            } finally {
              setVisible(false)
            }
        } else {
          Alert.alert(
            "Erro ",
            "Não foi possivel alterar seu nome nao é possivel um nome com caracter especial",
            [{ text: "OK"}]
          )
        }  
    }
  } 
  //Altera o nome na variavel global
  useEffect(()=>{
    if(answerAxios.status === 200){
      dataUser.name = name
      const newData = dataUser
      setDataUser(newData)
      StorageCache(newData)
    } else {
      setName(dataUser.name)
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

  return (
    <Container>
      <ScrollView>
        <BugTeclado>
        <Loading visible={visible} />
        <DivImageProfile onPress={() => AlterTableName()} >
          <Image source={Salvar}></Image>
        </DivImageProfile>
            <DivProfile>
                <DivInformations>
                    <ImageProfile source={{uri: urlAvatar}} />
                    <ButtonChangeImage onPress={() => navigation.navigate('TradeAvatar')}><TextButtonImage>Alterar Imagem</TextButtonImage></ButtonChangeImage>
                    <DivInputNameChange>
                        <InputChangeName 
                        value= {dataUser.name}
                        placeholder={dataUser.name}
                        onChangeText={(Text)=> (setName(Text))}
                        ></InputChangeName>
                        <Icon style={{marginTop:5,  marginRight: 0}} name="pencil" size={22} color={"#444"} /> 
                    </DivInputNameChange>
                    <TitleStatistic>Estatistica do Perfil</TitleStatistic>
                    <DivTextStatistics>
                      <DivStatistics>
                        <TextStatistic>Partidas</TextStatistic>
                        <Statistics>{dataUser.matches}</Statistics>
                      </DivStatistics>

                      <DivStatistics>
                        <TextStatistic>Vitorias</TextStatistic>
                        <Statistics>{dataUser.wins}</Statistics>
                      </DivStatistics>    

                      <DivStatistics>
                        <TextStatistic>Derrotas</TextStatistic>
                        <Statistics>{dataUser.defeats}</Statistics>
                    </DivStatistics>  
                    </DivTextStatistics>
                    <Text style={{fontSize: 18}}>Conquistas</Text>
                    <Text style={{fontSize: 18, color: '#000AFF'}} onPress={() => navigation.navigate('AllConquest')}>Ver minhas conquistas</Text>
                      
                </DivInformations>
            </DivProfile>
        </BugTeclado>
        </ScrollView>  
    </Container>
  );
}

const Container = styled.View `
flex: 1;
background-color: #fff;
align-items: center;
width: 100%;
height: 100%;
`

const BugTeclado = styled.KeyboardAvoidingView `
align-items: center;
width: 100%;
height:100%;
`
const DivImageProfile = styled.TouchableOpacity `
width: 35px;
height: 35px;
position: absolute;
right: 10px;
top: 10px;
background-image:url("Salvar");
`

const DivProfile = styled.View `
width: 90%;
height: 99%;
align-items: center;
`

const DivInformations = styled.View `
width: 100%;
height: 50%;
align-items: center;
`

const ImageProfile = styled.Image `
width: 250px;
height: 150px;
margin-top: 20px;
`

const ButtonChangeImage = styled.TouchableOpacity `
font-size: 23px;
margin-top: 10px;
font-weight: bold;
width: 200px;
height: 35px;
text-align: center;
background-color: #D9D9D9;
border-radius: 10px;
`

const TextButtonImage = styled.Text `
font-size: 20px;
width: 100%;
height: 100%;
text-align : center;
`

const DivInputNameChange = styled.View `
border: 1px solid black;
width: 70%;
height: 40px;
border-radius: 8px;
margin-top:25px;
flex-direction: row;
`

const InputChangeName = styled.TextInput `
height:100%;
margin-left: 3px;
text-transform: uppercase;
`

const TitleStatistic = styled.Text `
font-size: 20px;
font-weight: bold;
margin-top: 10px;
`

const DivTextStatistics = styled.View `
width: 90%;
height: 150px;
flex-direction: row;
justifyContent: center;
`

const DivStatistics = styled.View `
justifyContent: center;
margin: 0 25px 0 25px;
padding: 20px 0 30px 0;
align-items: center;
`

const TextStatistic = styled.Text `
font-size: 20px;
font-weight: bold;
margin: 0 auto;
`

const Statistics = styled.Text `
font-size: 40px;
font-weight: bold;
`