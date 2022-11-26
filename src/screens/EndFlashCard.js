import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import  Flag from '../../assets/ImagePages/flag.svg'
import  IconCorrect  from '../../assets/ImageIcons/correct.svg'
import  IconIncorrect  from '../../assets/ImageIcons/incorrect.svg'
import  Iconclock  from '../../assets/ImageIcons/iconClock.svg'
import  Refresh from '../../assets/ImageIcons/refresh.svg'



export function EndFlashCard({ route, navigation  }) {
  return (
    <View style={styles.Container}>
        <View style={{width:'70%'}} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.Title}>Revolução Francesa</Text>
                <Flag />
            </View>

            <Text style={styles.TextResults}>Resultados</Text>
            <View style={{width: 40, height:2, backgroundColor: '#D7E3EA', marginTop: 5, marginBottom: 20}}></View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>
                <View style={styles.DivResults}>
                    <Text style={{fontSize: 24, color: '#D7E3EA'}}>{route.params.erros}</Text>
                    <View style={styles. Stripe}></View>
                    <IconIncorrect />
                </View>

                <View style={styles.DivResults}>
                    <Text style={{fontSize: 24, color: '#D7E3EA'}}>{route.params.acertos}</Text>
                    <View style={styles. Stripe}></View>
                    <IconCorrect />
                </View>

                <View style={styles.DivResults}>
                    <Text style={{fontSize: 22, color: '#D7E3EA'}}>{route.params.tempo}</Text>
                    <View style={styles. Stripe}></View>
                    <Iconclock />
                </View>
            </View>
            <Text style={styles.TextResults}>Recomendações</Text>
            <View style={{width: 40, height:2, backgroundColor: '#D7E3EA', marginTop: 5, marginBottom: 20}}></View>

        <View style={{flexDirection: 'row', width: 235, height: 211,}}>
            <View style={styles.DivFlashRecomendation}>
                <Image style={styles.ImageFlashCard}/>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop:  10}}>
                    <Text style={{ fontSize: 15, color: '#F5F5F5'}}>Revolução Francesa</Text>
                    <View style={styles.FlashCardDificulty}>
                        <Text style={{fontSize: 8, paddingLeft: 2}}>🔴</Text>
                        <Text style={{fontSize: 8}}>🟡</Text>
                        <Text style={{fontSize: 8, paddingRight: 2}}>🟢</Text>
                    </View>
                </View>
                    <View style={{marginTop: 10, flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', width: 60, justifyContent: 'space-between'}} >

                            <View style={styles.DivDataDecks}>
                                <Text>⭐</Text>
                                <Text style={{fontWeight: '800'}}>10</Text>
                            </View>

                            <View style={styles.DivDataDecks}>
                                <Text>🕓</Text>
                                <Text style={{fontWeight: '800'}}>10</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.ButtonJogar}>
                            <Text style={{color: 'white', fontSize: 20}}> Jogar</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </View>
                <TouchableOpacity onPress={() => navigation.navigate('ShowFlashCard', route.params.idDeck)} style={styles.ButtonRefresh}>
                <Refresh />
                </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    Container: { 
      backgroundColor:'#005483', 
      width:'100%', 
      height:'100%', 
      alignItems: 'center',
    },
    Title: {
        color: '#fff', 
        fontSize: 30, 
        width:151, 
        fontWeight: '500'
      }, 
    TextResults: {
        color: '#D7E3EA',
        fontSize: 20,
    }, 
    DivResults: {
        width: 70, 
        height: 100, 
        backgroundColor: '#23709D', 
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    Stripe: {
        width: 50, 
        height: 5, 
        backgroundColor: '#004973', 
        marginTop: 3, 
        marginBottom: 8
    }, 
    DivFlashRecomendation: {
        width: 235,
        height: 211,
        backgroundColor: '#23709D',
        borderRadius: 20,
        position: 'absolute',
    },
    DivFlashRecomendation2: {
        width: 235,
        height: 211,
        backgroundColor: '#23709D',
        borderRadius: 20,
        position: 'absolute',
        marginLeft: 40,

    },
    ImageFlashCard: {
        width: 235,
        height: 120,
        backgroundColor: 'black',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    }, 
    FlashCardDificulty: {
        width: 40, 
        height: 16, 
        backgroundColor: '#4B82A3', 
        borderRadius: 20, 
        justifyContent: 'space-between', 
        alignItems:'center', 
        flexDirection: 'row'
    }, 
    DivDataDecks:{
        width: 25, 
        height: 45, 
        borderRadius: 10, 
        backgroundColor: '#4B82A3', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    ButtonJogar: {
        width: 77, 
        height: 31, 
        backgroundColor: '#005483', 
        borderRadius: 10, 
        borderWidth: 2, 
        borderColor: '#007FC7', 
        justifyContent: 'center', 
        alignItems: 'center'
    } 
    ,
    ButtonRefresh: { 
        width: 90, 
        height: 60, 
        backgroundColor: '#005483', 
        borderWidth: 2, 
        borderColor: '#7BACC9', 
        alignSelf: 'center', 
        marginTop: 20, 
        borderRadius: 10, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
})
