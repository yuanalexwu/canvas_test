/**
 * Drag and drop with bounce
 */
import React, {Component} from 'react'
import Ball from '../../component/ball'
import {containsPoint, captureMouse} from '../../utils'

class C704 extends Component {
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
    this.isMoseDown = false
    this.vx = Math.random() * 10 - 5
    this.vy = -5
    this.bounce = -0.7
    this.gravity = 0.2
    this.mouse = captureMouse(this.canvas)
    this.addEvent()
    this.draw()
  }

  addEvent = () => {
    this.canvas.addEventListener('mousedown', () => {
      if (containsPoint(this.ball.getContainer(), this.mouse.x, this.mouse.y)) {
        this.isMouseDown = true
        this.vx = 0
        this.vy = 0
        this.canvas.addEventListener('mousemove', this.onMouseMove, false)
        this.canvas.addEventListener('mouseup', this.onMouseUp, false)
      }
    })
  }

  onMouseMove = () => {
    this.ball.x = this.mouse.x
    this.ball.y = this.mouse.y
  }

  onMouseUp = () => {
    this.isMoseDown = false
    this.canvas.removeEventListener('mousemove', this.onMouseMove)
    this.canvas.removeEventListener('mouseup', this.onMouseUp)
  }

  draw = () => {
    this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height)
    window.requestAnimationFrame(this.draw, this.canvas)
    if (!this.isMoseDown) {
      this.checkBoundaries()
    }
    this.ball.draw(this.ctx)
  }

  checkBoundaries = () => {
    const left = 0
    const right = this.canvas_width
    const top = 0
    const bottom = this.canvas_height
    const {radius} = this.ball
    // Add gravity
    this.vy += this.gravity
    this.ball.x += this.vx
    this.ball.y += this.vy

    // Detect boundary and bounce
    if (this.ball.x - radius < left) {
      this.ball.x = left + radius
      this.vx *= this.bounce
    } else if (this.ball.x + radius > right) {
      this.ball.x = right - radius
      this.vx *= this.bounce
    }
    if (this.ball.y - radius < top) {
      this.ball.y = top + radius
      this.vy *= this.bounce
    } else if (this.ball.y + radius > bottom) {
      this.ball.y = bottom - radius
      this.vy *= this.bounce
    }
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C704
