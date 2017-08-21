/**
 * Rotate and move an Object Towards a Point
 */
import React, {Component} from 'react'
import {captureMouse} from '../../utils'
import Arrow from '../../component/arrow'

const SPEED = 1

class C501 extends Component {
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
    // Rotate angle
    const angle = Math.atan2(dy, dx)
    this.arrow.rotation = angle
    // Move to next point
    const vx = Math.cos(angle) * SPEED
    const vy = Math.sin(angle) * SPEED
    this.arrow.x += vx
    this.arrow.y += vy

    this.arrow.draw(this.ctx)
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C501
