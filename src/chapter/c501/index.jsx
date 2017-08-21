/**
 * Velocity
 */
import React, {Component} from 'react'
import Ball from '../../component/ball'

const X_SPEED = 2
const Y_SPEED = 2
const ANGLE = 45

class C501 extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    this.ctx = ctx
    // const canvas_width = this.canvas.width
    // const canvas_height = this.canvas.height
    const ball = new Ball()
    ball.x = 50
    ball.y = 50
    this.ball = ball

    this.drawFrame()
  }

  drawFrame = () => {
    window.requestAnimationFrame(this.drawFrame, this.canvas)
    const radians = ANGLE * Math.PI / 180
    this.ball.x += Math.cos(radians) * X_SPEED
    this.ball.y += Math.sin(radians) * Y_SPEED
    this.ball.draw(this.ctx)
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C501
