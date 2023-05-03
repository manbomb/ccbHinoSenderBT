import React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';

interface RowProps extends ViewProps {
    children: React.ReactNode;
}

const Row: React.FC<RowProps> = ({children, style, ...rest}) => {
    return (
        <View style={[styles.row, style]} {...rest}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Row;
