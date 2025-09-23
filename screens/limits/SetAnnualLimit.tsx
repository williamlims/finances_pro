import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Card, Dialog } from '@rneui/themed';
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';
import Header from '../components/Header';
import { getDBConnection } from '../db/db-connection';

export function SetAnnualLimit() {

    const [limite, setLimite] = useState(0);
    const [limiteAtual, setLimiteAtual] = useState(0);

    const [visivel, setVisivel] = useState(false);
    const [tituloDialog, setTituloDialog] = useState("");
    const [textoDialog, setTextoDialog] = useState("");

    const mudaDialog = () => {
        setVisivel(!visivel);
    };

    const getResult = async () => {
        const db = await getDBConnection();
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM limites',
                [],
                (tx, results) => {
                if (results.rows.length > 0) {
                    const anual = results.rows.item(0).anual;
                    setLimiteAtual(anual);
                }
                },
                (tx, error) => {
                    console.error('Erro ao acessar o banco de dados:', error);
                    setLimite(100);
                }
            );
        });
    }

    getResult();

    const atualizarLimite = async () => {
                    
        if (limite == 0) {
            setTituloDialog("Campo Limite");
            setTextoDialog("Escolha um novo valor antes de salvar.");
            mudaDialog();
            return;
        }

        const db = await getDBConnection();

        try {
            db.transaction((tx) => {
                tx.executeSql(
                    'UPDATE limites SET anual = ? WHERE id=1',
                    [ limite ],
                    (tx, results) => {
                    if (results.rowsAffected > 0) {
                        setTituloDialog("Atualização de limite");
                        setTextoDialog("Atualização efetuada com sucesso!");
                        setLimiteAtual(limite);
                        setLimite(0);
                    } else {
                        setTituloDialog("Falha no Registro");
                        setTextoDialog("Registro não pôde ser efetuado no momento!");
                    }
                    },
                    (tx, error) => {
                        setTituloDialog("Erro");
                        setTextoDialog(`Houve um erro: ${error.message || JSON.stringify(error)}`);
                    }
                );
            });
        } catch (err: any) {
            setTituloDialog("Erro");
            setTextoDialog(`Houve um erro: ${err.message || JSON.stringify(err)}`);
        }

        mudaDialog();
    }

    return (
        <>
            <Header title='Limite Anual' />
            <ScrollView style={{ flex: 1, padding: 10}}>
                                                            
                <View style={{ flexDirection: 'column', gap: 10, justifyContent: 'space-between'}}> 
                    
                    <Card containerStyle={{ marginHorizontal: 0 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#0f3762', fontSize: 18 }}>LIMITE ANUAL</Text>
                        <Card.Divider />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <Text style={{ fontSize: 16 }}>
                                Nesta tela é possível ajustar o limite anual. O ajuste se refere ao percentual (%) dos seus ganhos e pode ser definido de 1 a 100.
                            </Text>
                        </View>
                    </Card>

                    <View style={{ flexDirection: 'row', gap: 10, backgroundColor: '#d8e5f3ff', padding: 5}}>
                        <Text style={{ fontWeight: 'bold'}}>Limite atual:</Text>
                        <Text>{limiteAtual}%</Text>
                    </View>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, textAlign: 'left' }}>
                        Escolha um novo limite
                    </Text>

                    <Picker
                        style={{backgroundColor: '#d4d6d8ff', height: 50}}
                        selectedValue={limite}
                        onValueChange={(itemValue, itemIndex) =>
                            setLimite(itemValue)
                        }>
                        <Picker.Item label="Selecione..." value={0}/>
                        <Picker.Item label="100%" value={100} />
                        <Picker.Item label="95%" value={95} />
                        <Picker.Item label="90%" value={90} />
                        <Picker.Item label="85%" value={85} />
                        <Picker.Item label="80%" value={80} />
                        <Picker.Item label="75%" value={75} />
                        <Picker.Item label="70%" value={70} />
                        <Picker.Item label="65%" value={65} />
                        <Picker.Item label="60%" value={60} />
                        <Picker.Item label="55%" value={55} />
                        <Picker.Item label="50%" value={50} />
                        <Picker.Item label="45%" value={45} />
                        <Picker.Item label="40%" value={40} />
                        <Picker.Item label="35%" value={35} />
                        <Picker.Item label="30%" value={30} />
                        <Picker.Item label="25%" value={25} />
                        <Picker.Item label="20%" value={20} />
                        <Picker.Item label="15%" value={15} />
                        <Picker.Item label="10%" value={10} />
                        <Picker.Item label="5%" value={5} />
                        <Picker.Item label="1%" value={1} />
                    </Picker>

                    <Button 
                        size="lg"
                        buttonStyle={{ justifyContent: "center", backgroundColor: '#daa520' }}
                        onPress={atualizarLimite}
                    > 
                        Salvar novo limite
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