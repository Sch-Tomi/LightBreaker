class MasterBlock {
    constructor(img, angle, x, y, moving, rotating) {

        this._x = x
        this._y = y

        this._direction = angle

        this._img = new Image()
        this._img.src = img

        this._moving = moving
        this._rotating = rotating

    }

    canvas_repositioning(x, y) {
        this._x = x
        this._y = y
    }

    get_x() {
        return this._x
    }

    set_x(x) {
        if (this._moving) {
            this._x = x
        }
    }

    get_y(){
        return this._y
    }

    set_y(y) {
        if (this._moving) {
            this._y = y
        }
    }

    get_img() {
        return this._img
    }

    get_direction() {
        return this._direction
    }

    rotate_left() {
        if (this._rotating) {
            this._direction -= 90

            if (this._direction < 0)
                this._direction = 360 - (-1 * this._direction)
        }
    }

    rotate_right() {
        if (this._rotating) {
            this._direction = (this._direction + 90) % 360
        }
    }

    locked() {
        return !this._rotating
    }

}
