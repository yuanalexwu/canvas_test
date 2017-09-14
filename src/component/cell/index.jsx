class Cell {
  constructor (option) {
    const {
      x = 0,
      y = 0,
      w = 90,
      h = 30,
      font = 15,
      text = '',
      bg = '#fff',
      color = '#000',
      border = 1,
      borderColor = '#000'
    } = option
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.font = font
    this.text = text
    this.color = color
    this.bg = bg
    this.border = border
    this.borderColor = borderColor
  }

  draw = ctx => {
    ctx.save()
    ctx.fillStyle = this.bg
    ctx.fillRect(this.x, this.y, this.w, this.h)
    ctx.strokeStyle = this.borderColor
    ctx.strokeWidth = this.border
    ctx.rect(this.x, this.y, this.w, this.h)
    ctx.stroke()
    ctx.fillStyle = this.color
    this.drawText(ctx)
    ctx.restore()
  }

  drawText = ctx => {
    let {font, x, y, w, h, text} = this
    ctx.font = `${font}px serif`
    ctx.textBaseline = 'top'
    const wordLength = this.calculateTextWidth(text)
    if (wordLength < w) {
      x += (w - wordLength) / 2
    }
    const wordHeight = font
    if (wordHeight < h) {
      y += (h - font) / 2
    }
    ctx.fillText(text, x, y)
  }

  calculateTextWidth = text => {
    let width = 0
    const {font} = this
    text.split('').map((word) => {
      if (this.isChinese(word)) {
        width += font
      } else {
        width += font / 2
      }
      return null
    })
    return width
  }

  isChinese = text => {
    const reg = /[^\u4e00-\u9fa5]/
    return !reg.test(text)
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

export default Cell
