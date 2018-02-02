import fetch from 'fetch-jsonp'
import moment from 'moment'

export function getDoorstepsSongs () {
  return dispatch => {
    const doorSongs = 'https://itunes.apple.com/search?country=us&media=music&limit=100&attribute=songTerm&term=door&sort=ratingIndex'
    const stepsSongs = 'https://itunes.apple.com/search?country=us&media=music&limit=100&attribute=songTerm&term=steps&sort=ratingIndex'
    const req1 = fetch(doorSongs)
    const req2 = fetch(stepsSongs)
    const compareFunction = (a, b) => {
      let a_trackName = a.trackName.replace('The ', '')
      let b_trackName = b.trackName.replace('The ', '')
      if (a.releaseYear < b.releaseYear) {
        return -1;
      } else if (a.releaseYear > b.releaseYear) {
        return 1;
      }
      if (a_trackName < b_trackName) {
        return -1;
      } else if (a_trackName > b_trackName) {
        return 1;
      } else {
        return 0;
      }
    }

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

      // Concatenate results into one arry of data.
      const jsonResultSet = jsonResponses[0].results.concat(jsonResponses[1].results)

      // Assign 'year' property on each entry based on releaseDate property.
      jsonResultSet.forEach(entry => {
        return entry['releaseYear'] = moment(entry['releaseDate']).format('YYYY')
      });

      // Set final results array by sorting our results data using our custom 
      // compare function which sorts first by year, then by title.
      const combinedResults = jsonResultSet ? jsonResultSet.sort(compareFunction) : [];

      return dispatch({
        type: 'GET_DOORSTEPS_SONGS_SUCCESS',
        songs: combinedResults
      })
    })
    .catch(err => console.error('Error in response :_(', err))
  }
}


