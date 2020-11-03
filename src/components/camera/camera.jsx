import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import { setImageUrl, showCropImage } from '../../redux/app.js'

import './camera.scss'

class CameraPage extends Component {
  constructor(props) {
    super(props)

    const root = document.getElementById('root')
    this.state = {
      width: root.clientWidth,
      height: root.clientHeight,
    }

    this.handleTakePhoto = this.handleTakePhoto.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
  handleResize() {
    const container = document.getElementById('camera-container')
    if (container) {
      this.setState({
        width: container.clientWidth,
        height: container.clientHeight,
      })
    }
  }

  handleTakePhoto(dataUri) {
    const { setImageUrl, showCropImage } = this.props
    // Do stuff with the photo...
    // console.log('takePhoto', dataUri)
    setImageUrl(dataUri)
    showCropImage()
  }
  render() {
    const { isShowCamera } = this.props
    return isShowCamera ? (
      <div className="camera-container" id="camera-container">
        <Camera
          isFullscreen={true}
          isImageMirror={false}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          imageType={IMAGE_TYPES.JPG}
          isMaxResolution={true}
          isDisplayStartCameraError={true}
          sizeFactor={1}
          onTakePhoto={dataUri => {
            this.handleTakePhoto(dataUri)
          }}
          onCameraError={err => {
            console.error(err)
          }}
        />
      </div>
    ) : null
  }
}

function mapStateToProps(state) {
  return {
    isShowCamera: state.app.isShowCamera,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setImageUrl, showCropImage }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraPage)
