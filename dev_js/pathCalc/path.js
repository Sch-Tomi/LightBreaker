class Path {
    constructor() {
        this._path = []
    }

    push(element) {
        this._path.push(element)
    }

    get length(){
        return this._path.length
    }

    get_last() {
        return this._path[this._path.length - 1]
    }

    get_path() {
        return this._path
    }
}
