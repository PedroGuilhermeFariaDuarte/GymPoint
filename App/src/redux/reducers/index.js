import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
    const persistedReducer = persistReducer(
        {
            key: 'gympoint',
            storage,
            whilelst: ['Aluno', 'Auth'],
        },
        reducers
    );

    return persistedReducer;
};
