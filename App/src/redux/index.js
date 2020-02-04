import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

// Combine Reducers
import CombineReducers from './combineReducers';
// Combine Middlewares
import CombineMiddlewares from './combineSagas';
// Persisted Reducers
import persistReducer from './reducers';

const sagaMonitor =
    process.env.NODE_ENV === 'development'
        ? console.tron.createSagaMonitor()
        : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const enhance =
    process.env.NODE_ENV === 'development'
        ? compose(
              console.tron.createEnhancer(),
              applyMiddleware(sagaMiddleware)
          )
        : applyMiddleware(sagaMiddleware);

const store = createStore(persistReducer(CombineReducers), enhance);
const persistor = persistStore(store);

sagaMiddleware.run(CombineMiddlewares);

export { store, persistor };
