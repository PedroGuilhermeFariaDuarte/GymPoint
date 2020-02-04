import { put, all, takeLatest } from 'redux-saga/effects';

import * as PlanoActions from '../action';

function* setPlano(action) {
    yield put(PlanoActions.setPlano(action.payload));
}

export default all([takeLatest('@plano/PLANO_SELECIONADO_REQUEST', setPlano)]);
