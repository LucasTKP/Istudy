import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';

export default function Loading({visible}) {
  return (
    <Modal transparent visible={visible}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.67)'}}>            
            <ActivityIndicator size= {80} color={'blue'} animating={true} />
        </View>
    </Modal>
  );
}