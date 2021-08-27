import {
  REQ_MATERIAIS, 
  MATERIAIS,
  REQ_SAVEMATERIAIS,
  SAVE_MATERIAIS,
} from '../../constants/actionsTypes';

export const ReqMateriais = (payload) => ({
  type: REQ_MATERIAIS,
  payload,
});

export const Materiais = (payload) => ({
  type: MATERIAIS,
  payload,
});

export const ReqSaveMateriais = (payload, afterSubmit)=> ({
  type: REQ_SAVEMATERIAIS,
  payload,
  afterSubmit,
})

export const SaveMateriais = payload => ({
  type: SAVE_MATERIAIS,
  payload
})
