/**
 * Drag and drop
 */
import React, {Component} from 'react'
import Ball from '../../component/ball'
import {containsPoint, captureMouse} from '../../utils'

class C702 extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    const canvas_width = this.canvas.width
    const canvas_height = this.canvas.height
    const ball = new Ball()
    ball.x = canvas_width / 2
    ball.y = canvas_height / 2

    this.ctx = ctx
    this.canvas_width = canvas_width
    this.canvas_height = canvas_height
    this.ball = ball
    this.mouse = captureMouse(this.canvas)
    // Offset between mousedown point and shape
    this.xOffset = 0
    this.yOffset = 0
    this.addEvent()
    this.draw()
  }

  addEvent = () => {
    this.canvas.addEventListener('mousedown', () => {
      if (containsPoint(this.ball.getContainer(), this.mouse.x, this.mouse.y)) {
        this.xOffset = this.ball.x - this.mouse.x
        this.yOffset = this.ball.y - this.mouse.y
        this.canvas.addEventListener('mousemove', this.onMouseMove, false)
        this.canvas.addEventListener('mouseup', this.onMouseUp, false)
      }
    })
  }

  onMouseMove = () => {
    this.ball.x = this.mouse.x + this.xOffset
    this.ball.y = this.mouse.y + this.yOffset
  }

  onMouseUp = () => {
    this.xOffset = 0
    this.yOffset = 0
    this.canvas.removeEventListener('mousemove', this.onMouseMove)
    this.canvas.removeEventListener('mouseup', this.onMouseUp)
  }

  draw = () => {
    this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height)
    window.requestAnimationFrame(this.draw, this.canvas)
    this.ball.draw(this.ctx)
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C702
