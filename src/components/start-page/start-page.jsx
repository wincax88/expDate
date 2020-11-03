import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'antd'
// import { filter, keyBy } from 'lodash-es'
// import { setCurNum, hideAssetView } from '../../redux/asset'
// import Preview from './preview'
// import { getFileData } from '../../lib/api'
import { showCamera } from '../../redux/app.js'

import './start-page.scss'

class StartPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.onStart = this.onStart.bind(this)
  }
  componentDidMount() {}

  onStart() {
    const { showCamera } = this.props
    showCamera()
  }

  render() {
    const { isShowStartPage } = this.props
    return isShowStartPage ? (
      <div className="start-pahge-container">
        <Button
          type="primary"
          shape="circle"
          icon="scan"
          className="start-button"
          onClick={this.onStart}
        />
      </div>
    ) : null
  }
}

function mapStateToProps(state) {
  return {
    isShowStartPage: state.app.isShowStartPage,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showCamera }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage)
