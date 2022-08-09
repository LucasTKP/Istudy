import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';

export default function Loading({visible}) {
  return (
    <Modal transparent visible={visible}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(18, 103, 214, 0.315)'}}>            
            <ActivityIndicator size= {80} color={'#7BACC9'} animating={true} />
        </View>
    </Modal>
  );
}