import Hino from './Hino';

export default interface SendHinoGateway {
    sendHino(hino: Hino): Promise<Hino>;
}
