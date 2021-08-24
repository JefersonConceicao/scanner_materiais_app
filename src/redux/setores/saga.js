import { call, takeLatest, fork, put } from 'redux-saga/effects';
import { 
    REQ_SETORES,
} from '../../constants/actionsTypes';

import {
    Setores 
} from '../actions';

import api from '../../../services/api';

function* getSetoresSaga({payload}){
    try{
        const { data } = yield call(apiGetSetores, payload);
        
        yield put(Setores(data));
    }catch(error){
        yield put(Setores())
    }
}

const apiGetSetores = async payload => {
    const response = api.get('api/setores');    
    return response;    
}

function* watchGetSetoresSaga(){
    yield takeLatest(REQ_SETORES, getSetoresSaga);
}

export default function* rootSaga(){
    yield fork(watchGetSetoresSaga);
}