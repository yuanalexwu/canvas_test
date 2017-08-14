/**
 * Gradient fill
 */
import React, {Component} from 'react'

class C407 extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    // const canvas_width = this.canvas.width
    // const canvas_height = this.canvas.height
    const p1 = {x: 100, y: 100}
    const p2 = {x: 200, y: 200}
    const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
    gradient.addColorStop(0, '#ffffff')
    gradient.addColorStop(0.5, '#ff0000')
    gradient.addColorStop(1, 'rgba(0, 255, 0, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(100, 100, 100, 100)
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C407
