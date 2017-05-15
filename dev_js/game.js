class Game {
    constructor() {
        this.canvas = new Canvas()
        this.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

        this._setInteface()
        this._preventRightClick()

        this._minHit = 0

        this._lvl_data = ""

    }

    setLvl(data) {
        this._lvl_data = data;
    }

    run() {
        // Let's play this game!
        this._parseLvl();
        this._main();
    }

    _setInteface() {

        this._modal = new Modal()

        this.fireButton = document.createElement('button')
        this.fireButton.textContent = 'Tűz!'
        this.fireButton.className = 'fireBtn'
        this.fireButton.id = "fireButton"

        document.body.querySelector("#lightBreaker-fireButton").appendChild(this.fireButton)
        this.fireButton.onclick = () => {
            this._fire()
        }
    }

    _preventRightClick() {
        document.body.oncontextmenu = () => {
            return false
        }
    }

    _parseLvl() {
        let lvl = this._lvl_data[0]
        this._parseField(lvl.field)
        this._parseParking(lvl.parking)

        this._minHit = lvl.hits
        this.canvas.setLimit(this._minHit)
    }

    _parseField(field) {

        for (let block of field) {
            this.canvas.addBlock(this._createNewBlock(block))
        }

    }

    _parseParking(parking) {

        for (var block of parking) {
            this.canvas.addParkingBlock(this._createNewBlock(block))
        }

    }

    _createNewBlock(block) {
        switch (block.type) {
            case "HalfMirror":
                return new HalfMirror(block.heading, block.col, block.row, block.moving, block.rotating)
                break;
            case "Mirror":
                return new Mirror(block.heading, block.col, block.row, block.moving, block.rotating)
                break;
            case "DoubleMirror":
                return new DoubleMirror(block.heading, block.col, block.row, block.moving, block.rotating)
                break;
            case "Target":
                return new Target(block.heading, block.col, block.row, block.moving, block.rotating)
                break;
            case "CheckPoint":
                return new CheckPoint(block.heading, block.col, block.row, block.moving, block.rotating)
                break;
            case "Blcoker":
                return new Blocker(block.heading, block.col, block.row, block.moving, block.rotating)
                break;
            case "Laser":
                return new Laser(block.heading, block.col, block.row, block.moving, block.rotating)
                break;
        }

    }

    _fire() {
        if (this.canvas.isParkingEmpty()) {
            var result = new LaserPathCalculator(this.canvas.get_board(), this._minHit)
            if (result.valid) {
                this._modal.setUp("Gratulálok", ["Sikeresen teljesítetted a pályát!"])
                this._ajax({
                    mod: 'post',
                    url: '/game/report',
                    postadat: 'status=success&id='+window.location.pathname.split("/")[2],
                    siker: (xhr, txt) => {this._modal.setUp("Gratulálok", ["Ők is megoldották már: \n\n", txt]); this._modal.show()}
                })
            } else {
                let missNumber = parseInt(this._minHit) - parseInt(result.hits)
                if (missNumber == 0) {
                    this._modal.setUp("Nem sikerült!", ["Nem sikerült minden kötelező célt eltalálnod!"])
                } else {
                    this._modal.setUp("Nem sikerült!", ["Nem sikerült megfelelő számu célt eltalálnod!",
                        "Hiányzó találatok: " + missNumber
                    ])
                }
            }
            this.canvas.drawResult(result.paths)
        } else {
            this._modal.setUp("Hiba!", ["Minden tükröt kötelezően fel kell használnod!"])
        }

        this._modal.show()
    }

    _ajax(opts) {
        var mod = opts.mod || 'GET',
            url = opts.url || '',
            getadat = opts.getadat || '',
            postadat = opts.postadat || '',
            siker = opts.siker || function() {},
            hiba = opts.hiba || function() {};

        mod = mod.toUpperCase();

        if(this._endsWithPhp(url)){
            url = url + '?' + getadat;
        }

        var xhr = new XMLHttpRequest(); // ujXHR();
        xhr.open(mod, url, true);
        if (mod === 'POST') {
            xhr.setRequestHeader('Content-Type',
                'application/x-www-form-urlencoded');
        }
        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    siker(xhr, xhr.responseText);
                } else {
                    hiba(xhr);
                }
            }
        }, false);
        xhr.send(mod == 'POST' ? postadat : null);
        return xhr;
    }

    _endsWithPhp(url){

        return url[url.length-1] == "p" &&
                url[url.length-2] == "h" &&
                url[url.length-3] == "p"

    }

    _main() {
        this.canvas.render();

        // Request to do this again ASAP
        requestAnimationFrame(() => {
            this._main()
        });
    }

}
