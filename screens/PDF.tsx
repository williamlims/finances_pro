import React, { useState } from 'react';
import Pdf from 'react-native-pdf';
import { View, StyleSheet, Dimensions, Alert, TouchableOpacity, Text } from 'react-native';
import RNBlobUtil, {ReactNativeBlobUtil} from 'react-native-blob-util';

export function PDF({ route }) {
    const { path } = route.params;
    const [downloading, setDownloading] = useState(false);
    const source = { uri: `file://${path}`, cache: true };

    const handleDownload = async () => {
        try {
            setDownloading(true);

            const pdfData = await RNBlobUtil.fs.readFile(path, 'base64');

            const filePath = await RNBlobUtil.MediaCollection.copyToMediaStore(
                {
                    parentFolder: '',
                    mimeType: 'application/pdf',
                    name: 'relatorio.pdf',
                    data: pdfData,
                },
                'Download',
                source.uri
            );

            Alert.alert('Sucesso', `O documento foi salvo na pasta Download.`);
        } catch (error) {
            console.error('Erro ao salvar PDF:', error);
            Alert.alert('Erro', 'Não foi possível salvar o PDF.');
        } finally {
            setDownloading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Pdf
                source={source}
                style={styles.pdf}
                onError={error => console.log(error)}
            />

            <TouchableOpacity
                style={[styles.button, downloading && { backgroundColor: '#b4b1b1ff' }]}
                onPress={handleDownload}
                disabled={downloading}
            >
            <Text style={styles.buttonText}>
                {downloading ? 'Baixando...' : 'Baixar PDF'}
            </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    button: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        backgroundColor: '#a52a2a',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 0,
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});