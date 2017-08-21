/**
 * Accelerate, rotate and move an Object Towards a Point
 */
import React, {Component} from 'react'
import {captureMouse} from '../../utils'
import Arrow from '../../component/arrow'

const FORCE = 0.05

class C510 extends Component {
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
    this.x_velocity = 0
    this.y_velocity = 0

    this.draw()
  }

  draw = () => {
    window.requestAnimationFrame(this.draw, this.canvas)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    const dx = this.mouse.x - this.arrow.x
    const dy = this.mouse.y - this.arrow.y
    // Rotate angle
    const angle = Math.atan2(dy, dx)
    this.arrow.rotation = angle
    this.x_velocity += Math.cos(angle) * FORCE
    this.y_velocity += Math.sin(angle) * FORCE
    // Move to next point
    this.arrow.x += this.x_velocity
    this.arrow.y += this.y_velocity

    this.arrow.draw(this.ctx)
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C510
