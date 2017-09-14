class ImageShape {
  constructor (x = 0, y = 0, scale = 0, img) {
    this.x = x
    this.y = y
    this.w = 0
    this.h = 0
    this.scale = scale
    this.img = new Image()
    this.img.src = img
  }

  isImageLoaded = img => {
    // During the onload event, IE correctly identifies any images that
    // weren’t downloaded as not complete. Others should too. Gecko-based
    // browsers act like NS4 in that they report this incorrectly.
    if (!img.complete) {
      return false
    }
    if (typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0) {
      return false
    }
    return true
  }

  draw = ctx => {
    ctx.save()
    if (!this.isImageLoaded(this.img)) {
      this.img.onload = () => {
        this._draw(ctx)
      }
    } else {
      this._draw(ctx)
    }
    ctx.restore()
  }

  _draw = ctx => {
    const {scale} = this
    let {naturalWidth: width, naturalHeight: height} = this.img
    width *= scale
    height *= scale
    // Save w, h for other usage
    this.w = width
    this.h = height
    ctx.drawImage(this.img, this.x, this.y, width, height)
    ctx.scale(scale, scale)
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

export default ImageShape
