import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Modal , TouchableOpacity, TextInput} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import { Home } from '../screens/Home';
import { AllConquest } from '../screens/AllConquest';
import { CreateNewDeck } from '../screens/CreateNewDeck';
import { ShowFlashCard } from '../screens/ShowFlashCard';
import { EndFlashCard } from '../screens/EndFlashCard';
import {EditDeck} from '../screens/EditDeck'
import {EditAnswer} from '../screens/editAnswer'
import {WaitingPlayer} from '../screens/WaitingPlayer'
import {GameQuestion} from '../screens/GameQuestion'
import {GameResult} from '../screens/GameResult'
import { FilterMaterial } from '../screens/FilterMaterial'
import { Tests } from '../screens/Tests'

import { Decks } from '../screens/Decks';
 

import { InsertFlashCard } from '../screens/InsertFlashCard';

export function StackRoutes() {
  return (

    <Stack.Navigator 
    initialRouteName="Home"
    
    >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: '',
              headerTransparent: true,
              headerShown: false
            }}
          />
          <Stack.Screen
            name="ShowFlashCard"
            component={ShowFlashCard}
            options={{
              unmountOnBlur: true,
              title: '',
              headerTintColor: '#FFF',
              headerShadowVisible: false,
              headerStyle: {backgroundColor: '#005483', borderWidth:0},
            }}
          />


        <Stack.Screen
            name="EndFlashCard"
            component={EndFlashCard}
            options={{
              title: '',
              headerShadowVisible: false,
              headerStyle: {backgroundColor: '#005483', borderWidth:0},
              headerLeft: null
            }}
          />

          <Stack.Screen
            name="Tests"
            component={Tests}
            options={{
              unmountOnBlur: true,
              title: 'Provas',
              headerTitleStyle: {color: '#004973'},
              headerTintColor: '#FFF',
              headerShown: true,
              headerShadowVisible: false,
              headerStyle: {backgroundColor: '#004973', borderWidth:0, height: 10},
            }}
          />

      <Stack.Screen
          name="InsertFlashCard"
          component={InsertFlashCard}
          options={{
            title: '',
            headerTintColor: '#FFF',
            headerShadowVisible: false,
            headerStyle: {backgroundColor: '#005483', borderWidth:0},
          }}
          />

        <Stack.Screen
          name="WaitingPlayer"
          component={WaitingPlayer}
          options={{
            title: '',
            headerTintColor: '#FFF',
            headerShadowVisible: false,
            headerStyle: {backgroundColor: '#005483', borderWidth:0},
          }}
          />
          
          <Stack.Screen
            name="AllConquest"
            component={AllConquest}
            options={{
              title: '',
              headerTintColor: '#FFF',
              headerShadowVisible: false,
              headerStyleInterpolator:{backgroundColor: 'black'},
              headerStyle: {backgroundColor: '#004973', borderWidth:0},
            }}
          />
     
          <Stack.Screen
          name="Decks"
          component={Decks}
          options={{
            unmountOnBlur: true,
            title: 'Seus',
            headerTintColor: '#FFF',
            headerShown: false,
            headerShadowVisible: false,
            headerStyle: {backgroundColor: '#005483', borderWidth:0},
          }}
          />

          <Stack.Screen
            name="GameQuestions"
            component={GameQuestion}
            options={{
              unmountOnBlur: true,
              title: 'Seus',
              headerTintColor: '#FFF',
              headerShown: false,
              headerShadowVisible: false,
              headerStyle: {backgroundColor: '#005483', borderWidth:0},
            }}
          />

        <Stack.Screen
            name="GameResult"
            component={GameResult}
            options={{
              unmountOnBlur: true,
              title: 'Seus',
              headerTintColor: '#FFF',
              headerShown: false,
              headerShadowVisible: false,
              headerStyle: {backgroundColor: '#005483', borderWidth:0},
            }}
          />

          <Stack.Screen
            name="CreateNewDeck"
            component={CreateNewDeck}
            options={{
              title: '',
              headerTintColor: '#FFF',
              headerShadowVisible: false,
              headerStyle: {backgroundColor: '#005483'},
            }}
            />

          <Stack.Screen
            name="EditDeck"
            component={EditDeck}
            options={{
              title: '',
              headerTintColor: '#FFF',
              headerShadowVisible: false,
              headerStyle: {backgroundColor: '#005483'},
            }}
            />

          <Stack.Screen
              name="EditAnswer"
              component={EditAnswer}
              options={{
                title: '',
                headerTintColor: '#FFF',
                headerShadowVisible: false,
                headerStyle: {backgroundColor: '#005483'},
              }}
          />

          <Stack.Screen
            name="FilterMaterial"
            component={FilterMaterial}
            options={{
              title: '',
              headerTintColor: '#FFF',
              headerShadowVisible: false,
              headerStyle: {backgroundColor: '#004973'},
            }}
          />
    </Stack.Navigator>
  )
}



