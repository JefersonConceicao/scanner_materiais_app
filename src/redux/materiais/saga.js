import { takeLatest, call, fork, put, select } from 'redux-saga/effects';
import api from '../../../services/api';
import {
  REQ_MATERIAIS,
  REQ_SAVEMATERIAIS,
  REQ_UPDATEMATERIAIS,
  REQ_DELETEMATERIAIS,
} from '../../constants/actionsTypes';
import { Toast } from 'native-base';

import { Materiais, SaveMateriais, UpdateMateriais, DeleteMateriais } from '../actions';

function* getMateriaisSaga({ payload }) {
  try {
    const { data } = yield call(apiGetMateriais, payload)
    yield put(Materiais(data));

  } catch (error) {
    console.log(error)
    yield put(Materiais());
  }
}

function* saveMateriaisSaga({ payload, navigation }) {
  try {
    const { data } = yield call(apiSaveMateriais, payload);
    const { Materiais } = yield select()
    
    if(!data.error){
      let newArrayData = [...[data.register_added], ...Materiais.dataMateriais];
      yield put(SaveMateriais(newArrayData));
    }

    navigation.pop();

    Toast.show({
      text: data.msg,
      type: !data.error ? 'success' : 'danger',
      buttonText: 'Fechar',
      duration: 2000,
    });
  } catch (error) {
    yield put(SaveMateriais());
  }
}

function* updateMateriaisSaga({ payload }) {
  try {
    const { data } = yield call(apiUpdateMateriais, payload);
    const { Materiais } = yield select();

    if (!data.error) {
      //altera indice do array de objetos de materiais
      const materiaisData = Materiais.dataMateriais;
      const index = materiaisData.findIndex(value => value.id == data.register_updated.id);
      materiaisData.splice(index, 1, data.register_updated);
    }

    Toast.show({
      text: data.msg,
      type: !data.error ? 'success' : 'danger',
      buttonText: 'Fechar',
      duration: 3000,
    })

    yield put(UpdateMateriais());
  } catch (error) {
    Toast.show({
      text: 'Ocorreu um erro interno, tente de novo mais tarde.',
      type: 'danger',
      buttonText: 'Fechar',
      duration: 3000,
    })

    yield put(UpdateMateriais());
  }
}

function* deleteMateriaisSaga({ id }) {
  try {
    const { data } = yield call(apiDeleteMateriais, id);
    const { Materiais } = yield select()

    if (!data.error) {
      const newArrayDataMateriais = Materiais.dataMateriais.filter(value => value.id != id);
      
      yield put(DeleteMateriais(newArrayDataMateriais));
    }else{
      yield put(DeleteMateriais())
    }

    Toast.show({
      text: data.msg,
      type: !data.error ? 'success' : 'danger',
      buttonText: 'Fechar',
      duration: 3000,
    })
  } catch (error) {
    Toast.show({
      text: 'Ocorreu um erro interno, tente de novo mais tarde.',
      type: 'danger',
      buttonText: 'Fechar',
      duration: 3000,
    })
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

const apiDeleteMateriais = async id => {
  const response = api.delete(`/api/deleteMateriais/${id}`);
  return response;
}

//WATCHERS
function* watchGetMateriaisSaga() {
  yield takeLatest(REQ_MATERIAIS, getMateriaisSaga);
}
function* watchSaveMateriaisSaga() {
  yield takeLatest(REQ_SAVEMATERIAIS, saveMateriaisSaga);
}
function* watchUpdateMateriaisSaga() {
  yield takeLatest(REQ_UPDATEMATERIAIS, updateMateriaisSaga)
}
function* watchDeleteMateriaisSaga() {
  yield takeLatest(REQ_DELETEMATERIAIS, deleteMateriaisSaga)
}

export default function* rootSaga() {
  yield fork(watchGetMateriaisSaga);
  yield fork(watchSaveMateriaisSaga);
  yield fork(watchUpdateMateriaisSaga);
  yield fork(watchDeleteMateriaisSaga);
}
