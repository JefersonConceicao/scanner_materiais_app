import {REQ_MATERIAIS, MATERIAIS} from '../../constants/actionsTypes';

export const ReqMateriais = (payload) => ({
  type: REQ_MATERIAIS,
  payload,
});

export const Materiais = (payload) => ({
  type: MATERIAIS,
  payload,
});
