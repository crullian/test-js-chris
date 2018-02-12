import { combineReducers } from 'redux'

function songs (state = [], action) {
  switch (action.type) {
    case 'GET_DOORSTEPS_SONGS_SUCCESS':
    case 'REFRESH_DOORSTEPS_SONGS_SUCCESS':
      console.log('%c  ACTION ->', 'color:chartreuse', action);
      return action.songs

    default:
      return state
  }
}

const rootReducer = combineReducers({
  songs
})

export default rootReducer
