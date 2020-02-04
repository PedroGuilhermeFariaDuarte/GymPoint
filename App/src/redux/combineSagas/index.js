import { all } from 'redux-saga/effects';

// Middlewares
import MiddlewareAuth from '../reducers/Auth/middlewares';
//import MiddlewarePlanos from '../reducers/Planos/middlewares';

export default function* combineSagas() {
    return yield all([MiddlewareAuth]);
}
