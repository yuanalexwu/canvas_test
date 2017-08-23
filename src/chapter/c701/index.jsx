/**
 * Mouse event
 */
import React, {Component} from 'react'
import Ball from '../../component/ball'
import {containsPoint, captureMouse} from '../../utils'

class C701 extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    const canvas_width = this.canvas.width
    const canvas_height = this.canvas.height
    const ball = new Ball()
    ball.x = canvas_width / 2
    ball.y = canvas_height / 2

    this.ctx = ctx
    this.ball = ball
    this.mouse = captureMouse(this.canvas)
    this.addEvent()
    this.draw()
  }

  addEvent = () => {
    this.canvas.addEventListener('mousedown', () => {
      if (containsPoint(this.ball.getContainer(), this.mouse.x, this.mouse.y)) {
        console.log('mousedown in ball bound')
      } else {
        console.log('mousedown not in ball bound')
      }
    })
  }

  draw = () => {
    this.ball.draw(this.ctx)
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C701
