import React from 'react'
import CameraPage from '../components/camera/camera'
import Grid from '../components/grid/grid'
import CropImage from '../components/crop-image/crop-image'
import RecognizeResult from '../components/recognize/recognize'
import StartPage from '../components/start-page/start-page'

import './app.scss'

function App() {
  return (
    <div className="app-container">
      <StartPage />
      <CameraPage />
      <Grid />
      <CropImage />
      <RecognizeResult />
    </div>
  )
}

export default App
