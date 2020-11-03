import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { Button, Modal, message } from 'antd'
// import { filter, keyBy } from 'lodash-es'
// import { setCurNum, hideAssetView } from '../../redux/asset'
// import Preview from './preview'
// import { getFileData } from '../../lib/api'

import './asset.scss'

class Asset extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {}

  render() {
    return <div className="asset-container"></div>
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Asset)
