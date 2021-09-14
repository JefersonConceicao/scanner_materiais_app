import { 
    REQ_SETORES,
    SETORES,
    SET_SETOR_ID,
} from '../../constants/actionsTypes';

export const ReqSetores = payload => ({
    type: REQ_SETORES,
    payload
})

export const Setores = payload => ({
    type: SETORES,
    payload 
})

export const SetSetorID = payload => ({
    type: SET_SETOR_ID,
    payload
})