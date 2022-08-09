import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native';
import Edit from '../../assets/edit.png'
import useAxios from '../hooks/useAxios';
import Loading from '../components/Loading';

export function EditDeck({ navigation, route }) {
    const {callAxios, answerAxios} = useAxios()
    const [visible, setVisible] = useState(true)
    const [title, setTitle] = useState({change: false, text: ''})

    useEffect(() => {
        return navigation.addListener("focus", () => {
            Deck()
        });
    }
    ,[navigation])

    async function Deck (){
        try{
            await callAxios('cards/one/' + route.params, '', 'get')
        } catch(error){
            console.log(error)
        } finally {
            setVisible(false)
        } 
    }

    async function Salvar (){
        try{
            console.log(route.params)
            setVisible(true)
            await callAxios('cards/info/' + route.params, {title: title.text}, 'put')
            navigation.navigate('Decks')
        } catch(error){
            console.log(error)
        } finally {
            setVisible(false)
        } 
    }

  return (
    <View style={{backgroundColor:'#005483', height:'100%', width:'100%', alignItems: 'center'}}>
    <Loading visible={visible} />
      <View style={{flexDirection:'row'}}>
        <View style={{justifyContent: 'space-between', width:'50%'}}>
          <Text style={{fontSize: 30, color: 'white'}}>Editar Deck</Text>
          <TouchableOpacity style={{
                    marginTop: 40,
                    backgroundColor: '#91BDD8',
                    borderRadius: 10,
                    width: 130
                }} onPress={() => Salvar()}><Text style={{color: '#23709D', padding: 10, fontSize: 20, fontWeight: '600', textAlign: 'center'}}>Salvar</Text></TouchableOpacity>
        </View>
        <Image source={Edit} style={{width: 120, height: 120}}/>
      </View>

      <View style={{borderBottomWidth: 2 , borderColor: '#FFF', width: '75%', marginTop: 25}}>
            <Text style={{fontSize: 22, color: '#7BACC9'}}>Título: </Text>
            <TextInput onChangeText={(Text) => setTitle({change: true, text: Text})} value={answerAxios.res != undefined && title.change == false ? answerAxios.res.title : title.text} style={{fontSize: 20, color: 'white', marginTop: 10}}></TextInput>
        </View>

        <Text style={{alignSelf: 'flex-start', color: 'white', fontSize: 20, marginLeft: 55, marginTop: 20}}>Perguntas</Text>
        <View style={{width: 50, height:2, backgroundColor: '#D7E3EA', marginTop: 10, marginBottom: 20, alignSelf: 'flex-start', marginLeft: 55}}></View>
                
        {answerAxios.res != undefined ? answerAxios.res.card_Answer.map((answer, index) => {
            return (
            <TouchableOpacity style={{
                flexDirection: 'row', backgroundColor: index % 2 == 0 ? '#91BDD8' : '#2785BD', width: '75%', padding: 10, borderColor: '#007FC7', borderWidth: 3, borderRadius: 50, marginBottom: 10}} 
                key={index}
                onPress={() => navigation.navigate('EditAnswer', { id: answer.id, answer: answer.answer, question: answer.question, title: answerAxios.res.title})}>
                <Text style={{color: '#004973', fontSize: 16, fontWeight: 'bold'}}>{index + 1} -</Text>
                <Text style={{color: '#004973', fontSize: 16, fontWeight: '500'}}>{answer.question}</Text>
            </TouchableOpacity>
        )}) : <Text></Text>}
    </View> 
  );
}

const styles = StyleSheet.create({
  
});
