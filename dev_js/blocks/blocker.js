class Blocker extends MasterBlock {
    constructor(heading, x, y, moving, rotating) {
        super("img/blokkolo.png", heading, x, y, moving, rotating)
    }

    get_newDir(dir) {
        return [dir]
    }
}
