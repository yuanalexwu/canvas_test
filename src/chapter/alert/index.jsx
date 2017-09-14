/**
 * Draw alert info
 */
import React, {Component} from 'react'
import Table from '../../component/table'
import {captureMouse, containsPoint} from '../../utils'

const HEADER_BG_COLOR = '#F5F5F5'

class Alert extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    const canvas_width = this.canvas.width
    const canvas_height = this.canvas.height

    this.ctx = ctx
    this.canvas_width = canvas_width
    this.canvas_height = canvas_height
    this.mouse = captureMouse(this.canvas)
    this.isDragging = false
    this.xDragOffset = 0
    this.yDragOffset = 0
    this.selection = null
    this.needReDraw = true
    this.isDraggingPoint = false
    const x = 10
    const y = 50
    const rows = [
      [
        {text: '名称', bg: HEADER_BG_COLOR},
        {text: '正常值', bg: HEADER_BG_COLOR},
        {text: '当前值', bg: HEADER_BG_COLOR},
        {text: '单位', bg: HEADER_BG_COLOR},
        {text: '状态', bg: HEADER_BG_COLOR},
      ],
      [
        {text: '胶带拉力'},
        {text: '0.58'},
        {text: '0.55~0.60'},
        {text: 'N'},
        {text: '正常'},
      ],
    ]
    const point = {x: 500, y: 500, r: 5, color: 'blue'}
    this.shape = new Table(x, y, rows, point)

    this.bindEvent()
    this.draw()
  }

  bindEvent = () => {
    const {canvas} = this
    canvas.addEventListener('mousedown', () => {
      this.isDraggingPoint = false
      const {shape, mouse} = this
      const {alertPoint} = shape
      const {x: xMouse, y: yMouse} = mouse
      if (containsPoint(shape.getContainer(), xMouse, yMouse)) {
        this.xDragOffset = xMouse - shape.x
        this.yDragOffset = yMouse - shape.y
        this.isDragging = true
        this.selection = shape
      } else if (alertPoint && containsPoint(alertPoint.getContainer(), xMouse, yMouse)) {
        this.xDragOffset = xMouse - alertPoint.x
        this.yDragOffset = yMouse - alertPoint.y
        this.isDragging = true
        this.isDraggingPoint = true
        this.selection = shape
      } else {
        this.selection = null
      }
      this.needReDraw = true
    })

    canvas.addEventListener('mousemove', () => {
      if (this.isDragging) {
        const {
          selection,
          mouse,
          xDragOffset,
          yDragOffset,
          isDraggingPoint
        } = this
        const {x: xMouse, y: yMouse} = mouse
        if (isDraggingPoint) {
          selection.alertPoint.x = xMouse - xDragOffset
          selection.alertPoint.y = yMouse - yDragOffset
        } else {
          selection.x = xMouse - xDragOffset
          selection.y = yMouse - yDragOffset
        }
        this.needReDraw = true
      }
    })

    canvas.addEventListener('mouseup', () => {
      this.isDragging = false
    })
  }

  draw = () => {
    window.requestAnimationFrame(this.draw, this.canvas)
    if (this.needReDraw) {
      this.clear()
      const {ctx, shape, selection, isDraggingPoint} = this
      const {alertPoint} = shape
      const selectedObject = isDraggingPoint ? alertPoint : shape
      let {
        x: xSelection,
        y: ySelection,
        width: wSelection,
        height: hSelection
      } = selectedObject.getContainer()
      shape.draw(ctx)
      if (selection) {
        ctx.save()
        ctx.beginPath()
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 2
        if (isDraggingPoint) {
          xSelection -= wSelection / 2
          ySelection -= hSelection / 2
        }
        ctx.strokeRect(xSelection, ySelection, wSelection, hSelection)
        ctx.restore()
      }
      this.needReDraw = false
    }
  }

  clear = () => {
    this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height)
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='800' height='800' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default Alert
