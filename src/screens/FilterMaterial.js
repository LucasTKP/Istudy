import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components/native'
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity  } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import useAxios from '../hooks/useAxios';
import Loading from '../components/Loading'
import { Card } from '../components/card'

export function FilterMaterial({route, navigation}) {
    const {callAxios, answerAxios} = useAxios()
    const [visible, setVisible] = useState(false)
    const [filterCards, setFilterCards] = useState([])
    const {filter} = route.params

    useEffect(() => {
      async function cards() {
        try {
          setVisible(true)
          await callAxios('cards/all', '', 'get')
        } catch (e) {
          console.log(e)
        } finally {
          setVisible(false)
        }
      }

      cards()
    }, [])

    useEffect(() => {
      if(answerAxios.res) {
        const filtered = answerAxios.res.filter((e) => e.category[0].name == filter)
        setFilterCards(filtered)
      }
    }, [answerAxios, filter])


    return (
        <View style={{width: '100%', height:'100%', backgroundColor: '#004973'}}>
          <Loading visible={visible}/>
          <ScrollView style={{width: '100%'}}>
            <View style={{width: '80%', alignSelf: 'center'}}>
                <Text style={{fontSize:30, fontWeight:'500', color:'#fff'}}>{filter}</Text>
                <Text style={{fontSize:15, fontWeight:'400', color:'#91BDD8'}}>Online</Text>
            </View>
            {filterCards[0] ? filterCards.map((card) => {
              return <Card key={card.id} id={card.id} title={card.title} image={card.image_url} stars={card.stars}/>
            }) : <Text></Text>}
          </ScrollView>
        </View>
      );
    }
