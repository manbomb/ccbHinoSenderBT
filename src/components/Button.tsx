import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

interface ButtonProps {
    onPress: () => void;
    title: string;
}

const Button: React.FC<ButtonProps> = ({onPress, title}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#777',
        height: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Button;
