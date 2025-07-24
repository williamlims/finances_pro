import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

export function Test2() {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Teste 2</Text>
            <Button onPress={() => navigation.navigate('Test1')}>
                TESTE 1
            </Button>
        </View>
    );
}