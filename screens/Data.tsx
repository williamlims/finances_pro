import * as React from 'react';
import { View, Text, ScrollView, PermissionsAndroid, Platform, ActivityIndicator } from 'react-native';
import { Button, Card, Divider, Dialog } from '@rneui/themed';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from "@react-native-vector-icons/fontawesome";
import Header from './components/Header';
import { useState } from 'react';
import { generatePDF } from 'react-native-html-to-pdf';
import { getDBConnection } from './db/db-connection';

export function Data() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const [gastosMes, setGastosMes] = useState(0);
    const [gastosAno, setGastosAno] = useState(0);
    const [ganhosMes, setGanhosMes] = useState(0);
    const [ganhosAno, setGanhosAno] = useState(0);
    const [bensTotal, setBensTotal] = useState(0);

    const [mes, setMes] = useState(0);
    const [ano, setAno] = useState(0)

    const toggleDialog = () => {
        setVisible(!visible);
    };

    async function createPDF() {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
        }

        setLoading(true);

        const formatBRL = (v:number) =>
            new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(v);

        const htmlContent = `
            <html>
                <head>
                <meta charset="utf-8"/>
                <style>
                    body { font-family: Arial, sans-serif; padding:20px; }
                    h1 { text-align:center; color:#0f3762; }
                    table { width:100%; border-collapse:collapse; margin-top:20px; }
                    th, td { border:1px solid #ddd; padding:10px; text-align:left; }
                    th { background:#f5f5f5; }
                    .valor { font-weight:bold; color:#111; }
                </style>
                </head>
                <body>
                    <h1>Relatório Financeiro</h1>
                    <table>
                        <tr><th>Descrição</th><th>Valor</th></tr>
                        <tr><td>Gastos no mês atual</td><td class="valor">${formatBRL(gastosMes)}</td></tr>
                        <tr><td>Gastos no ano</td><td class="valor">${formatBRL(gastosAno)}</td></tr>
                        <tr><td>Ganhos no mês atual</td><td class="valor">${formatBRL(ganhosMes)}</td></tr>
                        <tr><td>Ganhos no ano</td><td class="valor">${formatBRL(ganhosAno)}</td></tr>
                        <tr><td>Valor total de bens</td><td class="valor">${formatBRL(bensTotal)}</td></tr>
                    </table>
                    <p style="margin-top:30px; font-size:12px; color:#555;">
                        Gerado em ${new Date().toLocaleString('pt-BR')}
                    </p>
                </body>
            </html>
        `;

        let options = {
            html: htmlContent,
            fileName: 'relatorio',
            directory: 'Documents',
            base64: true,
        };

        let results = await generatePDF(options);
        console.log(results.filePath);

        navigation.navigate('PDF', { path: results.filePath });

        setLoading(false);

        setVisible(!visible);
    }

    useFocusEffect(() => {

        const data = new Date();
        const mes_temp = data.getMonth() + 1;
        const ano_temp = data.getFullYear();
        setMes(mes_temp);
        setAno(ano_temp);

        const getGastosMes = async () => {
            const db = await getDBConnection();
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT SUM(valor) AS gastos FROM despesas WHERE mes = ? AND ano = ?',
                    [mes, ano],
                    (tx, results) => {
                        setGastosMes(results.rows.item(0).gastos);
                    },
                    (tx, error) => {
                        console.error('Erro ao acessar o banco de dados:', error);
                    }
                );
            });
        }

        const getGastosAno = async () => {
            const db = await getDBConnection();
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT SUM(valor) AS gastos FROM despesas WHERE ano = ?',
                    [ano],
                    (tx, results) => {
                        setGastosAno(results.rows.item(0).gastos);
                    },
                    (tx, error) => {
                        console.error('Erro ao acessar o banco de dados:', error);
                    }
                );
            });
        }

        const getGanhosMes = async () => {
            const db = await getDBConnection();
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT SUM(valor) AS ganhos FROM ganhos WHERE mes = ? AND ano = ?',
                    [mes, ano],
                    (tx, results) => {
                        setGanhosMes(results.rows.item(0).ganhos);
                    },
                    (tx, error) => {
                        console.error('Erro ao acessar o banco de dados:', error);
                    }
                );
            });
        }

        const getGanhosAno = async () => {
            const db = await getDBConnection();
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT SUM(valor) AS ganhos FROM ganhos WHERE ano = ?',
                    [ano],
                    (tx, results) => {
                        setGanhosAno(results.rows.item(0).ganhos);
                    },
                    (tx, error) => {
                        console.error('Erro ao acessar o banco de dados:', error);
                    }
                );
            });
        }

        const getBensTotal = async () => {
            const db = await getDBConnection();
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT SUM(valor) AS total FROM bens',
                    [],
                    (tx, results) => {
                        setBensTotal(results.rows.item(0).total);
                    },
                    (tx, error) => {
                        console.error('Erro ao acessar o banco de dados:', error);
                    }
                );
            });
        }

        getGastosMes();
        getGastosAno();
        getGanhosMes();
        getGanhosAno();
        getBensTotal();
    });

    return (
        <>
            <Header title='Dados' />
            <ScrollView style={{ flex: 1, padding: 10}}>
                        
                <View style={{ flexDirection: 'column', gap: 10, justifyContent: 'space-between'}}> 
                    
                    <Card containerStyle={{ marginHorizontal: 0 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#0f3762', fontSize: 18 }}>GERAR RELATÓRIO</Text>
                        <Card.Divider />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <Text style={{ fontSize: 16 }}>
                                Nesta tela é possível gerar o relatório com a sua situação financeira baseado nos registros. É importante que as informações cadastradas reflitam a sua realidade financeira.
                            </Text>
                        </View>
                    </Card>

                    <Divider />

                    <Button
                        size="lg"
                        onPress={createPDF}
                        buttonStyle={{ justifyContent: "center", backgroundColor: '#a52a2a' }}
                    >
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <FontAwesome
                                name="download"
                                color="white"
                                size={30}
                                style={{ position: "absolute", left: 15 }}
                            />
                            <Text style={{ fontSize: 30, color: "white" }}>Gerar relatório</Text>
                        </View>
                    </Button>
                    
                    {loading && (
                        <ActivityIndicator size="large" color="#a52a2a" style={{ marginTop: 40 }}/>
                    )}

                    <Dialog
                        isVisible={visible}
                        onBackdropPress={toggleDialog}
                        >
                        <Dialog.Title title="Relatório Gerado"/>
                        <Text>O relatório foi gerado com sucesso.</Text>
                        <Dialog.Actions>
                            <Dialog.Button title="OK" onPress={toggleDialog}/>
                        </Dialog.Actions>
                    </Dialog>

                </View>

            </ScrollView>
        </>
    );
}