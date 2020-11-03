import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { message } from 'antd'
// import { filter, keyBy } from 'lodash-es'
// import { setCurNum, hideAssetView } from '../../redux/asset'
import TextRect from './recognize-text-rect'
import { recognize } from '../../lib/api'
import { setBlocks } from '../../redux/app'

import './recognize.scss'

class RecognizeResult extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {}
  componentDidUpdate(prevProps) {
    const { isShowRecognizeResult } = this.props
    if (isShowRecognizeResult && !prevProps.isShowRecognizeResult) {
      this.doRecognize()
    }
  }
  doRecognize() {
    const { croppedImageUrl, setBlocks } = this.props
    fetch(croppedImageUrl)
      .then(res => res.blob())
      .then(blob => {
        var reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = function() {
          // var base64data = reader.result.toString('base64')
          var base64data = reader.result.replace('data:image/jpeg;base64,', '')
          recognize(base64data)
            .then(res => {
              if (res.data && res.data.document && res.data.document.blocks) {
                console.log(res.data.document.blocks)
                setBlocks(res.data.document.blocks)
              } else {
                setBlocks([])
              }
            })
            .catch(err => {
              console.error(err)
              message.warn(JSON.stringify(err))
            })
        }
      })
  }

  render() {
    const { isShowRecognizeResult, croppedImageUrl, blocks } = this.props
    const result = blocks.map((item, index) => {
      console.log(item['lines'][0]['characters'])
      let text = item['lines'][0].text
      return <div key={index}>{text}</div>
    })
    const textRect = blocks.map((item, index) => {
      console.log(item['lines'][0]['position'])
      const score = item['lines'][0].score
      const pos = item['lines'][0]['position']['bounding_box']
      return (
        <TextRect
          key={index}
          height={pos.height}
          width={pos.width}
          top={pos.top}
          left={pos.left}
          score={score}
        />
      )
    })

    return isShowRecognizeResult ? (
      <div className="recognize-container">
        <div>
          <img src={croppedImageUrl} alt="" />
          <div className="text-rect-wrap">{textRect}</div>
        </div>

        <div className="result-wrap">{result}</div>
      </div>
    ) : null
  }
}

function mapStateToProps(state) {
  return {
    isShowRecognizeResult: state.app.isShowRecognizeResult,
    croppedImageUrl: state.app.croppedImageUrl,
    blocks: state.app.blocks,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setBlocks }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecognizeResult)
