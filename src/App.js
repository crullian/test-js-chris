import React, { Component } from 'react'
import { connect } from 'react-redux'
import SongsList from './SongsList'
import Loader from './Loader'
import GetSongsBtn from './GetSongsBtn'
import { getDoorstepsSongs } from './state/actions'

class App extends Component {

  componentWillMount() {
    this.props.dispatch(getDoorstepsSongs());
  }

  componentDidMount() {
    const shrinkHeader = 10;
    const header = document.getElementsByClassName('App__header')[0];
    const getCurrentScroll = () => {
      return window.pageYOffset || document.documentElement.scrollTop;
    }
    window.addEventListener('scroll', function() {
      if ( getCurrentScroll() >= shrinkHeader ) {
        header.classList.add('shrink');
      } else {
        header.classList.remove('shrink');
      }
    });
  }

  render() {
    const {songs} = this.props;

    const content = songs.length === 0
    ? <Loader />
    : <SongsList songs={songs} />

    return (
      <main>
        <header className='App__header'>
          <h1 className='App__header-welcome'>Welcome to Doorsteps Songs!</h1>
        </header>

        <GetSongsBtn />
        
        { content }

      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songs
  }
}

export default connect(mapStateToProps)(App)
