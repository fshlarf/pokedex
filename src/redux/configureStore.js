import { createStore } from 'redux'
import { types } from './actions'

const initialState = {
  pokeData: []
}

const reducer = function(state = initialState, action) {
  if (types.STORE_DATA) {
    return {
      ...state,
      pokeData: [...state.pokeData, action.payload]
    }
  }
}

const configureStore = createStore(reducer)

export default configureStore