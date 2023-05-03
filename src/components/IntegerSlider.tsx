import React, {useState} from 'react';
import {View, Text, Slider, StyleSheet} from 'react-native';

interface IntegerSliderProps {
    min: number;
    max: number;
    instruction: string;
    onChange: (value: number) => void;
}

const IntegerSlider: React.FC<IntegerSliderProps> = ({
    min,
    max,
    instruction,
    onChange,
}) => {
    const [value, setValue] = useState(Math.floor((min + max) / 2));

    const handleValueChange = (newValue: number) => {
        const intValue = Math.round(newValue);
        if (intValue >= min && intValue <= max) {
            setValue(intValue);
            onChange(intValue);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.instruction}>{instruction}</Text>
            <View style={styles.sliderContainer}>
                <Slider
                    style={styles.slider}
                    minimumValue={min}
                    maximumValue={max}
                    step={1}
                    value={value}
                    onValueChange={handleValueChange}
                />
                <Text style={styles.value}>{value}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        width: '80%',
        alignItems: 'center',
    },
    instruction: {
        fontSize: 18,
        marginBottom: 10,
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    slider: {
        flex: 1,
    },
    value: {
        width: 50,
        textAlign: 'center',
        fontSize: 18,
    },
});

export default IntegerSlider;
