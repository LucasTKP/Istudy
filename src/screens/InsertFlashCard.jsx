import React, { useContext, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import { UserContext } from '../../App';
import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading'
import BoxAlert from '../components/BoxAlert'
import { Octicons, Feather } from '@expo/vector-icons'; 
import Interrogation from '../../assets/ImagePages/interrogation.svg'



export function InsertFlashCard({ navigation, route  }) {

    const idFlashCard = route.params.id
    const [answer, setAnswer] = useState("")
    const [question, setQuestion] = useState("")
    const [message, setMessage] = useState("")
    const {setAlert} = useContext(UserContext)
    const [flashCard, setFlashCard] = useState([])
    const [visible, setVisible] = useState(false)
    const {callAxios, answerAxios} = useAxios()
    const [page, setPage] = useState(0)
    const [previousPage, setPreviousPage] = useState(false)
    const [nextPage, setNextPage] = useState(true)
   
    useEffect(() => {
        if(answerAxios.status === 200){
            navigation.navigate('Home')
        }
    },[answerAxios])
  
     function NextPage(){

        if(Validate()){
            setPreviousPage(true)
            if(page  < flashCard.length && page != -1){
                flashCard[page] = {answer, question}
                setPage(page + 1)
                if(flashCard[page + 1]){
                    setQuestion(flashCard[page + 1].question)
                    setAnswer(flashCard[page + 1].answer)
                } else {
                    setQuestion("")
                    setAnswer("")
                }
            } else {
                flashCard.push({question, answer})
                setQuestion("")
                setAnswer("")
                setPreviousPage(true)
                setPage(page + 1)
            }
        } else {
            setMessage('Preencha os campos de pergunta e resposta')
            setAlert(true)
        }     
    }

    useEffect(() => {
        if(page === 0){
            setPreviousPage(false)
        }
        
        if(page > 8){
            setNextPage(false)
        }
    },[page])

    function PreviousPage(){   
        flashCard[page] = {answer, question}
        if(page != 0){
            setPage(page  - 1)  
            setQuestion(flashCard[page - 1].question)
            setAnswer(flashCard[page - 1].answer)
        }
    }
    async function UpdateInfo(){
        NextPage()
        try{
            setVisible(true)
            await callAxios ("cards/answers/" + idFlashCard , flashCard, "post")
        }catch(e){
            console.log(e)
        }finally{
            setVisible(false)
        }
    }

    function Validate(){
        if(question != "" && answer != ""){
            return true
        }
        return false
    }

  return (
    <View style={{backgroundColor:'#005483', height:'100%', width:'100%', alignItems: 'center'}}>
        <BoxAlert message={message} type={'erro'}/>
        <Loading visible={visible}/>
        <View style={{flexDirection: 'row', width: '80%'}}>
            <View>
                <Text style={{fontSize: 30, color: '#fff', paddingBottom: 20}}>Perguntas</Text>
                <Text style={{fontSize: 14, color: '#91BDD8', width: 216}}> Escreva perguntas relacionadas matéria e suas respostas com suas próprias palavras.</Text>
            </View>   
            <Interrogation />
        </View>

        <View style={{width:291, height: 168, backgroundColor: '#23709D', borderRadius: 30, marginTop: 38, alignItems: 'center'}}>
            <View style={{width: '90%'}}>
                <TextInput  
                    blurOnSubmit={true} 
                    onSubmitEditing={()=>{Keyboard.dismiss()}} 
                    keyboardType='default' 
                    onChangeText={(Text) => setQuestion(Text)} 
                    value={question} 
                    placeholderTextColor="#91BDD8" 
                    multiline = {true} 
                    numberOfLines = {7} 
                    placeholder = 'Pergunta' 
                    style={{fontSize: 16, fontWeight: '400', color: '#fff', height: '100%', marginTop: 20}}>
                </TextInput>
            </View>
        </View>

        <View style={{width:291, height: 190, backgroundColor: '#7BACC9', marginTop: -50, borderRadius: 30, alignItems: 'center', zIndex: -1, justifyContent: 'center'}}>
            <View style={{width: '90%', }}>
                <TextInput 
                    blurOnSubmit={true}
                    onSubmitEditing={()=>{Keyboard.dismiss()}} 
                    keyboardType='default' 
                    onChangeText={(Text) => setAnswer(Text)} 
                    value={answer} 
                    placeholderTextColor="#4B82A3"
                    multiline = {true} 
                    numberOfLines = {7} 
                    placeholder = 'Resposta' 
                    style={{fontSize: 16, fontWeight: '800', color: '#fff', height: '100%', marginTop: '50%'}}>
                 </TextInput>
            </View>
        </View>

        <View style={{width: 213, height: 53, backgroundColor: '#2785BD', borderWidth: 2, borderColor: '#91BDD8', borderRadius: 20, marginTop: 60, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{justifyContent: 'space-between', flexDirection: 'row', width: '85%', alignItems: 'center'}}>
            {previousPage ? 
            <TouchableOpacity onPress={() => PreviousPage()}> 
                <Octicons name="arrow-left" size={30} color="#7BACC9" />
            </TouchableOpacity>
            : <Octicons name="arrow-left" size={30} color="#7BACC9" />}

                
            <TouchableOpacity onPress={() => UpdateInfo()} style={{width: 82, height: 52, backgroundColor: '#005483', justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderWidth: 2, borderColor: '#91BDD8'}}>
                <Feather name="save" size={30} color="#7BACC9"  />
            </TouchableOpacity>


            {nextPage ? 
            <TouchableOpacity onPress={() => NextPage()}>
                <Octicons name="arrow-right" size={30} color="#7BACC9" />
            </TouchableOpacity>
            :   <Octicons name="arrow-right" size={30} color="#7BACC9" /> }
            </View>
        </View>
    </View>
  );
}