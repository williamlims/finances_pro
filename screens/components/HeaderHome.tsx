import React from 'react';
import { StyleSheet } from 'react-native';
import { Header as HeaderRNE } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

type HeaderComponentProps = {
    title: string;
    view?: string;
};

const HeaderHome: React.FunctionComponent<HeaderComponentProps> = (props) => {
    const navigation = useNavigation();
    return (
        <HeaderRNE
            centerComponent={{ text: props.title, style: styles.heading }}
            containerStyle={{
                backgroundColor: '#0f3762',
            }}
        />
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#397af8',
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

export default HeaderHome;