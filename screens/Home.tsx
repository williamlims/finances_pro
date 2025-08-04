import * as React from 'react';
import { View, Text } from 'react-native';
import { Button, Divider } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from "@react-native-vector-icons/fontawesome";
import HeaderHome from './components/HeaderHome';

export function Home() {
    const navigation = useNavigation();
    return (
        <>
        <HeaderHome title='Finanças Pro' />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Text>Home</Text>

            <Divider />
            
            <Button onPress={() => navigation.navigate('IndexRegister')}>
                Cadastrar <FontAwesome name="rocket" color="white" />
            </Button>

            <Divider />

            <Button onPress={() => navigation.navigate('Dashboard')}>
                Dashboard <FontAwesome name="rocket" color="white" />
            </Button>

            <Divider />

            <Button onPress={() => navigation.navigate('IndexLimits')}>
                Limites <FontAwesome name="rocket" color="white" />
            </Button>

            <Divider />

            <Button onPress={() => navigation.navigate('IndexRegisters')}>
                Registros <FontAwesome name="rocket" color="white" />
            </Button>

            <Divider />

            <Button onPress={() => navigation.navigate('Appellants')}>
                Recorrentes <FontAwesome name="rocket" color="white" />
            </Button>

            <Divider />

            <Button onPress={() => navigation.navigate('Data')}>
                Dados <FontAwesome name="rocket" color="white" />
            </Button>
            
        </View></>
    );
}