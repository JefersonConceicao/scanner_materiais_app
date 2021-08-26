import {
    REQ_SCANNER,
    SCANNER,
} from '../../constants/actionsTypes';

export const ReqScanner = payload => ({
    type: REQ_SCANNER,
    payload,
})

export const Scanner = payload => ({
    type:SCANNER,
    payload
})