import {
  REQ_MATERIAIS, 
  MATERIAIS,
  REQ_SAVEMATERIAIS,
  SAVE_MATERIAIS,
  REQ_UPDATEMATERIAIS,
  UPDATE_MATERIAIS,
  REQ_DELETEMATERIAIS,
  DELETE_MATERIAIS,
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

export const ReqUpdateMateriais = payload => ({
  type: REQ_UPDATEMATERIAIS,
  payload
})

export const UpdateMateriais = payload => ({
  type: UPDATE_MATERIAIS,
  payload
})

export const ReqDeleteMateriais = id => ({
  type:REQ_DELETEMATERIAIS,
  id
})

export const DeleteMateriais = payload => ({
  type:DELETE_MATERIAIS,
  payload
})