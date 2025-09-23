import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Divider } from '@rneui/themed';
import { FontAwesome } from "@react-native-vector-icons/fontawesome";
import Header from './components/Header';

export function About() {
    return (
        <>
            <Header title='Sobre' />
            <ScrollView style={{ flex: 1, padding: 10}}>
                        
                <View style={{ flexDirection: 'column', gap: 10, justifyContent: 'space-between'}}> 
                    
                    <Card containerStyle={{ marginHorizontal: 0 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#0f3762', fontSize: 18 }}>SAIBA MAIS</Text>
                        <Card.Divider />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <Text style={{ fontSize: 16 }}>
                                Entenda quais são os objetivos deste App e o que motivou o seu desenvolvimento.
                            </Text>
                        </View>
                    </Card>

                    <Divider />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 0, textAlign: 'left', color: '#0f3762' }}>
                        Sobre o Finanças Pro
                    </Text>

                    <Text style={{ fontSize: 18, marginTop: 5, textAlign: 'justify' }}>
                        O Finanças Pro surgiu para ajudar pessoas que enfrentam dificuldades em 
                        controlar seus recursos financeiros no dia a dia. Muitas vezes, gastos, 
                        recebimentos e compromissos acabam se perdendo na rotina, e é aí que o 
                        aplicativo entra como aliado.
                    </Text>

                    <Text style={{ fontSize: 18, marginTop: 5, textAlign: 'justify' }}>
                        Nosso objetivo é oferecer uma ferramenta simples, prática e acessível, 
                        que permita ao usuário organizar suas finanças pessoais de forma clara e rápida. {'\n'}
                    </Text>

                    <Divider />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 0, textAlign: 'left', color: '#0f3762' }}>
                        Principais características:
                    </Text>

                    <Text style={{ fontSize: 18, marginTop: 5, textAlign: 'left' }}>
                        <FontAwesome
                            name="check"
                            color="#348307ff"
                            size={20}
                            style={{ position: "absolute", left: 0 }}
                        />{' '}
                        Funciona sem necessidade de internet.
                    </Text>

                    <Text style={{ fontSize: 18, marginTop: 5, textAlign: 'left' }}>
                        <FontAwesome
                            name="check"
                            color="#348307ff"
                            size={20}
                            style={{ position: "absolute", left: 0 }}
                        />{' '}
                        Interface intuitiva e fácil de usar.
                    </Text>

                    <Text style={{ fontSize: 18, marginTop: 5, textAlign: 'left' }}>
                        <FontAwesome
                            name="check"
                            color="#348307ff"
                            size={20}
                            style={{ position: "absolute", left: 0 }}
                        />{' '}
                        Controle de entradas e saídas de recursos.
                    </Text>

                    <Text style={{ fontSize: 18, marginTop: 5, textAlign: 'left' }}>
                        <FontAwesome
                            name="check"
                            color="#348307ff"
                            size={20}
                            style={{ position: "absolute", left: 0 }}
                        />{' '}
                        Registros organizados.
                    </Text>

                    <Text style={{ fontSize: 18, marginTop: 5, textAlign: 'left' }}>
                        <FontAwesome
                            name="check"
                            color="#348307ff"
                            size={20}
                            style={{ position: "absolute", left: 0 }}
                        />{' '}
                        Gráficos e relatórios. {'\n'}
                    </Text>

                    <Divider />
                    <Text style={{ fontSize: 18, marginTop: 0, textAlign: 'justify' }}>
                        Com o Finanças Pro, você tem mais autonomia e tranquilidade para 
                        cuidar do que realmente importa: o controle do seu dinheiro. {'\n\n\n'}
                    </Text>

                </View>

            </ScrollView>
        </>
    );
}