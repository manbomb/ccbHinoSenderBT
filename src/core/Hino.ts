export default class Hino {
    id: number;
    bpmMin?: number;
    bpmMax?: number;
    bpm?: number;

    constructor(readonly number: number, readonly isChoir: boolean) {
        if (number > 480) {
            throw new Error('Invalid Id (id > 480)');
        }
        if (isChoir && number > 6) {
            throw new Error('Invalid Id (isChoir > 6)!');
        }

        this.id = isChoir ? number + 480 : number;
    }

    setBpm(value: number): Hino {
        if (!this.bpmMax || !this.bpmMin) {
            throw new Error('Min/Max Bpm are not defined!');
        }
        if (value > this.bpmMax || value < this.bpmMin) {
            throw new Error('BPM value not valid!');
        }
        this.bpm = value;
        return this;
    }
}
