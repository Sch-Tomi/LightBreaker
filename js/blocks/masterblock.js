class MasterBlock {
  constructor(img,angle,x,y,moving,rotating) {

    this._x = x
    this._y = y

    this._angle = angle

    this._img = new Image()
    this._img.src = img

    this._moving = moving
    this._rotating = rotating

  }

  canvas_repositioning(x,y){
    this._x += x
    this._y += y
  }

  get_x(){
    return this._x
  }

  set_x(x){
    if (this._moving) {
      this._x = x
    }
  }

  get_y(){
    return this._y
  }

  set_y(y){
    if (this._moving) {
      this._y = y
    }
  }

  get_img(){
    return this._img
  }

  get_angle(){
    return this._angle
  }

  rotate_left(){
    if (this._rotating) {
      this._angle -= 90
    }
  }

  rotate_right(){
    if (this._rotating) {
      this._angle += 90
    }
  }

  locked(){
    return !this._rotating
  }

}
