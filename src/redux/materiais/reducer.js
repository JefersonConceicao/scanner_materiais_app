import {
  REQ_MATERIAIS, 
  MATERIAIS,
  REQ_SAVEMATERIAIS,
  SAVE_MATERIAIS,
  REQ_UPDATEMATERIAIS,
  UPDATE_MATERIAIS,
  REQ_DELETEMATERIAIS,
  DELETE_MATERIAIS,
} from '../../constants/actionsTypes';

const initialState = {
  loadingMateriais: false,
  dataMateriais: [],

  loadingSaveMateriais:false,
  loadingUpdateMateriais:false,
  loadingDeleteMateriais:false,
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
        dataMateriais: !!action.payload 
          ? action.payload
          : state.dataMateriais
      }
    case REQ_UPDATEMATERIAIS:
      return {
        ...state,
        loadingUpdateMateriais:true,
      }
    case UPDATE_MATERIAIS:
      return {
        ...state,
        loadingUpdateMateriais:false,
      }
    case REQ_DELETEMATERIAIS:
      return {
        ...state,
        loadingDeleteMateriais:true,
      } 
    case DELETE_MATERIAIS:
      return {
        ...state,
        loadingDeleteMateriais:false,
        dataMateriais: !!action.payload 
          ? action.payload
          : state.dataMateriais
      }
    default:
      return {
        ...state
      };
  }
}
