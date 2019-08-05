import * as actionsType from '../actions/actionsTypes'
import { updateObject } from '../utility'

const initialState = {
  counter: 0,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.INCREMENT:
      return updateObject(state, { counter: state.counter + 1 })
    case actionsType.DECREMENT:
      return updateObject(state, { counter: state.counter - 1 })
    case actionsType.ADD:
      return updateObject(state, { counter: state.counter + action.payload })
    case actionsType.SUB:
      return updateObject(state, { counter: state.counter - action.payload })
    default:
      return state
  }
}

export default reducer
