import { 
    REQ_SETORES,
    SETORES,
    SET_SETOR_ID,
    REQ_DELETE_SETOR,
    DELETE_SETOR,
} from '../../constants/actionsTypes';

const initialState = {
    loadingSetores: false,
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
        case SET_SETOR_ID:
            return {
                ...state,
                setorID: !!action.payload
                ? action.payload
                : state.setorID
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
        default: 
            return{
                ...state
            }
    }
}
