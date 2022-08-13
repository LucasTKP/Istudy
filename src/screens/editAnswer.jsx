import React, { useContext, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native';
import { UserContext } from '../../App';
import useAxios from '../hooks/useAxios'
import Loading from '../components/Loading'
import BoxAlert from '../components/BoxAlert'
import { Octicons, Feather } from '@expo/vector-icons'; 




export function EditAnswer({ navigation, route }) {

    const [answer, setAnswer] = useState(route.params.answer)
    const [question, setQuestion] = useState(route.params.question)
    const [message, setMessage] = useState("")
    const {setAlert} = useContext(UserContext)
    const [visible, setVisible] = useState(false)
    const {callAxios, answerAxios} = useAxios()
   
    useEffect(() => {
        if(answerAxios.status === 200){
            navigation.navigate('EditDeck')
        }
    },[answerAxios])

    async function UpdateInfo(){
        if (Validate()) {
            try{
                const data = {
                    "question": question,
                    "answer": answer
                }
                setVisible(true)
                await callAxios ("cards/answer/" + route.params.id , data, "put")
            }catch(e){
                console.log(e)
            }finally{
                setVisible(false)
            }
        } else {
            setMessage('Preencha os campos de pergunta e resposta')
            setAlert(true)
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

                <Text style={{fontSize: 20, color: '#91BDD8', width: 216}}>{route.params.title}</Text>
            </View>   
        </View>

        <View style={{width:291, height: 168, backgroundColor: '#23709D', borderRadius: 30, marginTop: 38, alignItems: 'center'}}>
            <View style={{width: '90%'}}>
                <TextInput onChangeText={(Text) => setQuestion(Text)} value={question} placeholderTextColor="#91BDD8" multiline = {true} numberOfLines = {4} placeholder = 'Pergunta' style={{fontSize: 16, fontWeight: '500', color: '#fff'}}></TextInput>
            </View>
        </View>

        <View style={{width:291, height: 190, backgroundColor: '#7BACC9', marginTop: -50, borderRadius: 30, alignItems: 'center', zIndex: -1, justifyContent: 'center'}}>
            <View style={{width: '90%', }}>
                <TextInput onChangeText={(Text) => setAnswer(Text)} value={answer} placeholderTextColor="#4B82A3" multiline = {true} numberOfLines = {4} placeholder = 'Resposta' style={{fontSize: 16, fontWeight: '500', color: '#fff'}}></TextInput>
            </View>
        </View>

        <View>   
            <TouchableOpacity onPress={() => UpdateInfo()} style={{width: 82, height: 52, backgroundColor: '#005483', justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderWidth: 2, borderColor: '#91BDD8', marginTop: 40}}>
                <Feather name="save" size={30} color="#7BACC9"  />
            </TouchableOpacity>
        </View>
    </View>
  );
}