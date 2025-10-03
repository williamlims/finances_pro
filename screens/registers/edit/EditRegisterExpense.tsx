import * as React from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { Button, Card, Dialog } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../components/Header';
import {Picker} from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import DatePicker from 'react-native-date-picker';
import { getDBConnection } from '../../db/db-connection';

type RouteParams = {
  id: number;
};

export function EditRegisterExpense() {

    const navigation = useNavigation();
    const [tipo, setTipo] = useState("");
    const [despesa, setDespesa] = useState("");
    const [recorrente, setRecorrente] = useState("");
    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [date, setDate] = useState(new Date());
    const [atualizado, setAtualizado] = useState(0);

    const [visivel, setVisivel] = useState(false);
    const [tituloDialog, setTituloDialog] = useState("");
    const [textoDialog, setTextoDialog] = useState("");

    const mudaDialog = () => {
        setVisivel(!visivel);
    };

    const verificaAtualizado = () => {
        if (atualizado === 1) {
            navigation.goBack();
        } else {
            mudaDialog();
        }
    };

    const route = useRoute();
    const { id } = route.params as RouteParams;

    const formatCurrency = (text: any) => {
        if (!text) return "";
        let num = text.replace(/\D/g, "");
        if (!num) return "";
        let parsed = (parseInt(num, 10) / 100).toFixed(2);
        return parsed
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleChange = (text: any) => {
        setValor(formatCurrency(text));
    };

    const options:any = {
        ["Moradia"]: [
            { label: "Aluguel", value: "Aluguel" },
            { label: "Prestação do imóvel", value: "Prestação do imóvel" },
            { label: "Condomínio", value: "Condomínio" },
            { label: "Conta de água", value: "Conta de água" },
            { label: "Conta de energia", value: "Conta de energia" },
            { label: "Conta de gás", value: "Conta de gás" },
            { label: "Conta de internet", value: "Conta de internet" },
            { label: "Conta de telefone", value: "Conta de telefone" },
            { label: "Reforma ou reparos", value: "Reforma ou reparos" },
        ],
        ["Alimentação"]: [
            { label: "Supermercado", value: "Supermercado" },
            { label: "Delivery de comida", value: "Delivery de comida" },
            { label: "Restaurantes, lanchonetes ou cafés", value: "Restaurantes, lanchonetes ou cafés" },
        ],
        ["Transporte"]: [
            { label: "Combustível", value: "Combustível" },
            { label: "Manutenção de veículo", value: "Manutenção de veículo" },
            { label: "Seguro do veículo", value: "Seguro do veículo" },
            { label: "Estacionamento", value: "Estacionamento" },
            { label: "Pedágio", value: "Pedágio" },
            { label: "Transporte público", value: "Transporte público" },
            { label: "Aplicativos de mobilidade", value: "Aplicativos de mobilidade" },
            { label: "Passagens aéreas", value: "Passagens aéreas" },
        ],
        ["Saúde"]: [
            { label: "Plano de saúde", value: "Plano de saúde" },
            { label: "Consultas médicas", value: "Consultas médicas" },
            { label: "Medicamentos", value: "Medicamentos" },
            { label: "Odontologia", value: "Odontologia" },
            { label: "Exames", value: "Exames" },
            { label: "Academia / atividades físicas", value: "Academia / atividades físicas" },            
        ],
        ["Educação"]: [
            { label: "Mensalidade escolar ou faculdade", value: "Mensalidade escolar ou faculdade" },
            { label: "Cursos (idiomas, profissionalizantes, online)", value: "Cursos (idiomas, profissionalizantes, online)" },
            { label: "Material escolar", value: "Material escolar" },
            { label: "Livros", value: "Livros" },
        ],
        ["Lazer e Cultura"]: [
            { label: "Cinema, teatro ou shows", value: "Cinema, teatro ou shows" },
            { label: "Viagens", value: "Viagens" },
            { label: "Passeios", value: "Passeios" },
            { label: "Assinaturas de streaming", value: "Assinaturas de streaming" },
            { label: "Hobbies", value: "Hobbies" },
        ],
        ["Compras Pessoais"]: [
            { label: "Roupas, sapatos ou acessórios", value: "Roupas, sapatos ou acessórios" },
            { label: "Eletrônicos", value: "Eletrônicos" },
            { label: "Cosméticos / cuidados pessoais", value: "Cosméticos / cuidados pessoais" },
        ],
        ["Dívidas e Obrigações Financeiras"]: [
            { label: "Cartão de crédito (fatura)", value: "Cartão de crédito (fatura)" },
            { label: "Empréstimos", value: "Empréstimos" },
            { label: "Financiamentos", value: "Financiamentos" },
            { label: "Parcelamentos em lojas", value: "Parcelamentos em lojas" },
        ],
        ["Seguros e Impostos"]: [
            { label: "Seguro de vida", value: "Seguro de vida" },
            { label: "Seguro residencial", value: "Seguro residencial" },
            { label: "IPVA", value: "IPVA" },
            { label: "IPTU", value: "IPTU" },
            { label: "Imposto de renda", value: "Imposto de renda" },
        ],
        ["Investimentos e Poupança"]: [
            { label: "Aplicações financeiras (CDB, Tesouro, Ações, Cripto)", value: "Aplicações financeiras (CDB, Tesouro, Ações, Cripto)" },
            { label: "Poupança", value: "Poupança" },
            { label: "Previdência privada", value: "Previdência privada" },
        ],
        ["Família"]: [
            { label: "Pensão alimentícia", value: "Pensão alimentícia" },
            { label: "Mesada para filhos", value: "Mesada para filhos" },
            { label: "Ajuda financeira a familiares", value: "Ajuda financeira a familiares" },
        ],
        ["Outros / Emergenciais"]: [
            { label: "Presentes", value: "Presentes" },
            { label: "Multas", value: "Multas" },
            { label: "Doações", value: "Doações" },
            { label: "Outros", value: "Outros" },
        ],
    };

    useEffect(() => {
        const getResult = async () => {
            const db = await getDBConnection();
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM despesas WHERE id = ?',
                    [id],
                    (tx, results) => {
                    if (results.rows.length > 0) {
                        setTipo(results.rows.item(0).tipo);
                        setDespesa(results.rows.item(0).despesa);
                        setRecorrente(results.rows.item(0).recorrente);
                        setValor(formatCurrency((results.rows.item(0).valor).toFixed(2)));
                        setDescricao(results.rows.item(0).descricao);
                        setDate(new Date(results.rows.item(0).data_ocorrencia));
                    }
                    },
                    (tx, error) => {
                        console.error('Erro ao acessar o banco de dados:', error);
                    }
                );
            });
        }
        
        getResult();

    }, [id]);

    const atualizarDespesa = async () => {
                        
        if (tipo == "") {
            setTituloDialog("Campo Tipo");
            setTextoDialog("Escolha uma das opções do campo tipo.");
            mudaDialog();
            return;
        }

        if (despesa == "") {
            setTituloDialog("Campo Despesa");
            setTextoDialog("Escolha uma das opções do campo despesa.");
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
                    'UPDATE despesas SET tipo = ?, despesa = ?, recorrente = ?, valor = ?, descricao = ?, data_ocorrencia = ? WHERE id=?',
                    [ 
                        tipo,
                        despesa,
                        recorrente,
                        parseFloat(valor.replace(/\./g, "").replace(",", ".")),
                        descricao,
                        `${date.getFullYear()}-${(date.getMonth() + 1)
                        .toString()
                        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
                        id
                    ],
                    (tx, results) => {
                    if (results.rowsAffected > 0) {
                        setTituloDialog("Atualização de Despesa");
                        setTextoDialog("Atualização efetuada com sucesso!");
                        setAtualizado(1);
                    } else {
                        setTituloDialog("Falha na Atualização");
                        setTextoDialog("Atualização não pôde ser efetuado no momento!");
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
            <Header title='Despesa' />
            <ScrollView style={{ flex: 1, padding: 10}}>

                <View style={{ flexDirection: 'column', gap: 10, justifyContent: 'space-between'}}> 
                    
                    <Card containerStyle={{ marginHorizontal: 0 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#0f3762', fontSize: 18 }}>ATUALIZAR DESPESA</Text>
                        <Card.Divider />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <Text style={{ fontSize: 16 }}>
                                Nesta tela é possível atualizar o registro de sua despesa caso tenha cometido algum engano.
                            </Text>
                        </View>
                    </Card>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5, textAlign: 'left' }}>
                        Tipo de despesa
                    </Text>

                    <Picker
                        style={{backgroundColor: '#d4d6d8ff', height: 50}}
                        selectedValue={tipo}
                        onValueChange={(itemValue, itemIndex) =>
                            setTipo(itemValue)
                        }>
                        <Picker.Item label="Selecione..." value=""/>
                        <Picker.Item label="Moradia" value="Moradia" />
                        <Picker.Item label="Alimentação" value="Alimentação" />
                        <Picker.Item label="Transporte" value="Transporte" />
                        <Picker.Item label="Saúde" value="Saúde" />
                        <Picker.Item label="Educação" value="Educação" />
                        <Picker.Item label="Lazer e Cultura" value="Lazer e Cultura" />
                        <Picker.Item label="Compras Pessoais" value="Compras Pessoais" />
                        <Picker.Item label="Dívidas e Obrigações Financeiras" value="Dívidas e Obrigações Financeiras" />
                        <Picker.Item label="Seguros e Impostos" value="Seguros e Impostos" />
                        <Picker.Item label="Investimentos e Poupança" value="Investimentos e Poupança" />
                        <Picker.Item label="Família" value="Família" />
                        <Picker.Item label="Outros / Emergenciais" value="Outros / Emergenciais" />
                    </Picker>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, textAlign: 'left' }}>
                        Despesa
                    </Text>

                    <Picker
                        style={{ backgroundColor: "#d4d6d8ff", height: 50 }}
                        selectedValue={despesa}
                        onValueChange={(itemValue) => setDespesa(itemValue)}
                        enabled={!!tipo}
                    >
                        <Picker.Item label="Selecione..." value="" />
                        {tipo && options[tipo]?.map((opt: any) => (
                            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                        ))}
                    </Picker>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5, textAlign: 'left' }}>
                        Despesa recorrente?
                    </Text>

                    <Picker
                        style={{backgroundColor: '#d4d6d8ff', height: 50}}
                        selectedValue={recorrente}
                        onValueChange={(itemValue, itemIndex) =>
                            setRecorrente(itemValue)
                        }>
                        <Picker.Item label="Não" value={0} />
                        <Picker.Item label="Sim" value={1} />
                    </Picker>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, textAlign: 'left' }}>
                        Valor 
                    </Text>

                    <TextInput
                        style={{height: 50, margin: 0, borderWidth: 0, padding: 10, backgroundColor: "#d4d6d8ff"}}
                        onChangeText={handleChange}
                        value={valor.toString()}
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
                        Selecione a data da ocorrência
                    </Text>

                    <DatePicker 
                        date={date} 
                        onDateChange={setDate} 
                        mode="date" 
                        locale="pt-BR"
                        style={{alignSelf: 'center', marginTop: 0}}
                    />

                    <Button 
                        size="lg"
                        buttonStyle={{ backgroundColor: '#9400d3' }}
                        onPress={atualizarDespesa}
                    > 
                        Atualizar registro
                    </Button>

                    <Dialog
                        isVisible={visivel}
                        onBackdropPress={mudaDialog}
                        >
                        <Dialog.Title title={tituloDialog}/>
                        <Text>{textoDialog}</Text>
                        <Dialog.Actions>
                            <Dialog.Button title="OK" onPress={verificaAtualizado}/>
                        </Dialog.Actions>
                    </Dialog>
                
                    <Text>{'\n\n\n'}</Text>

                </View>

            </ScrollView>
        </>
    );
}