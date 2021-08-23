import {
    REQ_SCANNER,
    SCANNER,
} from '../../constants/actionsTypes';

const initialState = {
    loadingScanner:false,
    dataScan: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case REQ_SCANNER: 
            return{
                ...state,
                loadingScanner:true,
            }
        case SCANNER:
            return{
                loadingScanner:false,
                dataScan:!!action.payload
                ? action.payload
                : state.dataScan
            }
        default:
            return {
                ...state,
            }
    }
}