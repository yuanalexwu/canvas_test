/**
 * Create Pulsing Motion
 */
import React, {Component} from 'react'
import Ball from '../../component/ball'

const X_SPEED = 0.01
const Y_SPEED = 0.1
const SCALE_RANGE = 0.3
const SCALE_SPEED = 0.1

class C302 extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    const shape = new Ball()
    const canvas_width = this.canvas.width
    const canvas_height = this.canvas.height

    shape.x = canvas_width / 2
    shape.y = canvas_height / 2

    this.ctx = ctx
    this.shape = shape
    this.xAngle = 0
    this.yAngle = 0
    this.scaleAngle = 0

    this.draw()
  }

  draw = () => {
    window.requestAnimationFrame(this.draw, this.canvas)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.shape.x = this.canvas.width / 2 + Math.sin(this.xAngle) * 100
    this.shape.y = this.canvas.height / 2 + Math.sin(this.yAngle) * 50
    this.shape.scalex = this.shape.scaleY = 1 + Math.sin(this.scaleAngle) * SCALE_RANGE
    this.shape.draw(this.ctx)

    this.xAngle += X_SPEED
    this.yAngle += Y_SPEED
    this.scaleAngle += SCALE_SPEED
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C302
