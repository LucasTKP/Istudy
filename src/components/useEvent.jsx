import React, {useState, useEffect, useContext} from 'react';
import useAxios from '../hooks/useAxios';
import { UserContext } from '../../App';
import * as SecureStore from 'expo-secure-store';



function useEvent() {
  // Variavel de resposta do axios
  const  [allEventInOrder, setAllEventInOrder] = useState()
  const {callAxios, answerAxios} = useAxios()
  const {dataUser, profile, setProfile} = useContext(UserContext)
  const [returnedNextEvent, setReturnedNextEvent] = useState([])
  const [returnedEventConclued, setReturnedEventConclued] = useState([])
  const [allEvents, setAllEvents] = useState()
  const [returnedEventsOrderBy, setReturnedEventsOrderBy] = useState()
  const [visibleTests, setVisibleTests] = useState(false)


  

  function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"-"+mesF+"-"+anoF;
}

  useEffect(() => {
    getEvents()
  },[])

  async function getEvents() {
    const dataUser=  await SecureStore.getItemAsync('User')
    const dataUserFilter = (JSON.parse(dataUser));

    var data = ""
    try{
      setVisibleTests(true)
      await callAxios ("calendar/" + dataUserFilter.id, data, "get")
    }catch(e){
        console.log(e)
    } finally {
      setVisibleTests(false)
    }
  }
  useEffect( () => {
    if(answerAxios.res){
      if(answerAxios.res.length){
        setAllEvents(answerAxios.res)
        if(answerAxios.delete){
          GetTests()
        }
        if(answerAxios.create || answerAxios.update) {
         GetTests()
        }
      }
    }
  },[answerAxios])
  
  useEffect( () => {
     if(allEvents != undefined) {
      returnedNextEvent.splice(0, returnedNextEvent.length)
      returnedEventConclued.splice(0, returnedEventConclued.length)
       AgroupDate()
     }
  },[allEvents])


  async function AgroupDate(){
    const arrayOfDatasDefault = []
    arrayOfDatasDefault.push(dataAtualFormatada())
    answerAxios.res.map((data) => {
      arrayOfDatasDefault.push(data.date)
    })
    FormatDate(arrayOfDatasDefault)
  }

  function FormatDate(arrayOfDatasDefault){
    const filtered = arrayOfDatasDefault.sort(function(a, b){
      var aa = a.split('-').reverse().join(),
      bb = b.split('-').reverse().join();
      return aa < bb ? -1 : (aa > bb ? 1 : 0);
    });
    InsertNextEvent(filtered)
    InsertEventConcluded(filtered)
  }

  function InsertNextEvent(filtered){
    var NoRepeat = 10
    const indexToday = filtered.indexOf(dataAtualFormatada())

    for(let i = indexToday + 1; i < filtered.length; i++) {
      const findedData = allEvents.findIndex((data) => data.date == filtered[i] && NoRepeat != data.id) 
      returnedNextEvent.push(answerAxios.res[findedData])
      NoRepeat = answerAxios.res[findedData].id
    }
  }


  function InsertEventConcluded(filtered){
    const indexToday = filtered.indexOf(dataAtualFormatada())

    for(let i = 0 ; i < indexToday ; i++) {
        const findedData = answerAxios.res.find((data) => data.date == filtered[i])
        returnedEventConclued.push(findedData)
    }
    setReturnedEventsOrderBy({NextEvent: returnedNextEvent,  EventConclued: returnedEventConclued})
  }

  const callEvent = React.useCallback(async(url, data, type) =>{
    getEvents()
    })
  return { 
    returnedEventsOrderBy,
    callEvent, 
    visibleTests
  }
}
export default useEvent
  