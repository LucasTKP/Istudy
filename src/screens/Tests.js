import React, {useState, useContext, useEffect} from 'react'
import { Text, View, StyleSheet, Image, ScrollView, Modal , TouchableOpacity, TextInput} from 'react-native';
import {Calendar, CalendarList, Agenda, } from 'react-native-calendars';
import  { LocaleConfig }  from  'react-native-calendars' ;
import useAxios from '../hooks/useAxios'
import { UserContext } from '../../App';
import Loading from '../components/Loading'
import  IconTrash from '../../assets/ImageIcons/iconTrash.svg'
import  IconEdit from '../../assets/ImageIcons/iconEdit.svg'
import  IconEventConclued from '../../assets/ImageIcons/iconEventConclued.svg'
import  IconNextEvent from '../../assets/ImageIcons/iconNextEvent.svg'
import BoxAlert from '../components/BoxAlert'
import useEvent from '../components/useEvent'


export function Tests() {
  const today = new Date();
  const [date, setDate] = useState()
  const [modal, setModal] = useState(false)
  const [modalDelet, setModalDelet] = useState(false)
  const [annotation, setAnnotation] = useState({title: '', desc: ''})
  const {callAxios, answerAxios} = useAxios()
  const {dataUser, setAlert} = useContext(UserContext)
  const [visible, setVisible] = useState(false)
  const [activeMap, setActiveMap] = useState(false)
  const [index, setIndex] = useState()
  const [typeIndex, setTypeIndex] = useState("")
  const [contentAlert, setContentAlert] = useState({typeAlert: '', message: ''})
  const [finalObject, setFinalObject] = useState({})
  const [edit, setEdit] = useState(false)
  const [alterEvents, setAlterEvents] = useState(false)
  const {returnedEventsOrderBy, callEvent} = useEvent()

function DateConfig(dia){
  setDate(dia.dateString.split('-').reverse().join('-'))
  setModal(!modal)
}

  useEffect(() => {
    if(returnedEventsOrderBy != undefined){
      setActiveMap(true)
      MarkedEventConclued()
      MarkedNextEvent()
    }
  },[returnedEventsOrderBy])

  useEffect(() => {
    callEvent()
    setFinalObject({})
  },[answerAxios])

  

  //Create new Event
  async function CreateTests(){
    if (annotation.title != "", annotation.desc != ""){
      const data = {
        id: dataUser.id,
        date: date,
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
          setAlert(true)
          setContentAlert({...contentAlert, message: "Evento criado com sucesso", typeAlert: "sucesso"})
          setAnnotation({...annotation, title:("")})
          setAnnotation({...annotation, desc:("")})
      }
    } else {
      setAlert(true)
      setContentAlert({...contentAlert, message: "Preencha todos os campos para criar um evento", typeAlert: "erro"})
    }
  }
  async function DeletTests(){
    try{
      setVisible(true)
      if(typeIndex === "conclued"){
        await callAxios ("calendar/" +  returnedEventsOrderBy.EventConclued[index].id, 'data', "delete")
      } else {
        await callAxios ("calendar/" +  returnedEventsOrderBy.NextEvent[index].id, 'data', "delete")
      }
    }catch(e){
        console.log(e)
    }finally{
        setVisible(false)
    }
  }
  async function EditTests(){
    if (annotation.title != "", annotation.desc != ""){
      try{
        setVisible(true)
        if(typeIndex === "conclued"){
          const data = {
            date: returnedEventsOrderBy.EventConclued[index].date,
            title: annotation.title,
            desc: annotation.desc,
          }
          await callAxios ("calendar/" + returnedEventsOrderBy.EventConclued[index].id, data, "put")
        } else {
          const data = {
            date: returnedEventsOrderBy.NextEvent[index].date,
            title: annotation.title,
            desc: annotation.desc,
          }
          await callAxios ("calendar/" + returnedEventsOrderBy.NextEvent[index].id, data, "put")
        }
        
      }catch(e){
          console.log(e)
      }finally{
          setVisible(false)
          setAnnotation({...annotation, title:("")})
          setAnnotation({...annotation, desc:("")})
      }
    } else {
      setAlert(true)
      setContentAlert({...contentAlert, message: "Preencha todos os campos para criar um evento", typeAlert: "erro"})
    }
  }
  //Inserindo cor verde para nextEvent e vermelho para EventConclued

  async function MarkedEventConclued(){
    const allDates = []
  
     returnedEventsOrderBy.EventConclued.map((data) => {
      const [day, month, year] = data.date.split('-')
      const englishTypeDatas = [year, month, day].join('-')
      allDates.push(englishTypeDatas)
    })
    allDates.map((data) => {
      setFinalObject(prevFinalObject => {
        return {
          ...prevFinalObject,
          [data] : {selected: true, selectedColor: '#A80000'}
        }
      })
    })
  }
  function MarkedNextEvent(){
    const allDates = []

      returnedEventsOrderBy.NextEvent.map((data) => {
      const [day, month, year] = data.date.split('-')
      const englishTypeDatas = [year, month, day].join('-')
      allDates.push(englishTypeDatas)
    })
    allDates.map((data) => {
      setFinalObject(prevFinalObject => {
        return {
          ...prevFinalObject,
          [data] : {selected: true, selectedColor: '#00BB7C'}
        }
      })
    })
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
      <BoxAlert message={contentAlert.message} type={contentAlert.typeAlert}/>
      <Loading visible={visible}/>
      <ScrollView>
        <View style={{width:'85%', alignSelf: 'center',}}>
          <Text style={{fontSize: 30, fontWeight: '500', color: '#fff', marginTop: 50}}>Calendário</Text>
          <Calendar style={{width: '100%', alignSelf: 'center', marginTop: 50, borderRadius: 10, backgroundColor: "#0368A0"}}
          minDate={ "2022-09-01" }
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#0368A0',
            textSectionTitleColor: '#fff',
            textSectionTitleDisabledColor: '#fff',
            selectedDayBackgroundColor: '#fff',
            selectedDayTextColor: '#fff',
            todayTextColor: '#ffffff',
            dayTextColor: '#fff',
            textDisabledColor: '#7BACC9',
            selectedDotColor: 'black',
            arrowColor: '#7BACC9',
            disabledArrowColor: 'white',
            monthTextColor: '#fff',
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
          onDayPress = { dia  =>  { DateConfig(dia) }}  
          hideArrows = { false } 
          // // renderArrow={direction => <Arrow />}
          hideExtraDays = { true } 
          firstDay = { 7 } 
          markedDates={finalObject}
          />
          
        </View>
        <View style={{backgroundColor: '#005483', width: '100%', height: '100%', minHeight: 150, marginTop:50, borderRadius: 40, marginBottom: 20}}>
          <View style={{width: '80%', alignSelf: 'center'}}>
            {activeMap ? 
            <>
              <Text  style={{fontSize: 25, fontWeight: '700', color: '#2785BD', alignSelf: 'center'}}>{alterEvents ? 'Eventos concluídos' : 'Próximos eventos'}</Text> 
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignSelf: 'center', marginTop: 10}}>
                <TouchableOpacity onPress={() => setAlterEvents(!alterEvents)} 
                style={{width:120, height: 35, backgroundColor: alterEvents ? '#005483' : '#0374B4', borderWidth: 3, borderColor: '#91BDD8', 
                borderRadius: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontSize: 16, color: '#91BDD8', fontWeight: '400', marginLeft: 5,}}>Próximos</Text>
                  <IconNextEvent style={{marginRight: 10}}/>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setAlterEvents(!alterEvents)} 
                style={{width:120, height: 35, backgroundColor: alterEvents ? '#0374B4' : '#005483' , borderWidth: 3, borderColor: '#91BDD8', 
                borderRadius: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontSize: 16, color: '#91BDD8', fontWeight: '400', marginLeft: 5,}}>Concluídos</Text>
                  <IconEventConclued />
                </TouchableOpacity>
              </View>
            </>
            :
            <Text style={{fontSize: 22, fontWeight: '700', color: '#fff', marginTop: 20, alignSelf: 'center'}}>Crie um Evento</Text> }
            {activeMap ? (alterEvents ? returnedEventsOrderBy.EventConclued : returnedEventsOrderBy.NextEvent).map((content, Index) => {
              return(
                <View  key={alterEvents ? content : Index} style={{width: 290, height: 88, backgroundColor:'#2785BD', borderRadius: 8, marginTop: 22, marginLeft: 25}}>
                  <View style={{width: 3, height: '100%', backgroundColor: '#005483', position: 'absolute', right: 50}}></View>
                  <View style={{justifyContent: 'center', height: '100%', marginLeft: 20, width: '70%'}}>
                    <Text  style={{fontSize: 18, color: '#fff', fontWeight: '500'}}>{content.title}</Text>
                    <Text  style={{fontSize: 18, color: '#fff', fontWeight: '500', marginTop: 10}}>{content.desc}</Text>
                    <Text   style={{alignSelf: 'flex-end', fontSize: 14, color: '#A3CFE9'}}>{content.date}</Text>
                  </View>              
                  <IconTrash onPress={() => (setIndex(Index), setTypeIndex(alterEvents ? "conclued" : "next"), setModalDelet(!modalDelet))} style={{position: 'absolute', right: '6%', top: '10%'}} />
                  <IconEdit onPress={() => (setIndex(Index), setTypeIndex(alterEvents ? "conclued" : "next"), setEdit(!edit), setModal(!modal))} style={{position: 'absolute', right: '6%', bottom: '10%'}} />
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
          setModal(!modal), edit ? setEdit(!edit) : <></>
        }}>

        <TouchableOpacity style={styles.buttonExit} onPress={() => (setModal(!modal), edit ? setEdit(!edit) : <></>)}>
          <TouchableOpacity activeOpacity={1} style={styles.box}>
            <View style={{width: '80%', alignSelf: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: '400', color: '#91BDD8', marginTop: 10}}>{edit ? (alterEvents ? returnedEventsOrderBy.EventConclued[index].date : returnedEventsOrderBy.NextEvent[index].date) : date}</Text>
              <TextInput placeholder='Titulo: ' maxLength={18} onChangeText={(Text) => setAnnotation({...annotation, title:(Text)})} placeholderTextColor={'rgba(0, 73, 115, 1)'} style={{fontSize: 18, fontWeight: 'bold', color: 'rgba(0, 73, 115, 1)', marginTop: 20}}></TextInput>
              <View style={{width:'100%', height: 3, backgroundColor: '#004973', marginTop: 3}}></View>
              <TextInput placeholder='Descrição: ' maxLength={18} onChangeText={(Text) => setAnnotation({...annotation, desc:(Text)})} placeholderTextColor={'rgba(0, 73, 115, 1)'} style={{fontSize: 18, fontWeight: 'bold', color: 'rgba(0, 73, 115, 1)', marginTop: 20}}></TextInput>
              <View style={{width:'100%', height: 3, backgroundColor: '#004973', marginTop: 3}}></View>
              <TouchableOpacity style={styles.buttonSave} onPress={() => (setModal(!modal), edit ? (EditTests(), setEdit(!edit)) : CreateTests())}>
                <Text style={styles.textButtonSave}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>  

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDelet}
        onRequestClose={() => {
          setModalDelet(!modalDelet)
        }}>

        <TouchableOpacity style={styles.buttonExit} onPress={() => setModalDelet(!modalDelet)}>
          <TouchableOpacity activeOpacity={1} style={styles.box}>
            <View style={{width: '80%', height: '100%', alignSelf: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize:20, fontWeight: '500', color: '#fff', textAlign: 'center'}}>Tem certeza que deseja excluir este evento?</Text>
              <TouchableOpacity style={styles.buttonSave} onPress={() => (setModalDelet(!modalDelet), DeletTests())}>
                <Text style={styles.textButtonSave}>Sim</Text>
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
    height:225,
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
  
