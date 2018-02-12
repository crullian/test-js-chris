export const getDoorstepsSongs = () => {
  return async dispatch => {
    const songs = await fetch('http://localhost:4000/songs').then(res => res.json())

    return dispatch({
      type: 'GET_DOORSTEPS_SONGS_SUCCESS',
      songs,
    })
  }
}

export const refreshSongs = () => {
  return async dispatch => {
    const songs = await fetch('http://localhost:4000/refreshSongs').then(res => res.json())

    return dispatch({
      type: 'REFRESH_DOORSTEPS_SONGS_SUCCESS',
      songs,
    })
  }
}
