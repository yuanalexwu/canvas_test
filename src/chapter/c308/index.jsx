/**
 * Circular Movement
 */
import React, {Component} from 'react'
import Ball from '../../component/ball'

const SPEED = 0.1

class C308 extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    const shape = new Ball()
    const canvas_width = this.canvas.width
    const canvas_height = this.canvas.height

    shape.x = canvas_width / 2
    shape.y = canvas_height / 2

    this.ctx = ctx
    this.xCenterPos = canvas_width / 2
    this.yCenterPos = canvas_height / 2
    this.shape = shape
    this.angle = 0

    this.draw()
  }

  draw = () => {
    window.requestAnimationFrame(this.draw, this.canvas)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.shape.x = this.xCenterPos + Math.cos(this.angle) * this.shape.radius
    this.shape.y = this.yCenterPos + Math.sin(this.angle) * this.shape.radius
    this.shape.draw(this.ctx)

    this.angle += SPEED
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C308
