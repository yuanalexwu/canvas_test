/**
 * Draw a Wave
 */
import React, {Component} from 'react'

const X_SPEED = 0.5
const Y_SPEED = 0.1

class C307 extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')

    this.ctx = ctx
    this.yCenterPos = this.canvas.height / 2
    this.yAngle = 0
    this.yRange = 50
    this.xPos = 0
    this.yPos = this.yCenterPos

    this.draw()
  }

  draw = () => {
    window.requestAnimationFrame(this.draw, this.canvas)

    this.ctx.beginPath()
    this.ctx.moveTo(this.xPos, this.yPos)

    // Calculate the new position
    this.xPos += X_SPEED
    this.yAngle += Y_SPEED
    this.yPos = this.yCenterPos + Math.sin(this.yAngle) * this.yRange

    this.ctx.strokeStyle = 'rgb(255, 0, 0)'
    this.ctx.lineTo(this.xPos, this.yPos)
    this.ctx.stroke()
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C307
