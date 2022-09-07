import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import { SignIn } from '../screens/SignIn';
import { SignUp} from '../screens/SignUp';
import { Entry } from '../screens/Entry';
import { ResetPassword } from '../screens/ResetPassword';
import { StackRoutes } from './Stack.routes'
import { WaitingPlayer } from '../screens/WaitingPlayer';
import { teste } from '../screens/teste';
import { GameQuestion } from '../screens/GameQuestion';
import { GameAnswer } from '../screens/GameAnswer';
import { GameResult } from '../screens/GameResult';
export function AuthRoutes() {
  return (
      <Stack.Navigator>
            {/* <Stack.Screen
                name="teste"
                component={teste}
                options={{
                  title: '',
                  headerShown: false,
                  headerStyle: {backgroundColor: '#004973', borderWidth:0},
                }}
            /> */}
          {/* 
            <Stack.Screen
                name="GameResult"
                component={GameResult}
                options={{
                  title: '',
                  headerShown: false,
                  headerStyle: {backgroundColor: '#004973', borderWidth:0},
                }}
            />

            <Stack.Screen
                name="GameAnswer"
                component={GameAnswer}
                options={{
                  title: '',
                  headerShown: false,
                  headerStyle: {backgroundColor: '#004973', borderWidth:0},
                }}
            />

            <Stack.Screen
                name="GameQuestion"
                component={GameQuestion}
                options={{
                  title: '',
                  headerShown: false,
                  headerStyle: {backgroundColor: '#004973', borderWidth:0},
                }}
            />

            <Stack.Screen
                name="WaitingPlayer"
                component={WaitingPlayer}
                options={{
                  unmountOnBlur: true,
                  title: '',
                  headerTintColor: '#FFF',
                  headerShadowVisible: false,
                  headerStyle: {backgroundColor: '#005483', borderWidth:0},
                }}
            /> */}

            <Stack.Screen
                name="Entry"
                component={Entry}
                options={{
                  title: '',
                  headerShown: false,
                  headerStyle: {backgroundColor: '#004973', borderWidth:0},
                }}
            />

            <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
                title: '',
                headerTintColor: '#FFF',
                headerShadowVisible: false,
                headerStyle: {backgroundColor: '#004973', borderWidth:0},
              }}
            />  

            <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              title: '',
              headerTintColor: '#FFF',
              headerShadowVisible: false,
              headerStyle: {backgroundColor: '#004973', borderWidth:0},
            }}
            />

            <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{
                title: '',
                headerTintColor: '#FFF',
                headerShadowVisible: false,
                headerStyle: {backgroundColor: '#004973', borderWidth:0},
              }}
            /> 

            <Stack.Screen 
                name="Home"
                component={StackRoutes}
            />
      </Stack.Navigator>
  )
}

