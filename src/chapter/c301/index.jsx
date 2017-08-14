/**
 * Rotate an Object Towards a Point
 */
import React, {Component} from 'react'
import {captureMouse} from '../../utils'
import Arrow from './arrow'

class C301 extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    const mouse = captureMouse(this.canvas)
    const arrow = new Arrow()
    const canvas_width = this.canvas.width
    const canvas_height = this.canvas.height

    arrow.x = canvas_width / 2
    arrow.y = canvas_height / 2

    this.ctx = ctx
    this.mouse = mouse
    this.arrow = arrow

    this.draw()
  }

  draw = () => {
    window.requestAnimationFrame(this.draw, this.canvas)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    const dx = this.mouse.x - this.arrow.x
    const dy = this.mouse.y - this.arrow.y
    this.arrow.rotation = Math.atan2(dy, dx)
    this.arrow.draw(this.ctx)
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C301
