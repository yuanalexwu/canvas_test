import {parseColor} from '../../utils'

class Ball {
  constructor (radius = 40, color = '#ff0000') {
    this.x = 0
    this.y = 0
    this.radius = radius
    this.rotation = 0
    this.scaleX = 1
    this.scaleY = 1
    this.color = parseColor(color)
    this.lineWidth = 1
  }

  draw (context) {
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.rotation)
    context.scale(this.scalex, this.scaleY)
    context.lineWidth = this.lineWidth
    context.fillStyle = this.color

    context.beginPath()
    context.arc(0, 0, this.radius, 0, Math.PI * 2)
    context.closePath()
    context.fill()
    if (this.lineWidth > 0) {
      context.stroke()
    }

    context.restore()
  }

  getContainer () {
    const width = this.radius * 2
    const height = width
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width,
      height
    }
  }
}

export default Ball
