import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

//Config
import './config/reactoTronConfig';

// Redux With React
import { Provider } from 'react-redux';

// Redux Store
import { store, persistor } from './redux';

//Global Style
import GlobalStyle from './styles/global';

// Routes
import Routes from './routes';
import RoutesForCRUD from './routes/crud';

function App() {
    return (
        <>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <BrowserRouter>
                        <Routes />
                        <RoutesForCRUD />
                        <ToastContainer />
                        <GlobalStyle />
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </>
    );
}

export default App;
