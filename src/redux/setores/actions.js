import { 
    REQ_SETORES,
    SETORES
} from '../../constants/actionsTypes';

export const ReqSetores = payload => ({
    type: REQ_SETORES,
    payload
})

export const Setores = payload => ({
    type: SETORES,
    payload 
})
