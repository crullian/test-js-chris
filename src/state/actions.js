import fetch from 'fetch-jsonp'

export function getDoorstepsSongs () {
  return dispatch => {
    const doorSongs = 'https://itunes.apple.com/search?country=us&media=music&limit=100&attribute=songTerm&term=door&sort=ratingIndex'
    const stepsSongs = 'https://itunes.apple.com/search?country=us&media=music&limit=100&attribute=songTerm&term=steps&sort=ratingIndex'
    const req1 = fetch(doorSongs)
    const req2 = fetch(stepsSongs)

    return Promise.all([req1, req2])
    .then(responses => responses.map(res => res.json()))
    .then(jsonPromises => Promise.all(jsonPromises))
    .then(jsonResponses => {

      //
      // jsonResponses contains the results of two API requests
      //

      //
      // 1. combine the results of these requests
      // 2. sort the results FIRST by year THEN by title (trackName)
      // 3. each song object in the results needs a releaseYear attribute added
      //    this is used in src/SongsList.js line 32
      //

      const combinedResults = []

      return dispatch({
        type: 'GET_DOORSTEPS_SONGS_SUCCESS',
        songs: combinedResults
      })
    })
  }
}


