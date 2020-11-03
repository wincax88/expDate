import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/lib/ReactCrop.scss'
import { Button } from 'antd'
// import { filter, keyBy } from 'lodash-es'
// import { setCurNum, hideAssetView } from '../../redux/asset'
// import Preview from './preview'
// import { getFileData } from '../../lib/api'
import {
  showCamera,
  setCroppedImageUrl,
  showRecognizeResult,
} from '../../redux/app.js'

import './crop-image.scss'

class CropImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      crop: {
        unit: '%',
        x: 10,
        y: 30,
        width: 80,
        height: 30,
      },
      croppedImageUrl: null,
    }

    this.imageRef = null

    this.onCropChange = this.onCropChange.bind(this)
    this.onCropComplete = this.onCropComplete.bind(this)
    this.getCroppedImg = this.getCroppedImg.bind(this)
    this.onCamera = this.onCamera.bind(this)
    this.onRecognize = this.onRecognize.bind(this)
    this.onImageLoaded = this.onImageLoaded.bind(this)
  }
  componentDidMount() {}

  onImageLoaded = image => {
    this.imageRef = image
  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  onCropComplete = crop => {
    if (this.imageRef && crop.width && crop.height) {
      this.getCroppedImg(this.imageRef, crop, 'newFile.jpeg').then(
        croppedImageUrl => {
          this.setState({ croppedImageUrl })
          console.log('croppedImageUrl', croppedImageUrl)
        }
      )
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    return new Promise(resolve => {
      canvas.toBlob(blob => {
        blob.name = fileName // eslint-disable-line no-param-reassign
        window.URL.revokeObjectURL(this.fileUrl)
        this.fileUrl = window.URL.createObjectURL(blob)
        resolve(this.fileUrl)
      }, 'image/jpeg')
    })
  }
  onCamera() {
    const { showCamera } = this.props
    showCamera()
  }
  onRecognize() {
    const { setCroppedImageUrl, showRecognizeResult } = this.props
    setCroppedImageUrl(this.state.croppedImageUrl)
    showRecognizeResult()
  }

  render() {
    const { isShowCropImage, imageUrl } = this.props
    return isShowCropImage ? (
      <div className="crop-image-container">
        <ReactCrop
          src={imageUrl}
          crop={this.state.crop}
          keepSelection={true}
          minWidth={20}
          minHeight={20}
          crossorigin="anonymous"
          onImageLoaded={this.onImageLoaded}
          onChange={newCrop => this.onCropChange(newCrop)}
          onComplete={this.onCropComplete}
        />
        <div className="button-wrap">
          <Button
            shape="circle"
            icon="camera"
            className="camera-button"
            onClick={this.onCamera}
          />
          <Button
            type="primary"
            shape="circle"
            icon="check"
            className="process-button"
            onClick={this.onRecognize}
          />
        </div>
      </div>
    ) : null
  }
}

function mapStateToProps(state) {
  return {
    isShowCropImage: state.app.isShowCropImage,
    imageUrl: state.app.imageUrl,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { showCamera, setCroppedImageUrl, showRecognizeResult },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CropImage)
