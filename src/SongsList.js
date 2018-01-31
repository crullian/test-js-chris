import React from 'react'
import { connect } from 'react-redux'

// TODO:
// Track runtime below is in milliseconds. Format it to MM:SS

export function SongsList(props) {
  const { songs } = props

  if (songs.length === 0) return null

  return (
    <table>
      <thead>
        <tr>
          <td></td>
          <td>Year</td>
          <td>Title</td>
          <td>Price</td>
          <td>Description</td>
        </tr>
      </thead>
      <tbody>
        {
          songs.map((song, index) => {
            return (
              <tr key={index}>
                <td><img src={song.artworkUrl100} alt='track artwork' /></td>
                <td>{`Artist: ${song.artistName}`}</td>
                <td>{`Album: ${song.collectionName}`}</td>
                <td>{song.trackName}</td>
                <td>{song.releaseYear}</td>
                <td>{`Runtime: ${song.trackTimeMillis}`}</td>
                <td>{`$${song.trackPrice}`}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

const mapStateToProps = state => {
  return {
    songs: state.songs
  }
}

export default connect(mapStateToProps)(SongsList)
