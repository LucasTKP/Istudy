import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components/native'
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity  } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import useAxios from '../hooks/useAxios';

export function FilterMaterial({navigation, route}) {
    return (
        <View style={{width: '100%', height:'100%', backgroundColor: '#004973'}}>
          <ScrollView style={{width: '100%'}}>
            <View style={{width: '80%', alignSelf: 'center'}}>
                <Text style={{fontSize:30, fontWeight:'500', color:'#fff'}}>Inglês</Text>
                <Text style={{fontSize:15, fontWeight:'400', color:'#91BDD8'}}>Online</Text>

            </View>
          </ScrollView>
        </View>
      );
    }
