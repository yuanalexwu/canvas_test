/**
 * Paint image
 */
import React, {Component} from 'react'
import {captureMouse, parseColor} from '../../utils'

class C416 extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    this.ctx = ctx
    const canvas_width = this.canvas.width
    const canvas_height = this.canvas.height
    this.mouse = captureMouse(this.canvas)
    const imageData = ctx.getImageData(0, 0, canvas_width, canvas_height)
    this.imageData = imageData
    this.pixels = imageData.data
    this.brush_size = 35
    this.brush_density = 500
    this.bush_color = null

    this.canvas.addEventListener('mousedown', () => {
      this.brush_color = parseColor(Math.random() * 0xffffff, true)
      console.log(this.brush_color)
      this.canvas.addEventListener('mousemove', this.onMouseMove, false)
    })
    this.canvas.addEventListener('mouseup', () => {
      this.canvas.removeEventListener('mousemove', this.onMouseMove, false)
    }, false)
  }

  onMouseMove = () => {
    for (let i = 0; i < this.brush_density; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * this.brush_size
      const xpos = (this.mouse.x + Math.cos(angle) * radius) | 0
      const ypos = (this.mouse.y + Math.sin(angle) * radius) | 0
      const offset = (xpos + ypos * this.imageData.width) * 4
      this.pixels[offset] = (this.brush_color >> 16) & 0xff
      this.pixels[offset + 1] = (this.brush_color >> 8) & 0xff
      this.pixels[offset + 2] = this.brush_color & 0xff
      this.pixels[offset + 3] = 255
    }
    this.ctx.putImageData(this.imageData, 0, 0)
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C416
