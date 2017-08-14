/**
 * Load image
 */
import React, {Component} from 'react'
import video from '../assets/video.mp4'

class C412 extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    // const canvas_width = this.canvas.width
    // const canvas_height = this.canvas.height
    this.ctx = ctx
    this.drawFrame(this.canvas)
  }

  drawFrame = canvas => {
    this.ctx.drawImage(this.video, 0, 0, 300, 300)
    console.log(this.ctx.getImageData(0, 0, 100, 100))
    window.requestAnimationFrame(this.drawFrame, canvas)
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <div>
        <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
        <video ref={ref => this.video = ref} width='400' height='400' autoPlay>
          <source src={video} type='video/mp4' />
        </video>
      </div>
    )
  }
}

export default C412
