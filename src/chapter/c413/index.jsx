/**
 * Load image
 */
import React, {Component} from 'react'
import img from '../assets/picture.jpg'

class C413 extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    const canvas_width = this.canvas.width
    const canvas_height = this.canvas.height

    // for (let i = 0; i< canvas_width; i += 10) {
    //   for (let j = 0; j < canvas_height; j += 10) {
    //     ctx.fillStyle = (i % 20 === 0) ? '#f00' : ((i % 30 === 0) ? '#0f0' : '#00f')
    //     ctx.fillRect(i, j, 10, 10)
    //   }
    // }
    //
    // const imageData = ctx.getImageData(0, 0, canvas_width, canvas_height)
    // const pixels = imageData.data
    // for (let offset = 0, len = pixels.length; offset < len; offset += 4) {
    //   // Inverse rgb color
    //   // pixels[offset] = 255 - pixels[offset]
    //   // pixels[offset + 1] = 255 - pixels[offset + 1]
    //   // pixels[offset + 2] = 255 - pixels[offset + 2]
    //
    //   // grayscale
    //   const r = pixels[offset]
    //   const g = pixels[offset + 1]
    //   const b = pixels[offset + 2]
    //   const y = (0.2126 * r) + (0.7152 * g) + (0.0722 * b)
    //   pixels[offset] = pixels[offset + 1] = pixels[offset + 2] = y
    // }
    // ctx.putImageData(imageData, 0, 0)


    const image = new Image()
    image.src = img
    image.onload = function () {
      ctx.drawImage(image, 0, 0, canvas_width, canvas_height)
      const imageData = ctx.getImageData(0, 0, canvas_width, canvas_height)
      const pixels = imageData.data
      for (let offset = 0, len = pixels.length; offset < len; offset += 4) {
        // Inverse rgb color
        // pixels[offset] = 255 - pixels[offset]
        // pixels[offset + 1] = 255 - pixels[offset + 1]
        // pixels[offset + 2] = 255 - pixels[offset + 2]

        // grayscale
        const r = pixels[offset]
        const g = pixels[offset + 1]
        const b = pixels[offset + 2]
        const y = (0.2126 * r) + (0.7152 * g) + (0.0722 * b)
        pixels[offset] = pixels[offset + 1] = pixels[offset + 2] = y
      }
      ctx.putImageData(imageData, 0, 0)
    }
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C413
