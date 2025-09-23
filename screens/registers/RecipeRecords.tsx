import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Divider, ListItem } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from "@react-native-vector-icons/fontawesome";
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { getDBConnection } from '../db/db-connection';

type Ganho = {
  id: number;
  tipo: string;
  descricao: string;
  ano: number;
  mes: number;
  dia: number;
};

export function RecipeRecords() {
    const navigation = useNavigation();
    const [ganhos, setGanhos] = useState<Ganho[]>([]);

    useEffect(() => {
        const getResult = async () => {
            const db = await getDBConnection();
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT id, tipo, descricao, ano, mes, dia FROM ganhos ORDER BY ano DESC, mes DESC, dia DESC',
                    [],
                    (tx, results) => {
                        const temp: Ganho[] = [];
                        for (let i = 0; i < results.rows.length; i++) {
                            temp.push(results.rows.item(i));
                        }
                        setGanhos(temp);
                    },
                    (tx, error) => {
                        console.error('Erro ao acessar o banco de dados:', error);
                    }
                );
            });
        }

        getResult();
    }, []);

    return (
        <>
            <Header title='Ganhos' />
            <ScrollView style={{ flex: 1, padding: 10}}>
            
                <View style={{ flexDirection: 'column', gap: 10, justifyContent: 'space-between'}}> 
                    
                    <Card containerStyle={{ marginHorizontal: 0 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#0f3762', fontSize: 18 }}>REGISTROS DE GANHOS</Text>
                        <Card.Divider />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <Text style={{ fontSize: 16 }}>
                                Nesta tela é possível acessar os registros de ganhos realizados em todo o período.
                            </Text>
                        </View>
                    </Card>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>
                        Listagem geral
                    </Text>

                    <Divider />

                    <>

                        {ganhos.map((item) => (
                            <ListItem.Swipeable
                                onPress={() => navigation.navigate('EditRegisterRecipe', { id: item.id })}
                                key={item.id} 
                                leftWidth={80}
                                rightWidth={90}
                                minSlideWidth={40}
                            >
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <FontAwesome
                                        name="edit"
                                        color="black"
                                        size={30}
                                        style={{ position: "absolute", left: 0 }}
                                    />
                                    <ListItem.Content style={{ left: 40 }}>
                                        <ListItem.Title>[{item.dia.toString().padStart(2, '0')}/{item.mes.toString().padStart(2, '0')}/{item.ano.toString()}] - {item.tipo}</ListItem.Title>
                                        <ListItem.Subtitle>
                                            {item.descricao.length > 20 
                                            ? item.descricao.substring(0, 30) + " ..." 
                                            : item.descricao}
                                        </ListItem.Subtitle>
                                    </ListItem.Content> 
                                </View>
                            </ListItem.Swipeable>
                        ))}

                    </>

                </View>

            </ScrollView>
        </>
    );
}