import * as React from 'react';
import { View, Text, ScrollView, TextInput, FlatList} from 'react-native';
import { Button, Card, Input, Divider, Dialog } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from "@react-native-vector-icons/fontawesome";
import Header from './components/Header';
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { getDBConnection } from './db/db-connection';

export function Appellants() {

    const navigation = useNavigation(); 
    const ano = new Date().getFullYear();
    const [mes, setMes] = useState(0);

    const [despesa, setDespesa] = useState(0);
    const [ganho, setGanho] = useState(0);

    const [visivel, setVisivel] = useState(false);
    const [tituloDialog, setTituloDialog] = useState("");
    const [textoDialog, setTextoDialog] = useState("");

    const mudaDialog = () => {
        setVisivel(!visivel);
    };

    const buscarDespesa = async (mes:number) => {
        const db = await getDBConnection();
         
    }

    const salvarDespesa = async (tipo:string, despesa:string, recorrente:number, valor:number, descricao:string, ano:number, mes:number, dia:number, data_ocorrencia:string, data_registro:string) => {
        const db = await getDBConnection();
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO despesas (tipo, despesa, recorrente, valor, descricao, ano, mes, dia, data_ocorrencia, data_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        tipo,
                        despesa,
                        recorrente,
                        valor,
                        descricao,
                        ano,
                        mes,
                        dia,
                        data_ocorrencia,
                        data_registro
                    ],
                    (tx, results) => {
                        if (results.rowsAffected > 0) {
                            setDespesa(1);
                        } else {
                            setDespesa(0);
                        }
                    },
                    (tx, error) => {
                        setTituloDialog("Erro");
                        setTextoDialog(`Houve um erro: ${error.message || JSON.stringify(error)}`);
                        mudaDialog();
                    }
                );
            });
        } catch (err: any) {
            setTituloDialog("Erro");
            setTextoDialog(`Houve um erro: ${err.message || JSON.stringify(err)}`);
            mudaDialog();
        }       
    }

    const salvarGanho = async (tipo:string, despesa:string, recorrente:number, valor:number, descricao:string, ano:number, mes:number, dia:number, data_ocorrencia:string, data_registro:string) => {
        const db = await getDBConnection();
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO ganhos (tipo, recorrente, valor, descricao, ano, mes, dia, data_ocorrencia, data_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        tipo,
                        recorrente,
                        valor,
                        descricao,
                        ano,
                        mes,
                        dia,
                        data_ocorrencia,
                        data_registro
                    ],
                    (tx, results) => {
                        if (results.rowsAffected > 0) {
                            setGanho(1);
                        } else {
                            setGanho(0);
                        }
                    },
                    (tx, error) => {
                        setTituloDialog("Erro");
                        setTextoDialog(`Houve um erro: ${error.message || JSON.stringify(error)}`);
                        mudaDialog();
                    }
                );
            });
        } catch (err: any) {
            setTituloDialog("Erro");
            setTextoDialog(`Houve um erro: ${err.message || JSON.stringify(err)}`);
            mudaDialog();
        }       
    }
    

    const gerarRecorrentes = async () => {

    }

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
                        Escolha o mês
                    </Text>

                    <Picker
                        style={{backgroundColor: '#d4d6d8ff', height: 50}}
                        selectedValue={mes}
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
                    > 
                        Gerar recorrentes
                    </Button>

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