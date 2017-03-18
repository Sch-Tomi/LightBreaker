class MasterBlock {
  constructor(img,angle,x,y) {

    this._x = x
    this._y = y

    this._angle = angle

    this._img = new Image()
    this._img.src = img

  }

  get_x(){
    return this._x
  }

  set_x(x){
    this._x = x
  }

  get_y(){
    return this._y
  }

  set_y(y){
    this._y = y
  }

  get_img(){
    return this._img
  }

  get_angle(){
    return this._angle
  }

  rotate_left(){
    this._angle -= 90
  }

  rotate_right(){
    this._angle += 90
  }

}
