import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Card } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from "@react-native-vector-icons/fontawesome";
import Header from '../components/Header';

export function Index() {

    const navigation = useNavigation();
    
    return (
        <>
            <Header title='Limites' />
            <ScrollView style={{ flex: 1, padding: 10}}>
                                    
                <View style={{ flexDirection: 'column', gap: 10, justifyContent: 'space-between'}}> 
                    
                    <Card containerStyle={{ marginHorizontal: 0 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#0f3762', fontSize: 18 }}>AJUSTE DE LIMITES</Text>
                        <Card.Divider />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <Text style={{ fontSize: 16 }}>
                                Nesta tela é possível ajustar os limites mensais e anuais de gastos. Isso significa que você receberá um alerta quando ultrapassar este limite.
                            </Text>
                        </View>
                    </Card>

                    <Button
                        size="lg"
                        onPress={() => navigation.navigate('SetMonthLimit')}
                        buttonStyle={{ justifyContent: "center", backgroundColor: '#daa520' }}
                    >
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <FontAwesome
                                name="calendar-o"
                                color="white"
                                size={30}
                                style={{ position: "absolute", left: 15 }}
                            />
                            <Text style={{ fontSize: 30, color: "white" }}>Limite mensal</Text>
                        </View>
                    </Button>

                    <Button
                        size="lg"
                        onPress={() => navigation.navigate('SetAnnualLimit')}
                        buttonStyle={{ justifyContent: "center", backgroundColor: '#daa520' }}
                    >
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <FontAwesome
                                name="calendar"
                                color="white"
                                size={30}
                                style={{ position: "absolute", left: 15 }}
                            />
                            <Text style={{ fontSize: 30, color: "white" }}>Limite anual</Text>
                        </View>
                    </Button>


                </View>
       
            </ScrollView>
        </>
    );
}