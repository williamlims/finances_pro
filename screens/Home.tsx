import * as React from 'react';
import { View, Text, StyleSheet, ScrollView  } from 'react-native';
import { Button, Card } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from "@react-native-vector-icons/fontawesome";
import HeaderHome from './components/HeaderHome';

export function Home() {
    const navigation = useNavigation();
    return (
        <>
            <HeaderHome title='Finanças Pro' />
            <ScrollView style={{ flex: 1, padding: 10}}>
                <Card containerStyle={{ marginHorizontal: 5 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#0f3762', fontSize: 18 }}>RESUMO DO MÊS DE SETEMBRO</Text>
                    <Card.Divider />
                    <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'space-between'}}>
                        <Text>
                            <FontAwesome name="arrow-up" color="blue" />{' '}
                            Entradas:{' '}
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(8500.00)}
                        </Text>
                        <Text>Saídas:{' '}
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(1999.99)}{' '}
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
    flex: 1, // ocupa a tela inteira
    padding: 10,
  },
  row: {
    flex: 1, // faz a linha ocupar o espaço todo
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1, // cada botão ocupa metade da linha
    margin: 5,
  },
  button: {
    flex: 1, // botão cresce dentro do espaço
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