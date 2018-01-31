import { combineReducers } from 'redux'

function songs (state = [], action) {
  switch (action.type) {
    case 'GET_DOORSTEPS_SONGS_SUCCESS':
      return action.songs

    default:
      return state
  }
}

const rootReducer = combineReducers({
  songs
})

export default rootReducer
