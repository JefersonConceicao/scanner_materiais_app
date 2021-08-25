import { 
    REQ_SETORES,
    SETORES
} from '../../constants/actionsTypes';

const initialState = {
    loadingSetores: false,
    dataSetores:[]
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
        default: 
            return{
                ...state
            }
    }
}
