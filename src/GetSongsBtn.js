import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDoorstepsSongs } from './state/actions'

class GetSongsBtn extends Component {
  _requestSongs = () => {
    this.props.dispatch(getDoorstepsSongs())
  }

  render () {
    return (
      <button onClick={this._requestSongs}>
        Get Doorsteps Songs
      </button>
    )
  }
}

export default connect()(GetSongsBtn)
