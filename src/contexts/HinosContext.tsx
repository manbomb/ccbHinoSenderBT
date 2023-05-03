import React, {createContext, FC} from 'react';
import HinosRepository from '../core/HinosRepository';
import SendHinoGateway from '../core/SendHinoGateway';
import Hino from '../core/Hino';

interface HinosContextType {
    procurarHino(hino: Hino): Hino;
    enviarHino(hino: Hino): Promise<Hino> | Hino;
}

const HinosContext = createContext<HinosContextType>({
    procurarHino: function (hino: Hino): Hino {
        return hino;
    },
    enviarHino: function (hino: Hino): Hino {
        return hino;
    },
});

interface HinosProviderParams {
    children: React.ReactNode;
    hinosRepository: HinosRepository;
    sendHinoGateway: SendHinoGateway;
}

const HinosProvider: FC<HinosProviderParams> = ({
    children,
    hinosRepository,
    sendHinoGateway,
}) => {
    const procurarHino = (hino: Hino): Hino => {
        const hinoWithBpm = hinosRepository.getBpm(hino);
        return hinoWithBpm;
    };

    const enviarHino = async (hino: Hino): Promise<Hino> => {
        return sendHinoGateway.sendHino(hino);
    };

    return (
        <HinosContext.Provider
            value={{
                procurarHino,
                enviarHino,
            }}>
            {children}
        </HinosContext.Provider>
    );
};

export {HinosProvider};
export default HinosContext;
