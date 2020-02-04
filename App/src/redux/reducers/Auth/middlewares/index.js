import { put, all, takeLatest } from 'redux-saga/effects';

//Actions Redux
import * as SignAccounts from '../actions';

// Middleware's saga
function* teste(action) {
    console.tron.log(action.payload);
    yield put(SignAccounts.signIn(action.payload));
}

// Exporta o listener do saga
export default all([takeLatest('@auth/SIGN_IN_REQUEST', teste)]);
