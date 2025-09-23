import * as React from 'react';
import { View, Text, ScrollView, TextInput, Dimensions } from 'react-native';
import { Button, Card, Input, Divider } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from "@react-native-vector-icons/fontawesome";
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';
import Header from './components/Header';
import {
  LineChart,
  BarChart,
  PieChart
} from "react-native-chart-kit";

export function Dashboard() {
    const navigation = useNavigation();
    const screenWidth = Dimensions.get("window").width - 20;

    const widthAndHeight = 250

    const data = [
    {
      name: "Alimento",
      population: 40,
      color: "rgba(173, 20, 0, 1)",
      legendFontColor: "#ffffffff",
      legendFontSize: 15
    },
    {
      name: "Moradia",
      population: 20,
      color: "rgba(199, 22, 22, 1)",
      legendFontColor: "#ffffffff",
      legendFontSize: 15
    },
    {
      name: "Transporte",
      population: 10,
      color: "rgba(238, 107, 46, 1)",
      legendFontColor: "#ffffffff",
      legendFontSize: 15
    },
    {
      name: "Educação",
      population: 10,
      color: "rgba(253, 201, 123, 1)",
      legendFontColor: "#ffffffff",
      legendFontSize: 15
    }
  ];
    
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
                        labels: ["Junho", "Julho", "Agosto", "Setembro"],
                        datasets: [
                          {
                            data: [
                              8.5,
                              11.6,
                              5,
                              4.5
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
                    //style={graphStyle}
                    data={
                      {
                        labels: ["Jun", "Jul", "Ago", "Set"],
                        datasets: [
                          {
                            data: [
                              8.5,
                              11.6,
                              5,
                              4.5
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
                        //backgroundColor: "#200c10ff",
                        //backgroundGradientFrom: "#8b0e14ff",
                        //backgroundGradientTo: "#500404ff",
                        //decimalPlaces: 2, // optional, defaults to 2dp
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