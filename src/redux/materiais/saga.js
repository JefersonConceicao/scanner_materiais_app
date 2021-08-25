import {takeLatest, call, fork, put} from 'redux-saga/effects';
import api from '../../../services/api';
import {REQ_MATERIAIS} from '../../constants/actionsTypes';
import {Materiais} from '../actions';
function* getMateriaisSaga({payload}) {
  try{
    console.log(payload)
      const { data } = yield call(apiGetMateriais, payload)
      yield put(Materiais(data));
  }catch(error){  
    console.log(error)
    yield put(Materiais());
  }
}

const apiGetMateriais = async payload => {
  const response = api.get(`/api/listMateriais/${payload.setor_id}`)
  return response
}

//WATCHERS
function* watchGetMateriaisSaga() {
  yield takeLatest(REQ_MATERIAIS, getMateriaisSaga);
}

export default function* rootSaga() {
  yield fork(watchGetMateriaisSaga);
}
