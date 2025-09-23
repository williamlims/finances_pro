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
            <Header title='Registros' />
            <ScrollView style={{ flex: 1, padding: 10}}>
            
                <View style={{ flexDirection: 'column', gap: 10, justifyContent: 'space-between'}}> 
                    
                    <Card containerStyle={{ marginHorizontal: 0 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#0f3762', fontSize: 18 }}>REGISTROS GERAIS</Text>
                        <Card.Divider />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <Text style={{ fontSize: 16 }}>
                                Neste ambiente é possível acessar e alterar os registros de bens e todas as entradas e saídas de recursos financeiros.
                            </Text>
                        </View>
                    </Card>

                    <Button
                        size="lg"
                        onPress={() => navigation.navigate('ExpenseRecords')}
                        buttonStyle={{ justifyContent: "center", backgroundColor: '#9400d3' }}
                    >
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <FontAwesome
                                name="thumbs-down"
                                color="white"
                                size={30}
                                style={{ position: "absolute", left: 15 }}
                            />
                            <Text style={{ fontSize: 30, color: "white" }}>Despesas</Text>
                        </View>
                    </Button>

                    <Button
                        size="lg"
                        onPress={() => navigation.navigate('RecipeRecords')}
                        buttonStyle={{ justifyContent: "center", backgroundColor: '#9400d3' }}
                    >
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <FontAwesome
                                name="thumbs-up"
                                color="white"
                                size={30}
                                style={{ position: "absolute", left: 15 }}
                            />
                            <Text style={{ fontSize: 30, color: "white" }}>Ganhos</Text>
                        </View>
                    </Button>

                    <Button
                        size="lg"
                        onPress={() => navigation.navigate('GoodsRecords')}
                        buttonStyle={{ justifyContent: "center", backgroundColor: '#9400d3' }}
                    >
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <FontAwesome
                                name="home"
                                color="white"
                                size={30}
                                style={{ position: "absolute", left: 15 }}
                            />
                            <Text style={{ fontSize: 30, color: "white" }}>Bens</Text>
                        </View>
                    </Button>

                </View>

                
            </ScrollView>
        </>
    );
}