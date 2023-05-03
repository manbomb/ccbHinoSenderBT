import Hino from './Hino';
import SendHinoGateway from './SendHinoGateway';

export default class SendHinoGatewayFake implements SendHinoGateway {
    async sendHino(hino: Hino): Promise<Hino> {
        console.log(hino);
        return hino;
    }
}
