import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

interface CheckboxProps {
    label: string;
    isChecked: boolean;
    onChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({label, isChecked, onChange}) => {
    const handleCheckboxChange = (value: boolean) => {
        onChange(value);
    };

    return (
        <View style={styles.checkboxContainer}>
            <Switch
                style={styles.checkbox}
                trackColor={{true: '#dcdcdc', false: '#a9a9a9'}}
                thumbColor={!isChecked ? '#c0c0c0' : '#f5f5f5'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={handleCheckboxChange}
                value={isChecked}
            />
            <Text style={styles.label}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 8,
    },
    label: {
        fontSize: 16,
    },
});

export default Checkbox;
