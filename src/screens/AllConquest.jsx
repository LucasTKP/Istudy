import React, { useState, useEffect, useContext } from 'react';
import { Text, View,  ScrollView } from 'react-native';
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

  return (
    <Container>
        <Loading visible={visible} />
          <ScrollView >
            
              <DivConcluded style={{borderBottomColor: 'black'}}>
                  <ImageIncomplete>
                      <ImageConcluded  porcentagemWidth = {porcentagem} />
                  </ImageIncomplete>
                  <TextConcluded>{Math.round(porcentagem)}% concluido</TextConcluded>
              </DivConcluded>  

              {conquistasBloqueadas.map((conquistasConcluidas) =>{
              return (
                  <DivConquest key={conquistasConcluidas.id}>
                      <ImageConquests source={{uri: conquistasConcluidas.image_icon}}></ImageConquests>
                      <DivTextConquests>
                          <TitleConquest>{conquistasConcluidas.title}</TitleConquest>
                          <TextConquest>{conquistasConcluidas.desc}</TextConquest>
                      </DivTextConquests>
                  </DivConquest>
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
              })}    
                
          </ScrollView> 
    </Container>
  );
}

const Container = styled.View`
  background-color: #fff;
  align-items: center;
`

const DivConcluded = styled.View `
border: 3px solid white;
width: 100%;
height: 100px;
align-items: center;
justifyContent: center;
border-radius: 3px;
`
const ImageIncomplete = styled.View `
width: 150px;
border: 1px solid #C1C1C1;
`

const ImageConcluded = styled.View `
width: ${props => props.porcentagemWidth}%
border: 1px solid blue;
`

const TextConcluded = styled.Text `
font-size: 20px;
font-weight: bold;
`

const DivConquest = styled.View `
width: 100%;
height: 130px;
margin-top: 20px
flex-direction: row;
align-items: center;
justifyContent: center
border: 1px solid black;
`
const ImageConquests = styled.Image `
width:100px;
height:90%;
margin: 0 0 0 5px;
`
const DivTextConquests = styled.View `
text-align: center;
justifyContent: center;
align-items: center

`
const TitleConquest = styled.Text `
font-size: 20px;
font-weight: bold;
color: red;
height: 30px
`
const TextConquest = styled.Text `
font-size: 20px;
height: 85px;
width: 300px;
text-align: center;
`       

const DivConquestBloqueadas = styled.View `
width: 100%;
height: 130px;
margin-top: 20px
flex-direction: row;
align-items: center;
justifyContent: center
background-color: #D9D9D9
`
const ImageConquestsBloqueadas = styled.Image `
width:100px;
height:90%;
margin: 0 0 0 5px;
`
const DivTextConquestsBloqueadas = styled.View `
text-align: center;
justifyContent: center;
align-items: center
`
const TitleConquestBloqueadas = styled.Text `
font-size: 20px;
font-weight: bold;
color: black;
font-weight: 500;
height: 30px
`
const TextConquestBloqueadas = styled.Text `
font-size: 20px;
height: 85px;
width: 300px;
text-align: center;
`       