/**
 * Acceleration and gravity
 */
import React, {Component} from 'react'
import Ball from '../../component/ball'

const X_ACCELERATE = 0.01
const Y_ACCELERATE = 0.01
const GRAVITY = 0.02

class C506 extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    const ball = new Ball()
    ball.x = 50
    ball.y = 100

    this.ctx = ctx
    this.ball = ball
    this.x_velocity = 0
    this.y_velocity = 0
    this.x_accelerate = X_ACCELERATE
    this.y_accelerate = Y_ACCELERATE
    this.addEvent()
    this.draw()
  }

  addEvent = () => {
    window.addEventListener('keydown', (event) => {
      const {keyCode} = event
      if (keyCode === 37) {
        this.x_accelerate = -0.01
      } else if (keyCode === 39) {
        this.x_accelerate = 0.01
      } else if (keyCode === 38) {
        this.y_accelerate = -0.01
      } else if (keyCode === 40) {
        this.y_accelerate = 0.01
      }
    })
  }

  draw = () => {
    window.requestAnimationFrame(this.draw, this.canvas)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.x_velocity += this.x_accelerate
    this.y_velocity += this.y_accelerate + GRAVITY
    this.ball.x += this.x_velocity
    this.ball.y += this.y_velocity
    this.ball.draw(this.ctx)
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C506
