import { call, fork, put, select, takeLatest } from "redux-saga/effects";
import api from '../../../services/api';
import {
    REQ_SCANNER,
    SCANNER,
} from '../../constants/actionsTypes';
import {
    Scanner
} from './actions';

function* scannerSaga({ payload }){
    try{
        console.log(payload)
        const { data } = yield call(apiScanner, payload);

        if(data){
            yield put(Scanner(data));
        }else{
            yield put(Scanner());
        }
    }catch(error){
        yield put(Scanner());
    }
}

const apiScanner = async payload => {
    const response = api.post('/api/scanner', payload);
    console.log(response);
    return response;
}


//WATCHERS
function* watchScannerSaga(){
    yield takeLatest(REQ_SCANNER, scannerSaga)
}

export default function* rootSaga(){
    yield fork(watchScannerSaga);
}