import { ADD, DECREMENT, INCREMENT, SUB } from './actionsTypes'

export const increment = () => ({ type: INCREMENT })

export const decrement = () => ({ type: DECREMENT })

export const add = payload => ({ type: ADD, payload })

export const sub = payload => ({ type: SUB, payload })
