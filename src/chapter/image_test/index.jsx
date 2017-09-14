/**
 * Image manipulate
 */
import React, {Component} from 'react'
import {captureMouse, containsPoint} from '../../utils'
import img from '../assets/picture.jpg'
import ImageShape from '../../component/image_shape'

const SCALE_STEP = 0.01

class ImageTest extends Component {
  componentDidMount () {
    this.ctx = this.canvas.getContext('2d')
    this.canvas_width = this.canvas.width
    this.canvas_height = this.canvas.height
    this.mouse = captureMouse(this.canvas)
    this.shape = new ImageShape(0, 0, 1, img)
    this.needReDraw = true
    this.isDragging = false
    this.dragOffsetX = 0
    this.dragOffsetY = 0
    this.selection = null

    this.bindEvent()
    this.draw()
  }

  render () {
    const style = {border: '1px solid black'}
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }

  bindEvent = () => {
    this.canvas.addEventListener('mousewheel', event => {
      const {wheelDelta} = event
      if (wheelDelta > 0) {
        this.shape.scale += SCALE_STEP
      } else {
        if (this.shape.scale < 0.1) {
          this.shape.scale = 0.1
          return
        }
        this.shape.scale -= SCALE_STEP
      }
      this.needReDraw = true
    })

    this.canvas.addEventListener('mousedown', event => {
      const {x: mouseX, y: mouseY} = this.mouse
      const container = this.shape.getContainer()
      if (containsPoint(container, mouseX, mouseY)) {
        this.isDragging = true
        this.dragOffsetX = mouseX - this.shape.x
        this.dragOffsetY = mouseY - this.shape.y
        this.selection = this.shape
        this.needReDraw = true
      } else {
        this.selection = null
        this.needReDraw = true
      }
    })

    this.canvas.addEventListener('mousemove', event => {
      const {x: mouseX, y: mouseY} = this.mouse
      if (this.isDragging) {
        this.selection.x = mouseX - this.dragOffsetX
        this.selection.y = mouseY - this.dragOffsetY
        this.needReDraw = true
      }
    })

    this.canvas.addEventListener('mouseup', event => {
      this.isDragging = false
    })

    this.canvas.addEventListener('click', event => {
      const {x, y, scale} = this.shape
      console.log('Image info', {x, y, scale})
    })
  }

  draw = () => {
    window.requestAnimationFrame(this.draw)
    if (this.needReDraw) {
      this.clear()
      this.shape.draw(this.ctx)
      if (this.selection) {

      }
      this.needReDraw = false
    }
  }

  clear = () => {
    this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height)
  }
}

export default ImageTest
