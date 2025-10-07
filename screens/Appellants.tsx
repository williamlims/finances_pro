import * as React from 'react';
import { View, Text, ScrollView, ActivityIndicator} from 'react-native';
import { Button, Card, Divider, Dialog } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import Header from './components/Header';
import {Picker} from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import { getDBConnection } from './db/db-connection';

export function Appellants() {

    const navigation = useNavigation(); 
    const [loading, setLoading] = useState(false);
    const [mes, setMes] = useState(0);

    const [habilitado, setHabilitado] = useState(false);
    const [visivel, setVisivel] = useState(false);
    const [tituloDialog, setTituloDialog] = useState("");
    const [textoDialog, setTextoDialog] = useState("");

    const mudaDialog = () => {
        setVisivel(!visivel);
    };

    const checkRecorrentesMesAtual = async () => {
        const db = await getDBConnection();
        const mesAtual = new Date().getMonth() + 1;
        const anoAtual = new Date().getFullYear();

        return new Promise<boolean>((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT COUNT(*) AS total FROM ganhos WHERE mes = ? AND ano = ? AND recorrente = ?',
                    [mesAtual, anoAtual, 1],
                    (_, results) => {
                        const ganhosCount = results.rows.item(0).total;
                        tx.executeSql(
                            'SELECT COUNT(*) AS total FROM despesas WHERE mes = ? AND ano = ? AND recorrente = ?',
                            [mesAtual, anoAtual, 1],
                            (_, results) => {
                                const despesasCount = results.rows.item(0).total;
                                resolve(ganhosCount > 0 || despesasCount > 0);
                            },
                            (_, error) => {
                                console.error('Erro ao verificar despesas:', error);
                                reject(error);
                                return true;
                            }
                        );
                    },
                    (_, error) => {
                        console.error('Erro ao verificar ganhos:', error);
                        reject(error);
                        return true;
                    }
                );
            });
        });
    };

    const getDespesasByMes = async (mesDespesas: number) => {
        const db = await getDBConnection();
        return new Promise<any[]>((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM despesas WHERE mes = ? AND ano = ? AND recorrente = ?",
                    [mesDespesas-1, new Date().getFullYear(), 1],
                    (_, results) => {
                        let rows = results.rows;
                        let data: any[] = [];
                        for (let i = 0; i < rows.length; i++) {
                            data.push(rows.item(i));
                        }
                        resolve(data);
                    },
                    (_, error) => {
                        reject(error);
                        return true;
                    }
                );
            });
        });
    };

    const getGanhosByMes = async (mesGanhos: number) => {
        const db = await getDBConnection();
        return new Promise<any[]>((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM ganhos WHERE mes = ? AND ano = ? AND recorrente = ?",
                    [mesGanhos-1, new Date().getFullYear(), 1],
                    (_, results) => {
                        let rows = results.rows;
                        let data: any[] = [];
                        for (let i = 0; i < rows.length; i++) {
                            data.push(rows.item(i));
                        }
                        resolve(data);
                    },
                    (_, error) => {
                        reject(error);
                        return true;
                    }
                );
            });
        });
    };

    const clonarDespesasParaMesAtual = async (mesDespesas: number) => {
        const despesasAntigas = await getDespesasByMes(mesDespesas);
        const db = await getDBConnection();

        const mesAtual = new Date().getMonth() + 1;
        const anoAtual = new Date().getFullYear();
        const diaAtual = new Date().getDate();
        const dataRegistro = new Date().toISOString();

        db.transaction((tx) => {
            despesasAntigas.forEach((d) => {
                tx.executeSql(
                    `INSERT INTO despesas 
                    (tipo, despesa, recorrente, valor, descricao, ano, mes, dia, data_ocorrencia, data_registro)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        d.tipo,
                        d.despesa,
                        d.recorrente,
                        d.valor,
                        d.descricao,
                        anoAtual,
                        mesAtual,
                        diaAtual,
                        `${anoAtual}-${mesAtual.toString()
                        .padStart(2, '0')}-${diaAtual.toString().padStart(2, '0')}`,
                        dataRegistro
                    ]
                );
            });
        });
    };

    const clonarGanhosParaMesAtual = async (mesFiltro: number) => {
        const ganhosAntigos = await getGanhosByMes(mesFiltro);
        const db = await getDBConnection();

        const mesAtual = new Date().getMonth() + 1;
        const anoAtual = new Date().getFullYear();
        const diaAtual = new Date().getDate();
        const dataRegistro = new Date().toISOString();

        db.transaction((tx) => {
            ganhosAntigos.forEach((g) => {
                tx.executeSql(
                    `INSERT INTO ganhos 
                    (tipo, recorrente, valor, descricao, ano, mes, dia, data_ocorrencia, data_registro)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        g.tipo,
                        g.recorrente,
                        g.valor,
                        g.descricao,
                        anoAtual,
                        mesAtual,
                        diaAtual,
                        `${anoAtual}-${mesAtual.toString()
                        .padStart(2, '0')}-${diaAtual.toString().padStart(2, '0')}`,
                        dataRegistro
                    ]
                );
            });
        });
    };
    
    const gerarRecorrentes = async () => {
        setLoading(true);
        clonarDespesasParaMesAtual(new Date().getMonth()+1);
        clonarGanhosParaMesAtual(new Date().getMonth()+1);
        setTituloDialog("Recorrentes Gerados");
        setTextoDialog("Os registros recorrentes foram gerados com sucesso!")
        setLoading(false);
        mudaDialog();
    }

    useEffect(() => {
        const verificar = async () => {
            const jaGerado = await checkRecorrentesMesAtual();
            setHabilitado(jaGerado);
        };

        verificar();
    }, []);
    
    return (
        <>
            <Header title='Recorrentes' />
            <ScrollView style={{ flex: 1, padding: 10}}>
            
                <View style={{ flexDirection: 'column', gap: 10, justifyContent: 'space-between'}}> 
                    
                    <Card containerStyle={{ marginHorizontal: 0 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#0f3762', fontSize: 18 }}>GERAR RECORRENTES</Text>
                        <Card.Divider />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <Text style={{ fontSize: 16 }}>
                                Nesta tela é possível gerar os registros recorrentes em lote, pois desta forma não é necessário registrar manualmente cada item.
                            </Text>
                        </View>
                    </Card>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5, textAlign: 'left' }}>
                        Mês atual
                    </Text>

                    <Picker
                        style={{backgroundColor: '#d4d6d8ff', height: 50}}
                        selectedValue={new Date().getMonth()+1}
                        enabled={false}
                        onValueChange={(itemValue, itemIndex) =>
                            setMes(itemValue)
                        }>
                        <Picker.Item label="Selecione..." value={0}/>
                        <Picker.Item label="Janeiro" value={1} />
                        <Picker.Item label="Fevereiro" value={2} />
                        <Picker.Item label="Março" value={3} />
                        <Picker.Item label="Abril" value={4} />
                        <Picker.Item label="Maio" value={5} />
                        <Picker.Item label="Junho" value={6} />
                        <Picker.Item label="Julho" value={7} />
                        <Picker.Item label="Agosto" value={8} />
                        <Picker.Item label="Setembro" value={9} />
                        <Picker.Item label="Outubro" value={10} />
                        <Picker.Item label="Novembro" value={11} />
                        <Picker.Item label="Dezembro" value={12} />
                    </Picker>

                    <Divider />

                    <Button 
                        size="lg"
                        buttonStyle={{ backgroundColor: '#191970' }}
                        onPress={gerarRecorrentes}
                        disabled={habilitado}
                    > 
                        Gerar recorrentes
                    </Button>

                    {loading && (
                        <ActivityIndicator size="large" color="#a52a2a" style={{ marginTop: 40 }}/>
                    )}

                    <Dialog
                        isVisible={visivel}
                        onBackdropPress={mudaDialog}
                        >
                        <Dialog.Title title={tituloDialog}/>
                        <Text>{textoDialog}</Text>
                        <Dialog.Actions>
                            <Dialog.Button title="OK" onPress={mudaDialog}/>
                        </Dialog.Actions>
                    </Dialog>

                </View>

            </ScrollView>
        </>
    );
}