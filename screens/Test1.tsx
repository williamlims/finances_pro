import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

export function Test1() {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Test 1</Text>
            <Button onPress={() => navigation.navigate('Test2')}>
                TESTE 2
            </Button>
        </View>
    );
}