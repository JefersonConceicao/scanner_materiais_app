import { 
    REQ_SETORES,
    SETORES,
    REQ_CREATE_SETOR,
    CREATE_SETOR,
    REQ_DELETE_SETOR,
    DELETE_SETOR,
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

export const ReqSetoresCreate = payload => ({
    type: REQ_CREATE_SETOR,
    payload,
})

export const SetoresCreate = (payload, closePopups) => ({
    type: CREATE_SETOR,
    payload,
    closePopups,
})

export const ReqDeleteSetor = (payload, closePopups) => ({
    type: REQ_DELETE_SETOR,
    payload,
    closePopups
})

export const DeleteSetor = payload => ({
    type: DELETE_SETOR,
    payload
})

export const SetSetorID = payload => ({
    type: SET_SETOR_ID,
    payload
})