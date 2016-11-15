//Function that saves settings
function save_options() {
    var totalitems_input = document.getElementById("totalitems");
    var padding_input = document.getElementById("padding");
    var button = document.getElementsByTagName("button")[0];

    var useDarkTheme = document.getElementById("theme");
    var darkTheme = document.getElementById("theme-dark");
    var lightTheme = document.getElementById("theme-light");

    localStorage["totalitems"] = totalitems_input.value;
    localStorage["padding"] = padding_input.value;

    localStorage["themeDarkColor"] = JSON.stringify(darkTheme.value);
    localStorage["themeLightColor"] = JSON.stringify(lightTheme.value);
    localStorage["useDarkTheme"] = useDarkTheme.checked;
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    var totalitems_input = document.getElementById("totalitems");
    var padding_input = document.getElementById("padding");

    var useDarkTheme = document.getElementById("theme");
    var darkTheme = document.getElementById("theme-dark");
    var lightTheme = document.getElementById("theme-light");

    totalitems_input.value = localStorage["totalitems"];
    padding_input.value = localStorage["padding"];
    darkTheme.value = JSON.parse(localStorage["themeDarkColor"]);
    lightTheme.value = JSON.parse(localStorage["themeLightColor"]);
    useDarkTheme.checked = localStorage["useDarkTheme"] === "true";
}

//Do all this stuff when page loads
window.onload = function () {
    restore_options();
    var button = document.getElementsByTagName("button")[0];


    button.addEventListener( 'click', function() {
        save_options();
        button.className  = button.className + " btn-success";
        button.innerText = "Success. Settings saved";
    }, false);
}
