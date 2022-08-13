import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Logo from '../../assets/ImageAutentication/logo.svg'

import * as Animatable from 'react-native-animatable'


export function Entry({navigation}) {
    return (
        <View style={styles.background}>
           
            <View style={styles.containerLogo}>
                <Animatable.View delay={100}
                    animation="flipInY"
                    style={{ width: '100%' }}
                    resizeMode="contain"
                > 
                <Logo />
                </Animatable.View>
            </View>

            <View style={styles.containerForm}>
                <Text style={styles.title}>
                Seja bem-vindo ao Istudy
                seu aplicativo de estudo com
                flashcards!
                </Text>

                <View style={styles.containerButton}> 

                <TouchableOpacity style={styles.buttonSingUp}
                     onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSingIn}
                    onPress={() => navigation.navigate('SignIn')}>
                    
                    <Text style={styles.buttonText}>Logar</Text>
                </TouchableOpacity>

                

                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        backgroundColor: '#004973',
    },
    containerLogo:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 75,
    },
    containerForm:{
        flex:2,
        alignItems: 'center',
    },
    title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFF',
    marginLeft: 62,
    marginRight: 62,
    marginTop: 78,
    },
    containerButton:{
    flexDirection: "row",
    width: 260,
    marginTop: 120,
    justifyContent: 'center',
    backgroundColor: 'rgba(50, 50, 50, 0.48)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',

    },
    
    buttonSingUp:{
    marginTop: -2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007FC7',
    borderRadius: 20,
    height: 62,
    width: 130,
    borderWidth: 2,
    borderColor: '#fff'
    },
    buttonSingIn:{
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    width: 130,
    height: 60,
    },
    buttonText:{
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    alignSelf: 'center',
    },
})