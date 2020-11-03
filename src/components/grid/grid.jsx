import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './grid.scss'

class Grid extends Component {
  render() {
    const { isShowCamera } = this.props
    return isShowCamera ? (
      <div className="grid-container">
        <div className="grid"></div>
        <div className="grid"></div>
        <div className="grid"></div>
        <div className="grid"></div>
        <div className="grid"></div>
        <div className="grid"></div>
        <div className="grid"></div>
        <div className="grid"></div>
        <div className="grid"></div>
      </div>
    ) : null
  }
}

function mapStateToProps(state) {
  return { isShowCamera: state.app.isShowCamera }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)
