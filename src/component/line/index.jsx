class Line {
  constructor (x1, y1, x2, y2, color ) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
    this.color = color
  }

  draw = ctx => {
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(this.x1, this.y1)
    ctx.strokeStyle = this.color
    ctx.lineTo(this.x2, this.y2)
    ctx.stroke()
    ctx.restore()
  }
}

export default Line
