class Rect {
  constructor (x = 0, y = 0, w = 20, h = 20, fill = '#AAAAAA') {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.fill = fill
  }

  draw = ctx => {
    ctx.save()
    ctx.fillStyle = this.fill
    ctx.fillRect(this.x, this.y, this.w, this.h)
    ctx.restore()
  }

  getContainer = () => {
    return {
      x: this.x,
      y: this.y,
      height: this.h,
      width: this.w
    }
  }
}

export default Rect
