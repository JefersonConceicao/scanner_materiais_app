import { all } from 'redux-saga/effects';
import Scanner from './scanner/saga';


export default function* rootSaga(){
    yield all([
        Scanner(),
    ])
}