import React from 'react';
import {HinosProvider} from './contexts/HinosContext';
import Main from './pages/Main';
import HinosRepositoryJson from './core/HinosRepositoryJson';
import ToastProvider from 'react-native-toast-message';
import SendHinoGatewayReal from './core/SendHinoGatewayReal';

const App = () => {
    const hinosRepository = new HinosRepositoryJson();
    const sendHinoGateway = new SendHinoGatewayReal();

    return (
        <React.Fragment>
            <HinosProvider
                hinosRepository={hinosRepository}
                sendHinoGateway={sendHinoGateway}>
                <Main />
            </HinosProvider>
            <ToastProvider autoHide={true} visibilityTime={8} />
        </React.Fragment>
    );
};

export default App;
