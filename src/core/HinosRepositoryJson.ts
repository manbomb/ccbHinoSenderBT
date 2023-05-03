import Hino from './Hino';
import HinosRepository from './HinosRepository';

import HinosJSON from '../../assets/hinos.json';

type HinoJsonElement = {
    id: number;
    bpmMin: number;
    bpmMax: number;
};

export default class HinosRepositoryJson implements HinosRepository {
    hinosInJson: Array<HinoJsonElement>;

    constructor() {
        this.hinosInJson = HinosJSON;
    }

    getBpm(hino: Hino): Hino {
        const hinoId = hino.id;
        const hinosFilterResult = this.hinosInJson.filter(
            hinoInJson => hinoInJson.id === hinoId,
        );
        if (hinosFilterResult.length < 1) {
            throw new Error('Hino not found in JSON!');
        }
        const foundHino = hinosFilterResult[0];
        hino.bpmMax = foundHino.bpmMax;
        hino.bpmMin = foundHino.bpmMin;
        return hino;
    }
}
