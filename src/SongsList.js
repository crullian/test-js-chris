import React from 'react'
import moment from 'moment'

// TODO:
// Track runtime below is in milliseconds. Format it to MM:SS

const SongsList = ({songs}) => (
  <div className='SongsList__flex-container'>
    {
      songs.map((song, index) => {
        const trackTime  = moment(song.trackTimeMillis).format('mm:ss');
        return (
          <div key={index} className='SongsList__song-item-container'>
            <img src={song.artworkUrl100} width='160' height='160' alt='track artwork' className='SongsList__song-item-img' />
            <div className='SongsList__song-item-info'>
              <h3>{song.trackName}</h3>
              <p>{song.artistName}</p>
              {/*<p>{song.collectionName}</p>*/}
              <p>{trackTime}</p>
              <p>{song.releaseYear}</p>
              <audio
                controls
                src={song.previewUrl}
                className='SongsList__song-item-audio-controls'
              />
            </div>
          </div>
        )
      })
    }
  </div>
)

export default SongsList
