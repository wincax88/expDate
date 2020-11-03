import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { Button, Modal, message } from 'antd'
// import { filter, keyBy } from 'lodash-es'
// import { setCurNum, hideAssetView } from '../../redux/asset'
// import Preview from './preview'
// import { getFileData } from '../../lib/api'

import './recognize.scss'

class TextRect extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {}

  render() {
    const { top, left, height, width, score } = this.props

    const red = parseInt(255 * score)
    const style = {
      top: top + 10 + 'px',
      left: left + 10 + 'px',
      height: height + 'px',
      width: width + 'px',
      background: `rgba(${red}, 0, 0, 0.33)`,
    }
    return <div className="text-rect-container" style={style}></div>
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TextRect)
