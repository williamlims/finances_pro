import * as React from 'react';
import { View, Text, StyleSheet, ScrollView  } from 'react-native';
import { Button, Card } from '@rneui/themed';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from "@react-native-vector-icons/fontawesome";
import { useState } from 'react';
import HeaderHome from './components/HeaderHome';
import { getDBConnection } from './db/db-connection';

export function Home() {
    const navigation = useNavigation();
    const [entrada, setEntrada] = useState(0);
    const [saida, setSaida] = useState(0);
    const [mesLabel, setMesLabel] = useState("");
    const [mes, setMes] = useState(0);
    const [ano, setAno] = useState(0)

    useFocusEffect(() => {
        const defineMesAno = () => {
            const data = new Date();
            const mes_temp = data.getMonth() + 1;
            const ano_temp = data.getFullYear();
            setMes(mes_temp);
            setAno(ano_temp);
            switch (mes_temp) {
                case 1:
                    setMesLabel("JANEIRO");
                    break;
                case 2:
                    setMesLabel("FEVEREIRO");
                    break;
                case 3:
                    setMesLabel("MARÇO");
                    break;
                case 4:
                    setMesLabel("ABRIL");
                    break;
                case 5:
                    setMesLabel("MAIO");
                    break;
                case 6:
                    setMesLabel("JUNHO");
                    break;
                case 7:
                    setMesLabel("JULHO");
                    break;
                case 8:
                    setMesLabel("AGOSTO");
                    break;
                case 9:
                    setMesLabel("SETEMBRO");
                    break;
                case 10:
                    setMesLabel("OUTUBRO");
                    break;
                case 11:
                    setMesLabel("NOVEMBRO");
                    break;
                case 12:
                    setMesLabel("DEZEMBRO");
                    break;
                default:
                    setMesLabel("ERROR");
                    break;
            }
        }
        const getEntradas = async () => {
            const db = await getDBConnection();
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT SUM(valor) AS entradas FROM ganhos WHERE mes = ? AND ano = ?',
                    [mes, ano],
                    (tx, results) => {
                        setEntrada(results.rows.item(0).entradas);
                    },
                    (tx, error) => {
                        console.error('Erro ao acessar o banco de dados:', error);
                    }
                );
            });
        }

        const getSaidas = async () => {
            const db = await getDBConnection();
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT SUM(valor) AS saidas FROM despesas WHERE mes = ? AND ano = ?',
                    [mes, ano],
                    (tx, results) => {
                        setSaida(results.rows.item(0).saidas);
                    },
                    (tx, error) => {
                        console.error('Erro ao acessar o banco de dados:', error);
                    }
                );
            });
        }

        defineMesAno();
        getEntradas();
        getSaidas();
    });

    return (
        <>
            <HeaderHome title='Finanças Pro' />
            <ScrollView style={{ flex: 1, padding: 10}}>
                <Card containerStyle={{ marginHorizontal: 5 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#0f3762', fontSize: 18 }}>RESUMO DO MÊS DE {mesLabel}</Text>
                    <Card.Divider />
                    <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'space-between'}}>
                        <Text>
                            <FontAwesome name="arrow-up" color="blue" />{' '}
                            Entradas:{' '}
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(entrada)}
                        </Text>
                        <Text>Saídas:{' '}
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(saida)}{' '}
                            <FontAwesome name="arrow-down" color="red" />
                        </Text>
                    </View>
                </Card>
                <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', marginTop: 10 }}>
                    <Button
                        onPress={() => navigation.navigate('IndexRegister')}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={{
                            backgroundColor: '#007bff',
                            borderRadius: 10,
                            aspectRatio: 1,
                        }}
                    >
                        <View style={styles.content}> 
                            <FontAwesome name="save" color="white" size={30}/>
                            <Text style={styles.text}>Cadastrar</Text>
                        </View>
                    </Button>
                    <Button
                        onPress={() => navigation.navigate('Dashboard')}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={{
                            backgroundColor: '#28a745',
                            borderRadius: 10,
                            aspectRatio: 1,
                        }}
                    >
                        <View style={styles.content}> 
                            <FontAwesome name="line-chart" color="white" size={30}/>
                            <Text style={styles.text}>Dashboard</Text>
                        </View>
                    </Button>
                </View>
                <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', marginTop: 10 }}>
                    <Button
                        onPress={() => navigation.navigate('IndexLimits')}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={{
                            backgroundColor: '#daa520',
                            borderRadius: 10,
                            aspectRatio: 1,
                        }}
                    >
                        <View style={styles.content}> 
                            <FontAwesome name="sliders" color="white" size={30}/>
                            <Text style={styles.text}>Limites</Text>
                        </View>
                    </Button>
                    <Button
                        onPress={() => navigation.navigate('IndexRegisters')}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={{
                            backgroundColor: '#9400d3',
                            borderRadius: 10,
                            aspectRatio: 1,
                        }}
                    >
                        <View style={styles.content}> 
                            <FontAwesome name="bars" color="white" size={30}/>
                            <Text style={styles.text}>Registros</Text>
                        </View>
                    </Button>
                </View>
                <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', marginTop: 10 }}>
                    <Button
                        onPress={() => navigation.navigate('Appellants')}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={{
                            backgroundColor: '#191970',
                            borderRadius: 10,
                            aspectRatio: 1,
                        }}
                    >
                        <View style={styles.content}> 
                            <FontAwesome name="retweet" color="white" size={30}/>
                            <Text style={styles.text}>Recorrentes</Text>
                        </View>
                    </Button>
                    <Button
                        onPress={() => navigation.navigate('Data')}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={{
                            backgroundColor: '#a52a2a',
                            borderRadius: 10,
                            aspectRatio: 1,
                        }}
                    >
                        <View style={styles.content}> 
                            <FontAwesome name="database" color="white" size={30}/>
                            <Text style={styles.text}>Dados</Text>
                        </View>
                    </Button>
                </View>
                <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', marginTop: 10 }}>
                    <Button
                        onPress={() => navigation.navigate('About')}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={{
                            backgroundColor: '#696969',
                            borderRadius: 10,
                            aspectRatio: 1,
                        }}
                    >
                        <View style={styles.content}> 
                            <FontAwesome name="info-circle" color="white" size={30}/>
                            <Text style={styles.text}>Sobre</Text>
                        </View>
                    </Button>
                    <View style={{ flex: 1, maxWidth: 200, margin: 5, }}/>
                </View>
                <Text>{"\n\n\n\n"}</Text>
                
            </ScrollView >
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    row: {
        flex: 1,
        flexDirection: "row",
    },
    buttonContainer: {
        flex: 1,
        margin: 5,
    },
    button: {
        flex: 1,
        borderRadius: 10,
    },
    content: {
        alignItems: "center",
    },
    text: {
        marginTop: 5,
        color: "white",
        fontWeight: "bold",
    },
});