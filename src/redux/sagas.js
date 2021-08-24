import { all } from 'redux-saga/effects';
import Scanner from './scanner/saga';
import Setores from './setores/saga';

export default function* rootSaga(){
    yield all([
        Scanner(),
        Setores(),
    ])
}