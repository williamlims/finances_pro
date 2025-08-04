import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Linking,
    StyleProp,
    TextStyle,
    ViewStyle,
} from 'react-native';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { Button } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesome } from "@react-native-vector-icons/fontawesome";
import { useNavigation } from '@react-navigation/native';

type HeaderComponentProps = {
    title: string;
    view?: string;
};

type ParamList = {
    Detail: {
        openDrawer: void;
    };
};

const Header: React.FunctionComponent<HeaderComponentProps> = (props) => {
    const navigation = useNavigation();
    return (
        <SafeAreaProvider>
            <HeaderRNE
                leftComponent={
                    <View style={styles.headerRight}>
                        <Button
                            style={{ marginLeft: 10, }}
                            buttonStyle={{
                                backgroundColor: '#0f3762',
                            }}
                            onPress={() => navigation.goBack()}
                        >
                            <FontAwesome name="arrow-left" size={22} color="white" />
                        </Button>
                    </View>
                }
                centerComponent={{ text: props.title, style: styles.heading }}
                containerStyle={{
                    backgroundColor: '#0f3762',
                }}
            />
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f3762',
        marginBottom: 20,
        width: '100%',
        paddingVertical: 15,
    },
    heading: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    },
    subheaderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Header;