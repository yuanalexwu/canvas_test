/**
 * Keep Track of the current mouse position, relative to an element
 * @param element
 * @returns {{x: number, y: number, event: object}}
 */
export function captureMouse (element) {
  const mouse = {x: 0, y: 0, event: null}
  // body
  const body_scrollLeft = document.body.scrollLeft
  const body_scrollTop = document.body.scrollTop
  const element_scrollLeft = document.documentElement.scrollLeft
  const element_scrollTop = document.documentElement.scrollTop
  const offsetLeft = element.offsetLeft
  const offsetTop = element.offsetTop

  element.addEventListener('mousemove', function (event) {
    let x, y
    const {pageX, pageY, clientX, clientY} = event
    if (pageX || pageY) {
      x = pageX
      y = pageY
    } else {
      x = clientX + body_scrollLeft + element_scrollLeft;
      y = clientY + body_scrollTop + element_scrollTop;
    }
    x -= offsetLeft;
    y -= offsetTop;

    mouse.x = x;
    mouse.y = y;
    mouse.event = event;
  }, false);
  return mouse
}

/**
 * Returns a color in the format: '#RRGGBB', or as a hex number if specified.
 * @param {number|string} color
 * @param {boolean} toNumber=false  Return color as a hex number.
 * @return {string|number}
 */
export function parseColor (color, toNumber) {
  if (toNumber === true) {
    if (typeof color === 'number') {
      return (color | 0); //chop off decimal
    }
    if (typeof color === 'string' && color[0] === '#') {
      color = color.slice(1);
    }
    return window.parseInt(color, 16);
  } else {
    if (typeof color === 'number') {
      color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
    }
    return color;
  }
};

/**
 * Check the given point is in rect
 * @param rect
 * @param x
 * @param y
 * @returns {boolean}
 */
export function containsPoint (rect, x, y) {
  const {x: rectX, y: rectY, width, height} = rect
  return !(
    x < rectX ||
    x > rectX + width ||
    y < rectY ||
    y > rectY + height
  )
}
