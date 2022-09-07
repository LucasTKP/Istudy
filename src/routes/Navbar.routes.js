import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
const Tab = createBottomTabNavigator()

import { CreateNewDeck } from '../screens/CreateNewDeck';
import { ShowFlashCard } from '../screens/ShowFlashCard';
import { Ranks } from '../screens/Ranks';

import { StackRoutes } from './Stack.routes'

import { Decks } from '../screens/Decks'


import Home from '../../assets/ImageNavBar/home.svg'
import Pen from '../../assets/ImageNavBar/pen.svg'
import Books from '../../assets/ImageNavBar/books.svg'
import Rank from '../../assets/ImageNavBar/rank.svg'
import Calendar from '../../assets/ImageNavBar/calendar.svg'

export function NavRoutes() {
  const [actionBack, setActionBack] = React.useState(false)

  
  return (
      <Tab.Navigator
        initialRouteName="StackHome"  
        backBehavior='history'
            screenOptions={({ route }) => ({
                tabBarIcon: ({focused}) => {
                    if (route.name === 'StackHome') {
                      setActionBack(false)
                      return <Home />
                    } else if (route.name === 'Criar') {
                        setActionBack(true)
                        return <Pen />
                    } else if (route.name === 'Seus') {
                        setActionBack(true)
                        return <Books />
                    } else if (route.name === 'Rank') {
                        setActionBack(true)
                        return <Rank />
                    } else if (route.name === 'Provas') {
                        setActionBack(true)
                        return<Calendar />
                    }
                },
                tabBarStyle: {
                    backgroundColor: '#91BDD8',
                    height: 70,
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    marginTop: -10,
                    marginBottom: 5
                },
                tabBarHideOnKeyboard:"true",
                tabBarActiveTintColor: '#4B82A3',
                tabBarInactiveTintColor: '#23709D',
            }
        )}
      >

    <Tab.Screen
          name="Provas"
          component={ShowFlashCard}
          options={{
            unmountOnBlur: true,
            title: 'Provas',
            headerTintColor: '#FFF',
            headerShown: false,
            headerShadowVisible: false,
            headerStyle: {backgroundColor: '#005483', borderWidth:0},
          }}
        />
        

        <Tab.Screen
            name="Seus"
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
          

        <Tab.Screen
          name="StackHome"
          component={StackRoutes}
          options={{
            title: '',
            headerTransparent: true,
            headerShown: false
          }}
        />

        <Tab.Screen
          name="Criar"
          component={CreateNewDeck}
          options={{
            unmountOnBlur: true,
            title: 'Criar',
            headerTintColor: '#FFF',
            headerShadowVisible: false,
            headerStyle: {backgroundColor: '#005483'},
            headerTitleStyle: {color: '#005483'},
            unmountOnBlur: true,
          }}
          />

        <Tab.Screen
          name="Rank"
          component={Ranks}
          options={{
            title: 'Rank',
            headerTintColor: '#FFF',
            headerShadowVisible: false,
            headerStyle: {backgroundColor: '#004973'},
            headerTitleStyle: {color: '#004973'},
            unmountOnBlur: true,
          }}
          />

      </ Tab.Navigator>
  )
}



