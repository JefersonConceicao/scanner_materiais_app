import {REQ_MATERIAIS, MATERIAIS} from '../../constants/actionsTypes';

const initialState = {
  loadingMateriais: false,
  dataMateriais: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQ_MATERIAIS:
      return {
        ...state,
        loadingMateriais: true,
      };
    case MATERIAIS:
      return {
        ...state,
        loadingMateriais: false,
        dataMateriais: !!action.payload ? action.payload : state.dataMateriais,
      };
    default:
      return {
        ...state,
      };
  }
}
