import * as actionsType from '../actions/actionsTypes'
import { updateObject } from '../utility'

const initialState = {
  results: [],
}

const deleteResult = (state, action) => {
  const updatedArray = [...state.results].filter(
    result => result.id !== action.payload,
  )
  return updateObject(state, { results: updatedArray })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.STORE_RESULT:
      return updateObject(state, {
        results: [...state.results, { value: action.payload, id: new Date() }],
      })
    case actionsType.DELETE_RESULT:
      return deleteResult(state, action)
    default:
      return state
  }
}

export default reducer
