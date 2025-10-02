import * as React from 'react';
import { View, Text, ScrollView, PermissionsAndroid , Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { Button, Card, Input, Divider, Dialog } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from "@react-native-vector-icons/fontawesome";
import Header from './components/Header';
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { generatePDF } from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob';

export function Data() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [visivel, setVisivel] = useState(true);
    const [visible, setVisible] = useState(false);

    const toggleDialog = () => {
        setVisible(!visible);
    };

    async function createPDF() {
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );

        setLoading(true);

        const { dirs } = RNFetchBlob.fs;
        const downloads = dirs.DownloadDir;

        const formatBRL = (v:number) =>
            new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v);

        const gastosMes = 8500.0;
        const gastosAno = 45230.5;
        const ganhosMes = 12500.0;
        const ganhosAno = 120500.75;
        const bensTotal = 180000.0;

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
            base64: true,
        };

        let results = await generatePDF(options);
        console.log(results.filePath);

        //const path = `${RNFS.DownloadDirectoryPath}/relatorio.pdf`;

        //await RNFS.writeFile(path, results.base64!, 'base64');

        //await FileViewer.open(results.filePath, { showOpenWithDialog: true });
        const downloadPath = `${RNFS.DownloadDirectoryPath}/relatorio.pdf`;

        await RNFS.moveFile(results.filePath, downloadPath);

        setLoading(false);

        /*Alert.alert(
            "Relatório Gerado",
            "O relatório foi salvo em sua pasta de Downloads.",
            [
                { text: "Sair", style: "cancel" },
                {
                    text: "OK",
                    onPress: () => {}
                }
            ]
        );*/
        setVisible(!visible);
    }

    return (
        <>
            <Header title='Dados' />
            <ScrollView style={{ flex: 1, padding: 10}}>
                        
                <View style={{ flexDirection: 'column', gap: 10, justifyContent: 'space-between'}}> 
                    
                    <Card containerStyle={{ marginHorizontal: 0 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#0f3762', fontSize: 18 }}>BAIXAR RELATÓRIO</Text>
                        <Card.Divider />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <Text style={{ fontSize: 16 }}>
                                Nesta tela é possível baixar o relatório com a sua situação financeira baseado nos registros. É importante que as informações cadastradas reflitam a sua realidade financeira.
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
                            <Text style={{ fontSize: 30, color: "white" }}>Baixar relatório</Text>
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
                        <Text>O relatório foi salvo em sua pasta de Downloads.</Text>
                        <Dialog.Actions>
                            <Dialog.Button title="OK" onPress={toggleDialog}/>
                        </Dialog.Actions>
                    </Dialog>

                </View>

            </ScrollView>
        </>
    );
}