import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native'

export function Decks() {
    const navigation = useNavigation();
    return (
        <View style={styles.background}>
            
            
            <Text style={styles.text}>Seus decks</Text>


            <View style={styles.box}>
                <Image source={require('../../assets/imageDeck.png')}/>

            <TouchableOpacity style={{position: 'absolute', marginTop: 16, marginLeft: 22,}}>       
                <Image source={require('../../assets/flecha.png')}/>
            </TouchableOpacity> 
                <View style={styles.line}>

                    <Text style={styles.title}>Revolução Francesa</Text>
                    <TouchableOpacity style={styles.buttonPlay}>
                        <Image 
                        style={styles.imagePlay}
                        source={require('../../assets/iconPlay.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
           
        </View>
    );
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor: '#004973',
        paddingTop: 60
    },
    text:{
        marginTop: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFF',
        marginLeft:44,
    },
    box:{
        marginTop: 30,
        alignSelf: 'center',
        width: 295,
        height: 118,
        

    },
    line:{
        position: 'absolute',
        width: '100%',
        height: 44,
        backgroundColor: '#FFF',
        opacity: 0.6,
        bottom: '0%',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title:{
        color: '#23709D',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    buttonPlay:{
        position: 'absolute',
        width: 32,
        height: 32,
        backgroundColor: '#23709D',
        right: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        paddingVertical: 18,
        paddingHorizontal: 18,
    },



})
  