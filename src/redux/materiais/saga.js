import {takeLatest, call, fork, put} from 'redux-saga/effects';
import api from '../../../services/api';
import {
  REQ_MATERIAIS,
  REQ_SAVEMATERIAIS,
} from '../../constants/actionsTypes';

import { Materiais, SaveMateriais } from '../actions';

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

const apiGetMateriais = async payload => {
  const response = api.get(`/api/listMateriais/${payload.setor_id}`)
  return response
}

const apiSaveMateriais = async payload => {
  const response = api.post('/api/saveMateriais', payload)
  return response
}

//WATCHERS
function* watchGetMateriaisSaga() {
  yield takeLatest(REQ_MATERIAIS, getMateriaisSaga);
}
function* watchSaveMateriaisSaga(){
  yield takeLatest(REQ_SAVEMATERIAIS, saveMateriaisSaga);
}

export default function* rootSaga() {
  yield fork(watchGetMateriaisSaga);
  yield fork(watchSaveMateriaisSaga);
}
