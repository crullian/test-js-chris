import React from 'react'

const SongsList = ({songs}) => (
  <div className='SongsList__flex-container'>
    {
      songs.map((song, index) => {
        return (
          <div key={index} className='SongsList__song-item-container'>
            <img src={song.artworkUrl100} width='160' height='160' alt='track artwork' className='SongsList__song-item-img' />
            <div className='SongsList__song-item-info'>
              <h3>{song.trackName}</h3>
              <p>{song.artistName}</p>
              {/*<p>{song.collectionName}</p>*/}
              <p>{msToMMSS(song.trackTimeMillis)}</p>
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

function msToMMSS(ms) {
  const minutes = Math.floor(ms / 60000)
  const seconds = ((ms % 60000) / 1000).toFixed(0)

  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
}

export default SongsList
