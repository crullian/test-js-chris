import React from 'react'
import GetSongsBtn from './GetSongsBtn'
import SongsList from './SongsList'

export function App(props) {
  return (
    <main>
      <h1>Welcome to Doorsteps Songs!</h1>
      <GetSongsBtn />
      <SongsList />
    </main>
  )
}

export default App
