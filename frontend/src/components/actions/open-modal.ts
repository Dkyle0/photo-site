import { ModalParams } from '../types/d';
import { ACTION_TYPE } from './type';

export const openModal = (modalParams: ModalParams) => ({
	type: ACTION_TYPE.OPEN_MODAL,
	payload: modalParams,
  });
