import {
  REQ_MATERIAIS, 
  MATERIAIS,
  REQ_SAVEMATERIAIS,
  SAVE_MATERIAIS,
} from '../../constants/actionsTypes';

const initialState = {
  loadingMateriais: false,
  dataMateriais: [],

  loadingSaveMateriais:false,
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
    case REQ_SAVEMATERIAIS: 
      return {
        ...state,
        loadingSaveMateriais:true,
      }
    case SAVE_MATERIAIS:
      return {
        ...state,
        loadingSaveMateriais:false,
      }
    default:
      return {
        ...state,
      };
  }
}
