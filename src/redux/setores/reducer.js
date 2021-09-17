import { 
    REQ_SETORES,
    SETORES,
    REQ_CREATE_SETOR,
    CREATE_SETOR,
    REQ_DELETE_SETOR,
    DELETE_SETOR,
    SET_SETOR_ID,
} from '../../constants/actionsTypes';

const initialState = {
    loadingSetores: false,
    loadingCreateSetor:false,
    loadingDeleteSetor: false,

    dataSetores:[],
    setorID:null,
}

export default function(state = initialState, action){
    switch(action.type){
        case REQ_SETORES:
            return {
                ...state,
                loadingSetores:true,
            }   
        case SETORES:
            return {
                ...state,
                loadingSetores:false,
                dataSetores:!!action.payload 
                    ? action.payload
                    : state.dataSetores
            }
        case REQ_CREATE_SETOR:
            return {
                ...state,
                loadingCreateSetor: true,
            }
        case CREATE_SETOR:
            return {
                ...state,
                loadingCreateSetor:false,
                dataSetores: !!action.payload 
                    ? action.payload 
                    : state.dataSetores
            }
        case REQ_DELETE_SETOR:  
            return {
                ...state,
                loadingDeleteSetor: true
            }
        case DELETE_SETOR:
            return {
                ...state,
                loadingDeleteSetor: false,
                dataSetores: !!action.payload 
                    ? action.payload
                    : state.dataSetores
            }
        case SET_SETOR_ID:
            return {
                ...state,
                setorID: !!action.payload
                ? action.payload
                : state.setorID
            }
        default: 
            return{
                ...state
            }
    }
}
