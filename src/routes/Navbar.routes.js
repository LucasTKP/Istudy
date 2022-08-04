import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator()

import { Image } from 'react-native';
import { Profile } from '../screens/Profile';
import { CreateNewDeck } from '../screens/CreateNewDeck';
import { ShowFlashCard } from '../screens/ShowFlashCard';
import { Filter } from '../screens/Filter'

import { StackRoutes } from './Stack.routes'

import Home from '../../assets/ImageNavBar/home.png'
import pen from '../../assets/ImageNavBar/pen.png'
import books from '../../assets/ImageNavBar/books.png'
import rank from '../../assets/ImageNavBar/rank.png'
import calendar from '../../assets/ImageNavBar/calendar.png'

export function NavRoutes() {
  return (
      <Tab.Navigator
        initialRouteName="StackHome"
            screenOptions={({ route }) => ({
                tabBarIcon: ({focused}) => {
                    if (route.name === 'StackHome') {
                        return <Image source={Home} style={{marginBottom: 20}}/>
                    } else if (route.name === 'Criar') {
                        let color = focused ?  '#4B82A3' : '#23709D'
                        return <Image source={pen} style={{tintColor: color}} />
                    } else if (route.name === 'Seus') {
                        let color = focused ?  '#4B82A3' : '#23709D'
                        return <Image source={books} style={{tintColor: color}}/>
                    } else if (route.name === 'Rank') {
                        let color = focused ?  '#4B82A3' : '#23709D'
                        return <Image source={rank} style={{tintColor: color}}/>
                    } else if (route.name === 'Provas') {
                        let color = focused ?  '#4B82A3' : '#23709D'
                        return <Image source={calendar} style={{tintColor: color}}/>
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
        />

        <Tab.Screen
            name="Seus"
            component={Profile}
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
            headerTransparent: true,
            headerShown: false
          }}
          />

        <Tab.Screen
            name="Rank"
            component={Filter}
          />

      </ Tab.Navigator>
  )
}



