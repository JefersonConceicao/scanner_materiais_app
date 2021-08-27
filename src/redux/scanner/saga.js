import { call, fork, put, select, takeLatest } from "redux-saga/effects";
import api from '../../../services/api';
import {
    REQ_SCANNER
} from '../../constants/actionsTypes';
import {
    Scanner
} from './actions';

function* scannerSaga({ payload }) {
    try {
        const { data } = yield call(apiScanner, payload);
        yield put(Scanner(data));
    } catch (error) {
        yield put(Scanner());
    }
}

const apiScanner = async payload => {
    const response = api.get('/api/scanner', {params: payload} );
    return response;
}

//WATCHERS
function* watchScannerSaga() {
    yield takeLatest(REQ_SCANNER, scannerSaga)
}

export default function* rootSaga() {
    yield fork(watchScannerSaga);
}