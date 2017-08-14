/**
 * Drawing curves
 */
import React, {Component} from 'react'
import {captureMouse} from '../../utils'

class C402 extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    const canvas_width = this.canvas.width
    const canvas_height = this.canvas.height
    const mouse = captureMouse(this.canvas)
    const x0 = 100
    const y0 = 200
    const x2 = 300
    const y2 = 200
    this.canvas.addEventListener('mousemove', function() {
      ctx.clearRect(0, 0, canvas_width, canvas_height)
      const {x: x1, y: y1} = mouse
      ctx.beginPath()
      ctx.moveTo(x0, y0)
      ctx.quadraticCurveTo(x1, y1, x2, y2)
      ctx.stroke()
    })
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C402
