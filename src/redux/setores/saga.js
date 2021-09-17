import { call, takeLatest, fork, put, select } from 'redux-saga/effects';
import { Toast } from 'native-base';

import { 
    REQ_SETORES,
    REQ_DELETE_SETOR,
    REQ_CREATE_SETOR,
} from '../../constants/actionsTypes';

import {
    Setores,
    DeleteSetor,
    SetoresCreate,
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

function* createSetoresSaga({payload, closePopups}){
    try{
        const { Setores } = yield select()
        const { data } = yield call(apiCreateSetores, payload)  

        if(!data.error){
            let arraySetores = [data.data_added, ...Setores.dataSetores];
            yield put(SetoresCreate(arraySetores));
        } 
        
        Toast.show({
            text: data.msg,
            type: !data.error ? 'success' : 'danger',
            buttonText: 'Fechar',
            duration: 3000,
        })

        closePopups()
    }catch(error){
        Toast.show({
            text: 'Ocorreu um erro interno, tente novamente mais tarde.',
            type: 'danger',
            buttonText: 'Fechar',
            duration:1500,
        })
        yield put(SetoresCreate());
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
            duration:1500,
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
    const response = api.delete(`/api/deleteSetor/${payload}`);
    return response;
}

const apiCreateSetores = async payload => {
    const response = api.post('/api/storeSetor', payload);
    return response;
}

function* watchGetSetoresSaga(){
    yield takeLatest(REQ_SETORES, getSetoresSaga);
}
function* watchDeleteSetoresSaga(){
    yield takeLatest(REQ_DELETE_SETOR, deleteSetoresSaga)
}
function* watchCreateSetoresSaga(){
    yield takeLatest(REQ_CREATE_SETOR, createSetoresSaga)
}

export default function* rootSaga(){
    yield fork(watchGetSetoresSaga);
    yield fork(watchDeleteSetoresSaga);
    yield fork(watchCreateSetoresSaga);
}