import Cell from '../cell'

class Row {
  constructor (x = 0, y = 0, list = []) {
    this.x = x
    this.y = y
    this.list = list
  }

  draw = ctx => {
    let {x: xCell, y: yCell, list} = this
    // Calculate row width and height
    let rowWidth = 0
    let rowHeight = 0
    for (let i = 0; i < list.length; i++) {
      const elem = list[i]
      const {w = 100, h = 30, text = '', color = '#000000', bg = '#FFFFFF', borderColor = '#E9E9E9'} = elem
      const cell = new Cell({x: xCell, y: yCell, w, h, text, color, bg, borderColor})
      cell.draw(ctx)
      rowHeight = h
      rowWidth += w
      // Calculate the next cell x position
      xCell = xCell + w
    }
    this.w = rowWidth
    this.h = rowHeight
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

export default Row
