class Point {
  constructor (x = 0, y = 0, r = 0, color = '#000000') {
    this.x = x
    this.y = y
    this.r = r
    this.color = color
  }

  draw = ctx => {
    ctx.save()
    ctx.beginPath()
    ctx.translate(this.x, this.y)
    ctx.fillStyle = this.color
    ctx.arc(0, 0, this.r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.restore()
  }

  getContainer = () => {
    const diameter = this.r * 2
    return {
      x: this.x,
      y: this.y,
      height: diameter,
      width: diameter
    }
  }
}

export default Point
