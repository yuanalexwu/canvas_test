/**
 * Drawing smooth multi curves
 */
import React, {Component} from 'react'

class C405 extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    const canvas_width = this.canvas.width
    const canvas_height = this.canvas.height
    const points = []
    const numPoints = 9
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * canvas_width,
        y: Math.random() * canvas_height
      })
    }

    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    let i = 1
    for (i = 1; i < numPoints - 2; i++) {
      const p1 = points[i]
      const p2 = points[i+1]
      const x2 = (p1.x + p2.x) / 2
      const y2 = (p1.y + p2.y) / 2
      // Move to the half way of the second point
      ctx.quadraticCurveTo(p1.x, p1.y, x2, y2)
    }
    ctx.quadraticCurveTo(points[i].x, points[i].y, points[i+1].x, points[i+1].y)
    ctx.stroke()
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C405
