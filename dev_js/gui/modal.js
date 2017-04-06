class Modal {
    constructor() {
        this._text = ""
        this._header = ""

        this._createModal()
        //this.show()
    }

    setUp(newHeader, newText){

        this._text = ""

        for (let text of newText) {
            this._text += "<p>"+text+"</p>"
        }

        this._header = newHeader
    }

    _createModal(){

        let modal = document.createElement('div')
        modal.id = "messageModal"
        modal.className = "modal"

        let content = document.createElement('div')
        content.className = "modal-content"

        let header = document.createElement('div')
        header.className = "modal-header"
        header.innerHTML += '<span id="messageModal-close" class="close">&times;</span>'
        header.innerHTML += '<h2 id="messageModal-header"></h2>'

        let body = document.createElement('div')
        body.className = "modal-body"
        body.id = "messageModal-body"

        content.appendChild(header)
        content.appendChild(body)
        modal.appendChild(content)

        document.body.appendChild(modal)

        document.querySelector('#messageModal-close').onclick = (e) => {this.hide()}
    }

    hide(){
        document.querySelector('#messageModal').style.display = "none";
    }

    show(){
        document.querySelector('#messageModal-header').innerHTML = this._header
        document.querySelector('#messageModal-body').innerHTML = "<p>"+this._text+"</p>"
        document.querySelector('#messageModal').style.display = "block";
    }
}
