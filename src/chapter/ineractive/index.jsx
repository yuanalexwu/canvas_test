/**
 * Interactive, drag and drop with multi shape
 */
import React, {Component} from 'react'
import Rect from '../../component/rect'
import {containsPoint, captureMouse} from '../../utils'

class Interactive extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    const canvas_width = this.canvas.width
    const canvas_height = this.canvas.height
    const shapes = [
      new Rect(40, 40, 50, 50),
      new Rect(125,80,30,80, 'rgba(245, 222, 179, .7)'),
      new Rect(80,150,60,30, 'rgba(127, 255, 212, .5)'),
    ]

    this.ctx = ctx
    this.canvas_width = canvas_width
    this.canvas_height = canvas_height
    this.mouse = captureMouse(this.canvas)
    this.needToRedraw = true
    this.shapes = shapes
    this.dragging = false // Keep track of mouse event when we are dragging
    this.selection = null // The current selected object(Or maybe turn this into an array for multiple selection)
    this.dragOffsetX = 0
    this.dragOffsetY = 0
    this.selectionColor = '#cc0000'
    this.selectionWidth = 2

    this.addEvent()
    this.draw()
  }

  addEvent = () => {
    const canvas = this.canvas
    // Fixes a problem where dbclick causes text to get selected on the canvas
    canvas.addEventListener('selectstart', function (e) {
      e.preventDefault()
      return false
    }, true)

    canvas.addEventListener('mousedown', () => {
      for (let shape of this.shapes) {
        const {x: mouseX, y: mouseY} = this.mouse
        const container = shape.getContainer()
        if (containsPoint(container, mouseX, mouseY)) {
          this.dragOffsetX = mouseX - shape.x
          this.dragOffsetY = mouseY - shape.y
          this.dragging = true
          this.selection = shape
          this.needToRedraw = true
          // Got one and return
          return
        }
      }

      // Got nothing and clear selection if exists
      if (this.selection) {
        this.selection = null
        this.needToRedraw = true
      }
    }, true)

    canvas.addEventListener('mousemove', () => {
      if (this.dragging) {
        const {x: mouseX, y: mouseY} = this.mouse
        this.selection.x = mouseX - this.dragOffsetX
        this.selection.y = mouseY - this.dragOffsetY
        this.needToRedraw = true
      }
    }, true)

    canvas.addEventListener('mouseup', () => {
      this.dragging = false
    }, true)

    canvas.addEventListener('dblclick', () => {
      const {x, y} = this.mouse
      this.addShape(new Rect(x, y, 20, 20, 'rgba(0, 255, 0, 6)'))
    }, true)
  }

  addShape = shape => {
    this.shapes.push(shape)
    this.needToRedraw = true
  }

  draw = () => {
    window.requestAnimationFrame(this.draw, this.canvas)
    if (this.needToRedraw) {
      this.clear()
      const ctx = this.ctx
      // Draw shapes
      for (let shape of this.shapes) {
        shape.draw(ctx)
      }

      // Draw selection if exists
      if (this.selection) {
        const selection = this.selection
        ctx.strokeStyle = this.selectionColor
        ctx.lineWidth = this.selectionWidth
        ctx.strokeRect(selection.x, selection.y, selection.w, selection.h)
      }
      this.needToRedraw = false
    }
  }

  clear = () => {
    this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height)
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default Interactive
