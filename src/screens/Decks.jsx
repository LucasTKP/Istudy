import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import styled from 'styled-components/native'

import * as Animatable from 'react-native-animatable'

import { useNavigation, UseNavigation} from '@react-navigation/native'

export function Decks() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>

            <Text style={styles.title}> Seus Decks</Text>


            <View style={styles.containerButton}>


            </View>

            <View style={styles.containerDecks}>


            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#004973',
    },
    containerButton:{

    },
    title:{

        fontSize: 30,
        fontWeight:'bold',
        color: '#FFFF', 
        marginTop: 20,
        marginLeft: 42,
    },
   






})
