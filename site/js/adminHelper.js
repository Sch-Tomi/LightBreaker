
function $(select) {
    return document.querySelector(select);
}

function setRaw(){
    $("#lvl-helper-raw").value = "[Field]\n\n[Parking]\n"
}

function add() {
    block = get_options()
    $("#lvl-helper-raw").value = generate_newRaw(block)
}

function get_options(){
    /*
    "type": "Laser",
    "heading": 180,
    "col": 1,
    "row": 1,
    "moving": false,
    "rotating": false
    */
    options = [
        $("#lvl-helper-type").value,
        $("#lvl-helper-heading").value,
        $("#lvl-helper-col").value,
        $("#lvl-helper-row").value,
        $("#lvl-helper-movable").checked,
        $("#lvl-helper-rotatable").checked,
    ]

    if ($("#lvl-helper-where").value == "Field"){
        if(options[1] == "") options[1] = 0 // heading
        if(options[2] == "") options[2] = 0 // col
        if(options[3] == "") options[3] = 0 // row
    }

    if ($("#lvl-helper-where").value == "Parking") {
        options[1] = 0 // heading
        options[2] = 0 // col
        options[3] = 0 // row
        options[4] = true // movable
    }

    return options.join(":")
}

function generate_newRaw(block) {

    newRaw = ""
    added = false;

    if($("#lvl-helper-where").value == "Field"){
        for (let line of $("#lvl-helper-raw").value.split("\n")) {
            if (line == "" && !added) {
                newRaw += block+"\n\n"
                added = true;
            }else {
                if (line != "") {
                    newRaw += line+"\n"
                }
            }
        }
    }
    else if ($("#lvl-helper-where").value == "Parking") {
        newRaw = $("#lvl-helper-raw").value
        newRaw += block +"\n"
    }

    return newRaw
}

window.addEventListener('load', function() {
    setRaw()
    $("#lvl-helper-add").onclick = add
});
