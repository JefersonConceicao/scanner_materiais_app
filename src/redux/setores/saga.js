import { call, takeLatest, fork, put, select } from 'redux-saga/effects';
import { Toast } from 'native-base';

import { 
    REQ_SETORES,
    REQ_DELETE_SETOR,
} from '../../constants/actionsTypes';

import {
    Setores,
    DeleteSetor,
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

function* deleteSetoresSaga({ payload, closePopups }){
    try{
        const { Setores } = yield select()
        const { data } = yield call(apiDeleteSetores, payload);
    
        Toast.show({
            text: data.msg,
            type: !data.error ? 'success' : 'danger',
            buttonText: 'Fechar',
            duration:3000,
        })  

        newArrayDataSetores = Setores.dataSetores.filter(value => value.id != payload); 
        yield put(DeleteSetor(newArrayDataSetores));
        closePopups()
    }catch(error){
        console.log(error)
        Toast.show({
            text: 'Não é possível excluir o setor, pois existem materiais vinculado.',
            type: 'danger',
            buttonText: 'Fechar',
            duration:3000,
        })

        yield put(DeleteSetor())
    }
}

const apiGetSetores = async payload => {
    const response = api.get('/api/setores');    
    return response;    
}

const apiDeleteSetores = async payload => {
    console.log(payload);
    const response = api.delete(`/api/deleteSetor/${payload}`);
    return response;
}

function* watchGetSetoresSaga(){
    yield takeLatest(REQ_SETORES, getSetoresSaga);
}
function* watchDeleteSetoresSaga(){
    yield takeLatest(REQ_DELETE_SETOR, deleteSetoresSaga)
}

export default function* rootSaga(){
    yield fork(watchGetSetoresSaga);
    yield fork(watchDeleteSetoresSaga);
}