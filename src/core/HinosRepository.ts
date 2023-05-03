import Hino from './Hino';

export default interface HinosRepository {
    getBpm(hino: Hino): Hino;
}
