import React, {useState, useContext, useEffect} from 'react'
import { Text, View, StyleSheet, Image, ScrollView, Modal , TouchableOpacity, TextInput} from 'react-native';
import {Calendar, CalendarList, Agenda, } from 'react-native-calendars';
import  { LocaleConfig }  from  'react-native-calendars' ;
import useAxios from '../hooks/useAxios'
import { UserContext } from '../../App';
import Loading from '../components/Loading'

export function Tests() {
  const today = new Date();
  const [date, setDate] = useState()
  const [modal, setModal] = useState(false)
  const [annotation, setAnnotation] = useState({title: '', desc: ''})
  const {callAxios, answerAxios} = useAxios()
  const {dataUser} = useContext(UserContext)
  const [visible, setVisible] = useState(false)
  const [allAnnotations, setAllAnnotations] = useState()
  const [activeMap, setActiveMap] = useState(false)

  useEffect( () => {
    console.log(answerAxios)
     if(answerAxios.create) {
        GetTests()
     }

    if(answerAxios.res){
      setActiveMap(true)
      setAllAnnotations(answerAxios.res)
    }
  },[answerAxios])


  useEffect(() => {
    GetTests()
    DeletTests()
  },[])

  async function GetTests() {
    var data = ""
    try{
      setVisible(true)
      await callAxios ("calendar/" + dataUser.id, data, "get")
    }catch(e){
        console.log(e)
    }finally{
        setVisible(false)
    }
  }

  async function CreateTests(){
    var data = (date.day  + date.dateString.substring(4, 8) + date.year)
    data = {
      id: dataUser.id,
      date: date.dateString,
      title: annotation.title,
      desc: annotation.desc,
    }

    try{
      setVisible(true)
      await callAxios ("calendar/", data, "post")
    }catch(e){
        console.log(e)
    }finally{
        setVisible(false)
    }
  }
  
  async function DeletTests(){
    try{
      setVisible(true)
      await callAxios ("calendar/3", 'data', "delete")
    }catch(e){
        console.log(e)
    }finally{
        setVisible(false)
    }
  }

  LocaleConfig . locales [ 'fr' ]  =  { 
    monthNames : [ 
      'Janeiro' , 
      'Févereiro' , 
      'Março' , 
      'Abril' , 
      'Maio' , 
      'Juinho' , 
      'Julho' , 
      'Agosto' , 
      'Setembro' , 
      'Outubro' , 
      'Novembro' , 
      'Dezembro' 
    ] , 
    monthNamesShort : [ 'Janeiro' , 'Févereiro' , 'Março' , 'Abril' , 'Maio' , 'Juinho' , 'Julho' , 'Agosto' , 'Setembro' , 'Outubro' , 'Novembro' , 'Dezembro'  ] , 
    dayNames : [ 'Domingo' ,  'Segunda' ,  'Terça' ,  'Quarta' ,  'Quinta' ,  'Sexta' ,  'Sabado' ] , 
    dayNamesShort : [ 'Dom' ,  'Seg' ,  'Ter' ,  'Qua' ,  'Qui',  'Sex' ,  'Sab' ] ,
    hoje : "Aujourd'hui" 
  } ; 
  LocaleConfig . defaultLocale  =  'fr' ;
  return (
    <View style={{backgroundColor: '#004973', height:'100%', width:'100%'}}>
      <Loading visible={visible}/>
      <ScrollView>
      <View style={{width:'85%', alignSelf: 'center',}}>
        <Text style={{fontSize: 30, fontWeight: '500', color: '#fff', marginTop: 50}}>Calendário</Text>
        <Calendar style={{width: '100%', alignSelf: 'center', marginTop: 50, borderRadius: 10, backgroundColor: "#0368A0"}}
        minDate={ today }
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#0368A0',
          textSectionTitleColor: '#91BDD8',
          textSectionTitleDisabledColor: '#91BDD8',
          selectedDayBackgroundColor: '#23709D',
          selectedDayTextColor: '#23709D',
          todayTextColor: '#7BACC9',
          dayTextColor: '#7BACC9',
          textDisabledColor: '#FFF',
          selectedDotColor: 'black',
          arrowColor: '#7BACC9',
          disabledArrowColor: 'white',
          monthTextColor: '#7BACC9',
          indicatorColor: 'black',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '400',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 18,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 16,
        }}
        onDayPress = { dia  =>  { 
          setModal(!modal), setDate(dia)
        }}  
        hideArrows = { false } 
        // // renderArrow={direction => <Arrow />}
        hideExtraDays = { true } 
        firstDay = { 7 } />
      </View>
      <View style={{backgroundColor: '#005483', width: '100%', height: '100%' , marginTop:50, borderRadius: 40, marginBottom: 20}}>
        <View style={{width: '80%', alignSelf: 'center'}}>
          <Text style={{fontSize: 22, fontWeight: '700', color: '#2785BD', marginTop: 20}}>Próximos Eventos</Text>
          {activeMap ? allAnnotations.map((content) => {
            return(
              <View style={{width: 290, height: 88, backgroundColor:'#2785BD', borderRadius: 8, marginTop: 22, marginLeft: 25 }}>
                <View style={{width: 3, height: '100%', backgroundColor: '#005483', position: 'absolute', right: 50}}></View>
                  <View style={{justifyContent: 'center', height: '100%', marginLeft: 20, width: '70%'}}>
                    <Text style={{fontSize: 18, color: '#fff', fontWeight: '500'}}>{content.title}</Text>
                    <Text style={{fontSize: 18, color: '#fff', fontWeight: '500', marginTop: 10}}>{content.desc}</Text>
                    <Text style={{alignSelf: 'flex-end', fontSize: 14, color: '#A3CFE9'}}>{content.date}</Text>
                  </View>
              </View>
              )}) : <></>}
        </View>
      </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal)
        }}>

        <TouchableOpacity style={styles.buttonExit} onPress={() => setModal(!modal)}>
          <TouchableOpacity activeOpacity={1} style={styles.box}>
            <View style={{width: '80%', alignSelf: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: '400', color: '#91BDD8', marginTop: 10}}>{modal ? date.day : <></>}/{modal ? date.month : <></>}</Text>
              <TextInput placeholder='Titulo: ' onChangeText={(Text) => setAnnotation({...annotation, title:(Text)})} placeholderTextColor={'rgba(0, 73, 115, 1)'} style={{fontSize: 18, fontWeight: 'bold', color: 'rgba(0, 73, 115, 1)'}}></TextInput>
              <View style={{width:'100%', height: 3, backgroundColor: '#004973', marginTop: 3}}></View>
              <TextInput placeholder='Descrição: ' onChangeText={(Text) => setAnnotation({...annotation, desc:(Text)})} placeholderTextColor={'rgba(0, 73, 115, 1)'} style={{fontSize: 18, fontWeight: 'bold', color: 'rgba(0, 73, 115, 1)', marginTop: 20}}></TextInput>
              <View style={{width:'100%', height: 3, backgroundColor: '#004973', marginTop: 3}}></View>
              <TouchableOpacity style={styles.buttonSave} onPress={() => (setModal(!modal), CreateTests())}>
                <Text style={styles.textButtonSave}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>  
    </View>
  )
}

const styles= StyleSheet.create({
  //Modal de Confirmação de saida
  buttonExit:{
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 73, 115, 0.79)',
  },
  box:{
    width:285,
    height:213,
    backgroundColor: 'rgba(75, 130, 163, 1)',
    borderWidth: 2, 
    borderColor: '#FFF',
    borderRadius: 8,
  },
  buttonSave:{
    width:123,
    height:36,
    borderRadius: 8,
    backgroundColor: 'background: rgba(145, 189, 216, .2)',
    borderWidth: 2,
    borderColor: '#91BDD8',
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textButtonSave:{
    color: '#91BDD8',
    fontSize: 18,
  },
  
  });
  
