/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Button from '../components/Button';
import Row from '../components/Row';
import Checkbox from '../components/Checkbox';
import Hino from '../core/Hino';
import HinosContext from '../contexts/HinosContext';
import IntegerSlider from '../components/IntegerSlider';

const Main = () => {
    const {procurarHino, enviarHino} = useContext(HinosContext);

    const [numero, setNumero] = useState('');
    const [corinho, setCorinho] = useState(false);
    const [minBpm, setMinBpm] = useState<number | null>(null);
    const [maxBpm, setMaxBpm] = useState<number | null>(null);
    const [bpm, setBpm] = useState<number | null>(null);

    const setNumeroHandle = (text: string): void => {
        setNumero(text.replace(/\D/g, '').slice(0, 3));
    };

    const onNumeroCorinhoChange = (pNumero: string, pCorinho: boolean) => {
        if (!pNumero) {
            setMinBpm(null);
            setMaxBpm(null);
            return;
        }
        try {
            // eslint-disable-next-line no-new
            new Hino(parseInt(pNumero, 10), pCorinho);
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Este hino/corinho não está no hinário',
                text2: 'da Congregação Cristã no Brasil.',
                autoHide: false,
            });
            setMinBpm(null);
            setMaxBpm(null);
            setNumero('');
            setCorinho(false);
        }
    };

    const onPressProcurar = () => {
        if (!numero) {
            Toast.show({
                type: 'error',
                text1: 'Escolha um hino primeiro',
                autoHide: false,
            });
            return;
        }
        const hino = new Hino(parseInt(numero, 10), corinho);
        const hinoEncontrado = procurarHino(hino);
        setMinBpm(hinoEncontrado.bpmMin || null);
        setMaxBpm(hinoEncontrado.bpmMax || null);
        if (hinoEncontrado.bpmMax && hinoEncontrado.bpmMin) {
            setBpm((hinoEncontrado.bpmMax + hinoEncontrado.bpmMin) / 2);
        }
        Keyboard.dismiss();
    };

    const onPressEnviar = async () => {
        if (!bpm) {
            Toast.show({
                type: 'error',
                text1: 'Escolha um andamento primeiro',
                autoHide: false,
            });
            return;
        }
        const hino = new Hino(parseInt(numero, 10), corinho);
        const hinoEncontrado = procurarHino(hino);
        hinoEncontrado.setBpm(bpm);
        try {
            await enviarHino(hinoEncontrado);
            Toast.show({
                type: 'success',
                text1: 'Hino enviado com sucesso!',
                autoHide: false,
            });
        } catch (e) {
            console.error(e);
            Toast.show({
                type: 'error',
                text1: 'Erro ao tentar enviar o hino!',
                autoHide: false,
            });
        }
    };

    useEffect(() => {
        onNumeroCorinhoChange(numero, corinho);
    }, [numero, corinho]);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Title text="CCB" />
                <Row style={{marginTop: 16}}>
                    <TextInput
                        keyboardType={'number-pad'}
                        style={{...styles.inputText}}
                        placeholder="Hino"
                        value={numero}
                        onChange={e => setNumeroHandle(e.nativeEvent.text)}
                    />
                    <Button
                        title="Procurar"
                        onPress={() => onPressProcurar()}
                    />
                </Row>
                <Row style={{marginTop: 16}}>
                    <Checkbox
                        label="Corinho"
                        isChecked={corinho}
                        onChange={v => setCorinho(v)}
                    />
                </Row>
                {minBpm && (
                    <View
                        style={{
                            ...styles.andamentoContainer,
                        }}>
                        <Row>
                            <IntegerSlider
                                instruction="Escolha um andamento:"
                                min={minBpm || 0}
                                max={maxBpm || 100}
                                onChange={value => setBpm(value)}
                            />
                        </Row>
                        <Row style={{marginTop: 30}}>
                            <Button
                                title="Enviar o hino"
                                onPress={() => onPressEnviar()}
                            />
                        </Row>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const Title = ({text = ''}) => {
    return <Text style={styles.title}>{text}</Text>;
};

const styles = StyleSheet.create({
    andamentoContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 30,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#333',
    },
    title: {
        fontSize: 50,
        color: '#ffffff',
    },
    inputText: {
        width: 100,
        height: 50,
        paddingLeft: 12,
        borderColor: '#fff',
        backgroundColor: '#fff',
    },
    button: {
        width: 100,
        height: 50,
        paddingLeft: 12,
        borderColor: '#fff',
        backgroundColor: '#fff',
    },
});

export default Main;
