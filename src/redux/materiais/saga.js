import {takeLatest, call, fork, put, select} from 'redux-saga/effects';
import api from '../../../services/api';
import {
  REQ_MATERIAIS,
  REQ_SAVEMATERIAIS,
  REQ_UPDATEMATERIAIS,
} from '../../constants/actionsTypes';
import { Toast } from 'native-base';

import { Materiais, SaveMateriais, UpdateMateriais } from '../actions';

function* getMateriaisSaga({payload}) {
  try{
      const { data } = yield call(apiGetMateriais, payload)
      yield put(Materiais(data));
  }catch(error){  
    console.log(error)
    yield put(Materiais());
  }
}

function* saveMateriaisSaga({ payload, afterSubmit}){
  try{
    const { data } = yield call(apiSaveMateriais, payload);
    yield put(SaveMateriais());
    afterSubmit(data);
  }catch(error){
    console.log(error)
    yield put(SaveMateriais());
  }
}

function* updateMateriaisSaga({ payload }){
  try{
    const { data } = yield call(apiUpdateMateriais, payload);
    const { Materiais } = yield select();
  
    Toast.show({
      text: data.msg,
      type: !data.error ? 'success' : 'danger',
      buttonText: 'Fechar',
      duration:3000,  
    })
  }catch(error){
    Toast.show({
      text: 'Ocorreu um erro interno, tente de novo mais tarde.',
      type: 'danger',
      buttonText: 'Fechar',
      duration:3000,  
    })

    yield put(UpdateMateriais());
  }
}

const apiGetMateriais = async payload => {
  const response = api.get(`/api/listMateriais/${payload.setor_id}`)
  return response
}

const apiSaveMateriais = async payload => {
  const response = api.post('/api/saveMateriais', payload)
  return response
}

const apiUpdateMateriais = async payload => {
  const { id } = payload;

  const response = api.put(`/api/updateMateriais/${id}`, payload);
  return response;
}
//WATCHERS
function* watchGetMateriaisSaga() {
  yield takeLatest(REQ_MATERIAIS, getMateriaisSaga);
}
function* watchSaveMateriaisSaga(){
  yield takeLatest(REQ_SAVEMATERIAIS, saveMateriaisSaga);
}
function* watchUpdateMateriaisSaga(){
  yield takeLatest(REQ_UPDATEMATERIAIS, updateMateriaisSaga)
}

export default function* rootSaga() {
  yield fork(watchGetMateriaisSaga);
  yield fork(watchSaveMateriaisSaga);
  yield fork(watchUpdateMateriaisSaga);
}
