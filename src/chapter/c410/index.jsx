/**
 * Load image
 */
import React, {Component} from 'react'
import img from '../assets/picture.jpg'

class C410 extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    // const canvas_width = this.canvas.width
    // const canvas_height = this.canvas.height
    const xDest = 0
    const yDest = 0
    const destWidth = 200
    const destHeight = 200
    const xSlice = 100
    const ySlice = 100
    const sliceWidth = 100
    const sliceHeight = 100
    const image = new Image()
    image.src = img
    image.onload = function () {
      // ctx.drawImage(image, xDest, yDest)
      ctx.drawImage(image, xDest, yDest, destWidth, destHeight)
      // ctx.drawImage(image, xSlice, ySlice, sliceWidth, sliceHeight, xDest, yDest, destWidth, destHeight)
    }
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C410
