import RNBluetoothClassic from 'react-native-bluetooth-classic';

import Hino from './Hino';
import SendHinoGateway from './SendHinoGateway';

export default class SendHinoGatewayReal implements SendHinoGateway {
    private async bluetoothIsAvailable(): Promise<boolean> {
        try {
            const available = await RNBluetoothClassic.isBluetoothAvailable();
            return available;
        } catch (err) {
            throw new Error(
                'Erro ao verificar se o bluetooth está disponível.',
            );
        }
    }

    private async bluetoothIsEnabled(): Promise<boolean> {
        try {
            const enabled = await RNBluetoothClassic.isBluetoothEnabled();
            return enabled;
        } catch (err) {
            throw new Error('Erro ao verificar se o bluetooth está ligado.');
        }
    }

    private async connectToDeviceAndSendHino(hino: Hino): Promise<void> {
        const DEVICE_NAME = 'ESP_SPP_ACCEPTOR';
        const devices = await RNBluetoothClassic.getBondedDevices();
        const foundedDevices = devices.filter(
            device => device.name === DEVICE_NAME,
        );
        if (foundedDevices.length < 1) {
            throw new Error('Dispositivo não encontrado!');
        }
        const device = foundedDevices[0];
        const connected = await foundedDevices[0].connect();
        if (!connected) {
            throw new Error('Dispositivo não conseguiu ser conectado!');
        }
        await device.write(`${hino.number}.${hino.bpm}`);
    }

    async sendHino(hino: Hino): Promise<Hino> {
        const available = await this.bluetoothIsAvailable();
        if (!available) {
            throw new Error('Bluetooth não está disponível.');
        }
        const enabled = await this.bluetoothIsEnabled();
        if (!enabled) {
            throw new Error('Bluetooth não está habilitado.');
        }
        await this.connectToDeviceAndSendHino(hino);
        return hino;
    }
}
