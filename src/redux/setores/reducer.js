import { 
    REQ_SETORES,
    SETORES,
    SET_SETOR_ID,
    REMOVE_SETOR_ID,
} from '../../constants/actionsTypes';

const initialState = {
    loadingSetores: false,
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
        default: 
            return{
                ...state
            }
    }
}
