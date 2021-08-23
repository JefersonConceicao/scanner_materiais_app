import { createStore, applyMiddleware } from 'redux';
import { Reducers } from '../redux/reducers';
import Sagas from './sagas';

import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
export const Store = createStore(Reducers,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(Sagas);