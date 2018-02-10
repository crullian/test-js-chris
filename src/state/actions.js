export function getDoorstepsSongs() {
  return async dispatch => {
    const { songs } = await fetch('http://localhost:4000/songs').then(res => res.json())

    return dispatch({
      type: 'GET_DOORSTEPS_SONGS_SUCCESS',
      songs,
    })
  }
}
