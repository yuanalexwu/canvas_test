/**
 * Ship
 */
import React, {Component} from 'react'
import Ship from '../../component/ship'

class C511 extends Component {
  componentDidMount () {
    const ctx = this.canvas.getContext('2d')
    const canvas_width = this.canvas.width
    const canvas_height = this.canvas.height

    const ship = new Ship()
    ship.x = canvas_width / 2
    ship.y = canvas_height / 2

    this.ctx = ctx
    this.ship = ship
    this.x_velocity = 0
    this.y_velocity = 0
    this.r_velocity = 0
    this.thrust = 0

    this.addEvent()
    this.draw()
  }

  addEvent = () => {
    window.addEventListener('keydown', event => {
      // eslint-disable-next-line
      switch (event.keyCode) {
        case 37: { // left
          this.r_velocity = -3
          break
        }
        case 39: { // right
          this.r_velocity = 3
          break
        }
        case 38: { // up
          this.thrust = 0.05
          this.ship.showFlame = true
          break
        }
      }
    }, false)

    window.addEventListener('keyup', event => {
      this.r_velocity = 0
      this.thrust = 0
      this.ship.showFlame = false
    })
  }

  draw = () => {
    window.requestAnimationFrame(this.draw, this.canvas)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // Rotate angle
    this.ship.rotation += this.r_velocity * Math.PI / 180
    const angle = this.ship.rotation
    this.x_velocity += Math.cos(angle) * this.thrust
    this.y_velocity += Math.sin(angle) * this.thrust
    // Move to next point
    this.ship.x += this.x_velocity
    this.ship.y += this.y_velocity

    this.ship.draw(this.ctx)
  }

  render () {
    const style = {
      border: '1px solid black',
      background: '#000000',
    }
    return (
      <canvas width='400' height='400' style={style} ref={ref => this.canvas = ref} />
    )
  }
}

export default C511
