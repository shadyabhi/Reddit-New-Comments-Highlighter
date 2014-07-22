//Function that saves settings
function save_options() {
    var totalitems_input = document.getElementById("totalitems");
    var padding_input = document.getElementById("padding");
    var button = document.getElementsByTagName("button")[0];
    localStorage["totalitems"] = totalitems_input.value;
    localStorage["padding"] = padding_input.value;
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    var totalitems_input = document.getElementById("totalitems");
    var padding_input = document.getElementById("padding");

    totalitems_input.value = localStorage["totalitems"];
    padding_input.value = localStorage["padding"];
}

//Do all this stuff when page laods
window.onload = function () {
    restore_options();
    var button = document.getElementsByTagName("button")[0];

    button.addEventListener( 'click', function() {
        button.className  = button.className + " btn-success";
        button.innerText = "Success. Settings saved";
    }, false);
}
