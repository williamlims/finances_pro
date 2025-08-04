import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from "@react-native-vector-icons/fontawesome";
import Header from '../components/Header';

export function Index() {
    const navigation = useNavigation();
    return (
        <>
        <Header title='Limites' />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            
        </View></>
    );
}