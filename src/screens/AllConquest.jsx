import React, { useState, useEffect, useContext } from 'react';
import { Text, View,  ScrollView, Image } from 'react-native';
import styled from 'styled-components/native'
import  axios  from 'axios'
import { UserContext } from '../../App';
import Loading from '../components/Loading'


export function AllConquest() {
    //Variavel global
    const {dataUser} = useContext(UserContext)
    //conquistas completadas
    const [conquistasConcluidas, setConquistasConcluidas] = useState([])
    //conquistas que nao foram feitas
    const [conquistasBloqueadas, setConquistasBloqueadas] = useState([])
    //variavis  para calcular porcentagem ja feitas
    const [porcentagem, setPorcentagem] = useState("0")
    //Variavel Loading
    const [visible, setVisible] = useState(true)
    
 
//executa apenas uma vez a funçao de exibir conquistas
useEffect(() => {
  ImportConquestsConcluidas()
}, [])
  //puxar e exibi todas as conquistas e as ja concluidas
  async function ImportConquestsConcluidas(){
    try{
        const urlCadastrar = "https://istudy-back-production.up.railway.app/api/v1/user/achievement/" + dataUser.id            
        const config = {
          headers:{
            Authentication: "donos_do_codigo"
          }
        }
        const resposta = await axios.get(urlCadastrar, config)
        setPorcentagem(resposta.data.porcent)
        setConquistasConcluidas(resposta.data.userMedals)
        setConquistasBloqueadas(resposta.data.userNotHaveMedals)
      } catch(e)  {
        console.log(e)
      } finally {
        setVisible(false)
      }
  }
  console.log(conquistasBloqueadas)

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#004973'}}>
        <Loading visible={visible} />
          <ScrollView >
            <View style={{width: '80%', alignSelf: 'center', paddingBottom: 30}}>
            <Text style={{fontWeight: '400', fontSize: 30, color: '#fff'}}>Conquistas</Text>

            <View style={{width: '100%', height: 5, backgroundColor: '#005483', marginTop: 30}}>
              <View style={{width: '50%', height: '100%', backgroundColor: '#91BDD8'}}></View>
            </View>

            {conquistasBloqueadas.map((conquistasBloqueadas) => {
              return (
                <View style={{width: '100%', height: 130, backgroundColor: '#005483', borderRadius: 8, marginTop: 30, borderWidth: 3, borderColor: '#F9B84F'}}>
                <Text style={{fontSize: 18, fontWeight: '500', color: '#fff', alignSelf: 'center', marginTop: 10}}>{conquistasBloqueadas.title}</Text>
                <View style={{width: '85%', alignSelf: 'center', flexDirection: 'row', marginTop: 5, justifyContent: 'space-between'}}>
                  <Image style={{width: 60, height: 60, backgroundColor: 'black'}} source={{uri: conquistasBloqueadas.image_icon}}></Image>
                  <View style={{width: '85%'}}>
                    <Text style={{fontSize: 16, fontWeight: '500', color: '#fff', textAlign: 'center', marginLeft: 15, alignSelf: 'flex-start'}}>{conquistasBloqueadas.desc}</Text>
                  </View>
                </View>
                <View style={{width: '30%', height: 30, backgroundColor: '#F9B84F', borderRadius: 8, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: '-3.5%'}}>
                  <Text style={{fontSize: 13, fontWeight: '800'}}>INCOMPLETAS</Text>
                </View>
              </View>
              )
            })}

            {conquistasConcluidas.map((conquistasBloqueadas) => {
              return (
                <View style={{width: '100%', height: 130, backgroundColor: '#005483', borderRadius: 8, marginTop: 30, borderWidth: 3, borderColor: '#C69546'}}>
                <Text style={{fontSize: 18, fontWeight: '500', color: '#fff', alignSelf: 'center', marginTop: 10}}>{conquistasBloqueadas.title}</Text>
                <View style={{width: '85%', alignSelf: 'center', flexDirection: 'row', marginTop: 5, justifyContent: 'space-between'}}>
                  <Image style={{width: 60, height: 60, backgroundColor: 'black'}} source={{uri: conquistasBloqueadas.image_icon}}></Image>
                  <View style={{width: '85%'}}>
                    <Text style={{fontSize: 16, fontWeight: '500', color: '#fff', textAlign: 'center', marginLeft: 15, alignSelf: 'flex-start'}}>{conquistasBloqueadas.desc}</Text>
                  </View>
                </View>
                <View style={{width: '30%', height: 30, backgroundColor: '#C69546', borderRadius: 8, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: '-3.5%'}}>
                  <Text style={{fontSize: 13, fontWeight: '800', color: '#fff'}}>Completas</Text>
                </View>
              </View>
              )
            })}
            
              {/* <View stye={styles.DivConcluded} style={{borderBottomColor: 'black'}}>
                  <View style={ImageIncomplete}>
                      <View style={ImageConcluded} porcentagemWidth = {porcentagem} />
                  </View>
                  <Text styles={styles.TextConcluded}>{Math.round(porcentagem)}% concluido</Text>
              </View>  

              {conquistasBloqueadas.map((conquistasConcluidas) =>{
              return (
                  <View style={DivConquest} key={conquistasConcluidas.id}>
                      <View style={ImageConquests} source={{uri: conquistasConcluidas.image_icon}}></View>
                      <>DivTextConquests
                          <TitleConquest>{conquistasConcluidas.title}</TitleConquest>
                          <TextConquest>{conquistasConcluidas.desc}</TextConquest>
                      </>
                  </View>
              )
              })} 

              {conquistasConcluidas.map((conquistasBloqueadas) =>{
              return (
                  <DivConquestBloqueadas key={conquistasBloqueadas.id}>
                      <ImageConquestsBloqueadas source={{uri: conquistasBloqueadas.image_icon}}></ImageConquestsBloqueadas>
                      <DivTextConquestsBloqueadas>
                          <TitleConquestBloqueadas>{conquistasBloqueadas.title}</TitleConquestBloqueadas>
                          <TextConquestBloqueadas>{conquistasBloqueadas.desc}</TextConquestBloqueadas>
                      </DivTextConquestsBloqueadas>
                  </DivConquestBloqueadas>
              )
              })}     */}
            </View>
          </ScrollView> 
    </View>
  );
}
