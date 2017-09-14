import Row from '../row'
import Line from '../line'
import Point from '../point'

class Table {
  constructor (x = 0, y = 0, list = [], point = {}) {
    this.x = x
    this.y = y
    this.list = list
    this.point = point
    this.alertPoint = null
    if (this.hasPoint(point)) {
      const {x, y, r, color} = point
      this.alertPoint = new Point(x, y, r, color)
    }
  }

  draw = ctx => {
    let {x: xRow, y: yRow, list} = this
    // Calculate table width and height
    let tableWidth = 0
    let tableHeight = 0
    for (let i = 0; i < list.length; i++) {
      const elem = list[i]
      const row = new Row(xRow, yRow, elem)
      row.draw(ctx)
      // Calculate the next pos of Row
      const {width: rowWidth, height: rowHeight} = row.getContainer()
      tableWidth = rowWidth
      tableHeight += rowHeight
      yRow += tableHeight
    }
    this.w = tableWidth
    this.h = tableHeight

    this.drawPoint(ctx)
  }

  drawPoint = ctx => {
    const {alertPoint} = this
    if (alertPoint) {
      alertPoint.draw(ctx)
      this.drawLine(ctx)
    }
  }

  drawLine = ctx => {
    const {alertPoint} = this
    if (alertPoint) {
      const {x, y, color} = alertPoint
      const nearestPoint = this.getTheNearestTableCornerFromPoint(alertPoint, this.getPoints())
      const {x: xPoint, y: yPoint} = nearestPoint
      const line = new Line(x, y, xPoint, yPoint, color)
      line.draw(ctx)
    }
  }

  hasPoint (point) {
    return Object.keys(point).length
  }

  getContainer = () => {
    return {
      x: this.x,
      y: this.y,
      height: this.h,
      width: this.w
    }
  }

  getPoints = () => {
    const {x, y, w, h} = this
    const points = [
      {x, y},
      {x: x + w, y},
      {x: x, y: y + h},
      {x: x + w, y: y + h},
    ]
    return points
  }

  getTheNearestTableCornerFromPoint = (point, corners) => {
    const {sqrt, pow, } = Math
    let nearestPoint
    let distance = Infinity
    const {x: xPoint, y: yPoint} = point
    for (let corner of corners) {
      const {x, y} = corner
      const currentDistance = sqrt(pow(xPoint - x, 2) + pow(yPoint - y, 2))
      if (currentDistance < distance) {
        distance = currentDistance
        nearestPoint = {...corner}
      }
    }
    return nearestPoint
  }
}

export default Table
