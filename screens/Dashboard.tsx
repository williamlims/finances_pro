import * as React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Card, Divider } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import {
  LineChart,
  BarChart,
  PieChart
} from "react-native-chart-kit";
import { getDBConnection } from './db/db-connection';

type Despesa = {
  tipo: string;
  total: number;
};

export function Dashboard() {
    const navigation = useNavigation();
    const screenWidth = Dimensions.get("window").width - 20;
    const [mesAtual, setMesAtual] = useState(new Date().getMonth()+1)

    const [mesGUltimo, setMesGUltimo] = useState(0);
    const [mesGTerceiro, setMesGTerceiro] = useState(0);
    const [mesGSegundo, setMesGSegundo] = useState(0);
    const [mesGPrimeiro, setMesGPrimeiro] = useState(0);

    const [mesDUltimo, setMesDUltimo] = useState(0);
    const [mesDTerceiro, setMesDTerceiro] = useState(0);
    const [mesDSegundo, setMesDSegundo] = useState(0);
    const [mesDPrimeiro, setMesDPrimeiro] = useState(0);

    const [maioresDespesas, setMaioresDespesas] = useState<Despesa[]>([]);

    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const widthAndHeight = 250

    const data = [
    {
      name: maioresDespesas[0]?.tipo || "",
      population: (maioresDespesas[0]?.total || 0)/1000,
      color: "rgba(173, 20, 0, 1)",
      legendFontColor: "#ffffffff",
      legendFontSize: 15
    },
    {
      name: maioresDespesas[1]?.tipo || "",
      population: (maioresDespesas[1]?.total || 0)/1000,
      color: "rgb(204, 216, 37)",
      legendFontColor: "#ffffffff",
      legendFontSize: 15
    },
    {
      name: maioresDespesas[2]?.tipo || "",
      population: (maioresDespesas[2]?.total || 0)/1000,
      color: "rgba(238, 107, 46, 1)",
      legendFontColor: "#ffffffff",
      legendFontSize: 15
    },
    {
      name: maioresDespesas[3]?.tipo || "",
      population: (maioresDespesas[3]?.total || 0)/1000,
      color: "rgba(253, 201, 123, 1)",
      legendFontColor: "#ffffffff",
      legendFontSize: 15
    }
  ];

  useEffect(() => {
    const getUltimoMesG = async () => {
      const db = await getDBConnection();
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT SUM(valor) AS total FROM ganhos WHERE mes = ? AND ano = ?',
            [mesAtual, new Date().getFullYear()],
            (tx, results) => {
              setMesGUltimo(results.rows.item(0).total);
            },
            (tx, error) => {
                console.error('Erro ao acessar o banco de dados:', error);
            }
          );
      });        
    }

    const getTerceiroMesG = async () => {
      const db = await getDBConnection();
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT SUM(valor) AS total FROM ganhos WHERE mes = ? AND ano = ?',
            [mesAtual-1, new Date().getFullYear()],
            (tx, results) => {
              setMesGTerceiro(results.rows.item(0).total);
            },
            (tx, error) => {
                console.error('Erro ao acessar o banco de dados:', error);
            }
          );
      });        
    }

    const getSegundoMesG = async () => {
      const db = await getDBConnection();
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT SUM(valor) AS total FROM ganhos WHERE mes = ? AND ano = ?',
            [mesAtual-2, new Date().getFullYear()],
            (tx, results) => {
              setMesGSegundo(results.rows.item(0).total);
            },
            (tx, error) => {
                console.error('Erro ao acessar o banco de dados:', error);
            }
          );
      });        
    }

    const getPrimeiroMesG = async () => {
      const db = await getDBConnection();
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT SUM(valor) AS total FROM ganhos WHERE mes = ? AND ano = ?',
            [mesAtual-3, new Date().getFullYear()],
            (tx, results) => {
              setMesGPrimeiro(results.rows.item(0).total);
            },
            (tx, error) => {
                console.error('Erro ao acessar o banco de dados:', error);
            }
          );
      });        
    } 

    const getUltimoMesD = async () => {
      const db = await getDBConnection();
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT SUM(valor) AS total FROM despesas WHERE mes = ? AND ano = ?',
            [mesAtual, new Date().getFullYear()],
            (tx, results) => {
              setMesDUltimo(results.rows.item(0).total);
            },
            (tx, error) => {
                console.error('Erro ao acessar o banco de dados:', error);
            }
          );
      });        
    }

    const getTerceiroMesD = async () => {
      const db = await getDBConnection();
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT SUM(valor) AS total FROM despesas WHERE mes = ? AND ano = ?',
            [mesAtual-1, new Date().getFullYear()],
            (tx, results) => {
              setMesDTerceiro(results.rows.item(0).total);
            },
            (tx, error) => {
                console.error('Erro ao acessar o banco de dados:', error);
            }
          );
      });        
    }

    const getSegundoMesD = async () => {
      const db = await getDBConnection();
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT SUM(valor) AS total FROM despesas WHERE mes = ? AND ano = ?',
            [mesAtual-2, new Date().getFullYear()],
            (tx, results) => {
              setMesDSegundo(results.rows.item(0).total);
            },
            (tx, error) => {
                console.error('Erro ao acessar o banco de dados:', error);
            }
          );
      });        
    }

    const getPrimeiroMesD = async () => {
      const db = await getDBConnection();
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT SUM(valor) AS total FROM despesas WHERE mes = ? AND ano = ?',
            [mesAtual-3, new Date().getFullYear()],
            (tx, results) => {
              setMesDPrimeiro(results.rows.item(0).total);
            },
            (tx, error) => {
                console.error('Erro ao acessar o banco de dados:', error);
            }
          );
      });        
    } 

    const getMaioresDespesas = async () => {
      const db = await getDBConnection();
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT tipo, SUM(valor) AS total 
            FROM despesas 
            WHERE ano = ? 
            GROUP BY tipo 
            ORDER BY total DESC 
            LIMIT 4`,
            [new Date().getFullYear()],
            (tx, results) => {
              const maiores: Despesa[] = [];
              for (let i = 0; i < results.rows.length; i++) {
                maiores.push(results.rows.item(i));
              }
              setMaioresDespesas(maiores);
            },
            (tx, error) => {
                console.error('Erro ao acessar o banco de dados:', error);
            }
          );
      });        
    } 

    getUltimoMesG();
    getTerceiroMesG();
    getSegundoMesG();
    getPrimeiroMesG();
    getUltimoMesD();
    getTerceiroMesD();
    getSegundoMesD();
    getPrimeiroMesD();
    getMaioresDespesas();

  }, []);

  return (
      <>
          <Header title='Dashboard' />
          <ScrollView style={{ flex: 1, padding: 10}}>
                                  
              <View style={{ flexDirection: 'column', gap: 10, justifyContent: 'space-between'}}> 
                  
                  <Card containerStyle={{ marginHorizontal: 0 }}>
                      <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#0f3762', fontSize: 18 }}>DASHBOARD FINANCEIRO</Text>
                      <Card.Divider />
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                          <Text style={{ fontSize: 16 }}>
                              Aqui você tem acesso ao seu dashboard para análise crítica e entender rapidamente como anda sua saúde financeira.
                          </Text>
                      </View>
                  </Card>

                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>
                      Ganhos nos últimos 4 meses
                  </Text>

                  <LineChart
                    data={{
                      labels: [meses[mesAtual-4], meses[mesAtual-3], meses[mesAtual-2], meses[mesAtual-1]],
                      datasets: [
                        {
                          data: [
                            mesGPrimeiro / 1000,
                            mesGSegundo / 1000,
                            mesGTerceiro / 1000,
                            mesGUltimo / 1000
                          ]
                        }
                      ]
                    }}
                    width={screenWidth}
                    height={220}
                    yAxisLabel="R$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: "#333c70ff",
                      backgroundGradientFrom: "#3b5da5ff",
                      backgroundGradientTo: "#9294afff",
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 10
                      },
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                      }
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16
                    }}
                />

                <Divider />

                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>
                    Despesas nos últimos 4 meses
                </Text>

                <BarChart
                  data={
                    {
                      labels: [meses[mesAtual-4].substring(0, 3), meses[mesAtual-3].substring(0, 3), meses[mesAtual-2].substring(0, 3), meses[mesAtual-1].substring(0, 3)],
                      datasets: [
                        {
                          data: [
                            mesDPrimeiro / 1000,
                            mesDSegundo / 1000,
                            mesDTerceiro / 1000,
                            mesDUltimo / 1000
                          ]
                        }
                      ]
                    }
                  }
                  width={screenWidth}
                  height={220}
                  yAxisLabel="R$"
                  yAxisSuffix="k"
                  chartConfig={
                    {
                      backgroundColor: "#200c10ff",
                      backgroundGradientFrom: "#8b0e14ff",
                      backgroundGradientTo: "#500404ff",
                      decimalPlaces: 2,
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 10
                      },
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                      }
                    }
                  }
                  verticalLabelRotation={30}
                  style={{
                      marginVertical: 8,
                      borderRadius: 16
                  }}
                />

                <Divider />

                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>
                    Maiores despesas do ano
                </Text>

                <PieChart
                  data={data}
                  width={screenWidth}
                  height={220}
                  chartConfig={
                    {
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 10
                      },
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                      }
                    }
                  }
                  style={{
                      marginVertical: 8,
                      borderRadius: 16
                  }}
                  accessor={"population"}
                  backgroundColor={"#323335ff"}
                  paddingLeft={"15"}
                  center={[10, 10]}
                  absolute
                />

                <Divider />
                <Text>{'\n\n\n'}</Text>

              </View>   
              
          </ScrollView>
      </>
  );
}