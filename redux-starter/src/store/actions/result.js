import { DELETE_RESULT, STORE_RESULT } from './actionsTypes'

export const saveResult = payload => ({ type: STORE_RESULT, payload })

export const storeResult = payload => (dispatch, getState) =>
  dispatch(saveResult(payload))

export const deleteResult = payload => ({ type: DELETE_RESULT, payload })
