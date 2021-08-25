import Scanner from './scanner/reducer';
import Setores from './setores/reducer';
import Materiais from './materiais/reducer';

import { combineReducers } from 'redux';

export const Reducers = combineReducers({
    Scanner,
    Setores,
    Materiais,
})