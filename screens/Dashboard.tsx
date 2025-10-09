import * as React from 'react';
import { View, Text, ScrollView, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { Card, Divider } from '@rneui/themed';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import { getDBConnection } from './db/db-connection';

type Despesa = {
  tipo: string;
  total: number;
};

export function Dashboard() {
  const screenWidth = Dimensions.get("window").width - 20;
  const [mesAtual] = useState(new Date().getMonth() + 1);

  const [ganhos, setGanhos] = useState<number[]>([0,0,0,0]);
  const [despesas, setDespesas] = useState<number[]>([0,0,0,0]);

  const [maioresDespesas, setMaioresDespesas] = useState<Despesa[]>([]);
  const [loaded, setLoaded] = useState(false);

  const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

  const getMesLabel = (offset: number) => {
    const idx = (mesAtual - offset - 1 + 12) % 12;
    return meses[idx].substring(0,3);
  };

  const getTotal = (db: any, table: string, mes: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      if (mes < 1 || mes > 12) return resolve(0);
      db.transaction((tx: any) => {
        tx.executeSql(
          `SELECT SUM(valor) AS total FROM ${table} WHERE mes = ? AND ano = ?`,
          [mes, new Date().getFullYear()],
          (_tx: any, results: any) => {
            const raw = results.rows.item(0).total;
            const n = Number(raw);
            if (!isFinite(n) || Number.isNaN(n)) resolve(0);
            else resolve(n);
          },
          (_tx: any, error: any) => {
            console.error(`Erro SQL (${table}, mes ${mes}):`, error);
            resolve(0);
          }
        );
      });
    });
  };

  const getMaioresDespesasPromise = (db: any): Promise<Despesa[]> => {
    return new Promise((resolve) => {
      db.transaction((tx: any) => {
        tx.executeSql(
          `SELECT tipo, SUM(valor) AS total 
           FROM despesas 
           WHERE ano = ? 
           GROUP BY tipo 
           ORDER BY total DESC 
           LIMIT 4`,
          [new Date().getFullYear()],
          (_tx: any, results: any) => {
            const out: Despesa[] = [];
            for (let i = 0; i < results.rows.length; i++) {
              const r = results.rows.item(i);
              out.push({ tipo: r.tipo, total: Number(r.total) || 0 });
            }
            resolve(out);
          },
          (_tx: any, error: any) => {
            console.error("Erro ao buscar maiores despesas:", error);
            resolve([]);
          }
        );
      });
    });
  };

  useEffect(() => {
    let mounted = true;
    const carregar = async () => {
      setLoaded(false);
      const db = await getDBConnection();

      const mesesAlvo = [3,2,1,0].map(offset => ((mesAtual - offset - 1 + 12) % 12) + 1);

      const ganhosPromises = mesesAlvo.map(m => getTotal(db, "ganhos", m));
      const despesasPromises = mesesAlvo.map(m => getTotal(db, "despesas", m));

      const [ganhosRes, despesasRes, maioresRes] = await Promise.all([
        Promise.all(ganhosPromises),
        Promise.all(despesasPromises),
        getMaioresDespesasPromise(db)
      ]);

      if (!mounted) return;
      setGanhos(ganhosRes.map(n => (isFinite(n) ? n : 0)));
      setDespesas(despesasRes.map(n => (isFinite(n) ? n : 0)));
      setMaioresDespesas(maioresRes);
      setLoaded(true);
    };

    carregar();

    return () => { mounted = false; };
  }, [mesAtual]);

  const ganhosData = ganhos.map(v => (v || 0) / 1000);
  const despesasData = despesas.map(v => (v || 0) / 1000);

  const pieData = maioresDespesas.slice(0,4).map((d,i) => ({
    name: d?.tipo || `#${i+1}`,
    population: Number(d?.total || 0) / 1000,
    color: ["rgba(173,20,0,1)","rgb(204,216,37)","rgba(238,107,46,1)","rgba(253,201,123,1)"][i],
    legendFontColor: "#fff",
    legendFontSize: 14
  }));

  const pieTotal = pieData.reduce((s, p) => s + (p.population || 0), 0);

  return (
    <>
      <Header title='Dashboard' />
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <View style={{ flexDirection: 'column', gap: 10, justifyContent: 'space-between' }}>
          <Card containerStyle={{ marginHorizontal: 0 }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#0f3762', fontSize: 18 }}>
              DASHBOARD FINANCEIRO
            </Text>
            <Card.Divider />
            <Text style={{ fontSize: 16 }}>
              Aqui você tem acesso ao seu dashboard para análise crítica e entender rapidamente como anda sua saúde financeira.
            </Text>
          </Card>

          <Text style={styles.title}>Ganhos nos últimos 4 meses</Text>
          <View style={styles.chartContainer}>
            { !loaded ? (
              <ActivityIndicator size="large" />
            ) : (
              <LineChart
                data={{
                  labels: [getMesLabel(3), getMesLabel(2), getMesLabel(1), getMesLabel(0)],
                  datasets: [{ data: ganhosData }]
                }}
                width={screenWidth}
                height={200}
                yAxisLabel="R$"
                yAxisSuffix="k"
                chartConfig={{
                  backgroundColor: "#333c70",
                  backgroundGradientFrom: "#3b5da5",
                  backgroundGradientTo: "#9294af",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`
                }}
                bezier
                style={{ borderRadius: 12 }}
              />
            )}
          </View>

          <Divider />

          <Text style={styles.title}>Despesas nos últimos 4 meses</Text>
          <View style={styles.chartContainer}>
            { !loaded ? (
              <ActivityIndicator size="large" color={'#28a745'}/>
            ) : (
              <BarChart
                data={{
                  labels: [getMesLabel(3), getMesLabel(2), getMesLabel(1), getMesLabel(0)],
                  datasets: [{ data: despesasData }]
                }}
                width={screenWidth}
                height={200}
                yAxisLabel="R$"
                yAxisSuffix="k"
                chartConfig={{
                  backgroundColor: "#200c10",
                  backgroundGradientFrom: "#8b0e14",
                  backgroundGradientTo: "#500404",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`
                }}
                verticalLabelRotation={30}
                style={{ borderRadius: 12 }}
              />
            )}
          </View>

          <Divider />

          <Text style={styles.title}>Maiores despesas do ano</Text>
          <View style={styles.chartContainer}>
            { !loaded ? (
              <ActivityIndicator size="large" color={'#28a745'} />
            ) : (
              pieTotal > 0 ? (
                <PieChart
                  data={pieData}
                  width={screenWidth}
                  height={200}
                  chartConfig={{
                    color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`
                  }}
                  accessor="population"
                  backgroundColor="#323335"
                  paddingLeft="15"
                  absolute
                  style={{ borderRadius: 12 }}
                />
              ) : (
                <Card containerStyle={{ marginHorizontal: 0 }}>
                  <Text style={{ textAlign: 'center' }}>Nenhuma despesa registrada neste ano.</Text>
                </Card>
              )
            )}
          </View>

          <Divider />
          <Text>{'\n\n\n'}</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center'
  }
});
