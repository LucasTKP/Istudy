import * as React from 'react';
import {Home} from './Home'
import { AllConquest } from './AllConquest';
import { CreateNewDeck } from './CreateNewDeck';
import { Profile } from './Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Alert } from 'react-native-web';
import { Entypo, Feather,  MaterialIcons, Ionicons, FontAwesome5} from '@expo/vector-icons'




export function TabBar() {
    const Tab = createBottomTabNavigator();

    return(
        <Tab.Navigator 
        initialRouteName='Home'
        backBehavior='history'
        
        screenOptions={{
            tabBarStyle: { position: 'absolute', backgroundColor: '#91BDD8'},
            tabBarActiveTintColor: '#fff',
            tabStyle:{
                paddingBottom: 5,
                paddingTop: 5,
                marginTop: 10,
            }
          }}
        >
        <Tab.Screen 
        name="Perfil" 
        component={Profile} 
        options={{
            headerTransparent: true,
            headerShown: false,
            tabBarIcon: ({size ,color}) => (
                <MaterialIcons name='account-circle'size={size} color={color} />
            )
        }}
        />


        <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
            headerTransparent: true,
            headerShown: false,
            tabBarIcon: ({size ,color}) => (
                <Entypo name='home'size={size} color={color} />
            )
        }}
        />

        <Tab.Screen 
        name="Conquistas" 
        component={AllConquest} 
        options={{
            headerTransparent: true,
            headerShown: false,
            tabBarIcon: ({size ,color}) => (
                <FontAwesome5 name='medal'size={size} color={color} />
            )
        }}
        />


        <Tab.Screen 
        name="Criar" 
        component={CreateNewDeck} 
        options={{
            headerTransparent: true,
            headerShown: false,
            tabBarIcon: ({size ,color}) => (
                <Ionicons name='ios-create-outline'size={size} color={color} />
            )
        }}
        />

        </Tab.Navigator>     
    )
}

