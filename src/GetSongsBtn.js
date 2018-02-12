import React, { Component } from 'react'
import { connect } from 'react-redux'
import { refreshSongs } from './state/actions'

import './GetSongsBtn.css'

class GetSongsBtn extends Component {
  _refreshSongs = () => {
    this.props.dispatch(refreshSongs())
  }

  render () {
    return (
      <button className='GetSongsBtn' onClick={this._refreshSongs}>
        Refresh Songs
      </button>
    )
  }
}

export default connect()(GetSongsBtn)
