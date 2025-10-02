import * as React from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { Button, Card, Dialog } from '@rneui/themed';
import Header from '../components/Header';
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { getDBConnection } from '../db/db-connection';

export function RegisterGoods() {
    
    const [bem, setBem] = useState("");
    const [titulo, setTitulo] = useState("");
    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [date, setDate] = useState(new Date());

    const [visivel, setVisivel] = useState(false);
    const [tituloDialog, setTituloDialog] = useState("");
    const [textoDialog, setTextoDialog] = useState("");

    const mudaDialog = () => {
        setVisivel(!visivel);
    };

    const formatCurrency = (text: any) => {
        let num = text.replace(/\D/g, "");
        let parsed = (parseInt(num, 10) / 100).toFixed(2);
        return parsed
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleChange = (text: any) => {
        setValor(formatCurrency(text));
    };

    const salvarBem = async () => {
                
        if (bem == "") {
            setTituloDialog("Campo Tipo de Bem");
            setTextoDialog("Escolha uma das opções do campo tipo.");
            mudaDialog();
            return;
        }

        if (titulo == "") {
            setTituloDialog("Campo Título");
            setTextoDialog("Escolha uma das opções do campo tipo.");
            mudaDialog();
            return;
        }

        if (valor == "") {
            setTituloDialog("Campo Valor");
            setTextoDialog("Você esqueceu de inserir um valor para está despesa.");
            mudaDialog();
            return;
        }

        if (descricao == "") {
            setTituloDialog("Campo Descrição");
            setTextoDialog("Insira uma descrição para está despesa.");
            mudaDialog();
            return;
        }

        const db = await getDBConnection();

        try {
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO bens (tipo, titulo, valor, descricao, ano, mes, dia, data_ocorrencia, data_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        bem,
                        titulo,
                        parseFloat(valor.replace(/\./g, "").replace(",", ".")),
                        descricao,
                        date.getFullYear(),
                        date.getMonth()+1,
                        date.getDate(),
                        `${date.getFullYear()}-${(date.getMonth() + 1)
                        .toString()
                        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
                        new Date().toString()
                    ],
                    (tx, results) => {
                    if (results.rowsAffected > 0) {
                        setTituloDialog("Registro de Bem");
                        setTextoDialog("Registro efetuado com sucesso!");
                        setBem("");
                        setTitulo("");
                        setValor("");
                        setDescricao("");
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
            <Header title='Bens' />
            <ScrollView style={{ flex: 1, padding: 10}}>
                        
                <View style={{ flexDirection: 'column', gap: 10, justifyContent: 'space-between'}}> 
                    
                    <Card containerStyle={{ marginHorizontal: 0 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#0f3762', fontSize: 18 }}>CADASTRAR BEM</Text>
                        <Card.Divider />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <Text style={{ fontSize: 16 }}>
                                Nesta tela é possível cadastrar todos os seus bens, móveis (ex: veículo) ou imóveis (ex: apartamento).
                            </Text>
                        </View>
                    </Card>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, textAlign: 'left' }}>
                        Tipo de bem
                    </Text>

                    <Picker
                        style={{backgroundColor: '#d4d6d8ff', height: 50}}
                        selectedValue={bem}
                        onValueChange={(itemValue, itemIndex) =>
                            setBem(itemValue)
                        }>
                        <Picker.Item label="Selecione..." value=""/>
                        <Picker.Item label="Casa" value="Casa" />
                        <Picker.Item label="Apartamento" value="Apartamento" />
                        <Picker.Item label="Terreno" value="Terreno" />
                        <Picker.Item label="Sítio" value="Sítio" />
                        <Picker.Item label="Fazenda" value="Fazenda" />
                        <Picker.Item label="Prédio" value="Prédio" />
                        <Picker.Item label="Veículo" value="Veículo" />
                        <Picker.Item label="Outro" value="Outro" />
                    </Picker>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5, textAlign: 'left' }}>
                        Título do bem
                    </Text>

                    <TextInput
                        style={{height: 50, margin: 0, borderWidth: 0, padding: 10, backgroundColor: "#d4d6d8ff"}}
                        onChangeText={setTitulo}
                        value={titulo}
                        placeholder="Escreva o título"
                    />

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, textAlign: 'left' }}>
                        Valor 
                    </Text>

                    <TextInput
                        style={{height: 50, margin: 0, borderWidth: 0, padding: 10, backgroundColor: "#d4d6d8ff"}}
                        onChangeText={handleChange}
                        value={valor}
                        placeholder="0,00"
                        keyboardType="numeric"
                    />

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, textAlign: 'left' }}>
                        Descrição
                    </Text>

                    <TextInput
                        style={{height: 100, margin: 0, borderWidth: 0, paddingLeft: 10, paddingEnd: 10, paddingTop: 10, backgroundColor: "#d4d6d8ff", textAlignVertical: "top"}}
                        onChangeText={setDescricao}
                        value={descricao}
                        multiline
                        numberOfLines={10}
                    />

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>
                        Selecione a data da aquisição
                    </Text>

                    <DatePicker 
                        date={date} 
                        onDateChange={setDate} 
                        mode="date" 
                        locale="pt-BR"
                        style={{alignSelf: 'center', marginTop: 0}}
                    />

                    <Button size="lg" onPress={salvarBem}> Salvar </Button>

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

                    <Text>{'\n\n\n'}</Text> 
                    
                </View>
                
            </ScrollView>
        </>
    );
}