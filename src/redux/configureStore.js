import { createStore } from 'redux'
import { types } from './actions'

const initialState = {
  pokeData: []
}

const reducer = function(state = initialState, action) {
  if (types.GET_DATA) {
    console.log('Hallo from reducer');
    return {
      ...state
    }
  }
}

const configureStore = createStore(reducer)

export default configureStore