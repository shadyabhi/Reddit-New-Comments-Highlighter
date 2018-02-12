//Function that saves settings
function save_options() {
    var totalitems_input = document.getElementById("totalitems");
    var padding_input = document.getElementById("padding");
    var button = document.getElementsByTagName("button")[0];

    var useDarkTheme = document.getElementById("theme");
    var darkTheme = document.getElementById("theme-dark");
    var lightTheme = document.getElementById("theme-light");
    var autoChangeTheme = document.getElementById("auto-change-theme");
    var themeStartTime = document.getElementById("theme-start-time");
    var themeEndTime = document.getElementById("theme-end-time");

    localStorage["totalitems"] = totalitems_input.value;
    localStorage["padding"] = padding_input.value;

    localStorage["themeDarkColor"] = JSON.stringify(darkTheme.value);
    localStorage["themeLightColor"] = JSON.stringify(lightTheme.value);
    localStorage["useDarkTheme"] = useDarkTheme.checked;
    localStorage["autoChangeTheme"] = autoChangeTheme.checked;
    localStorage["themeStartTime"] = '"'+themeStartTime.value+'"';
    localStorage["themeEndTime"] = '"'+themeEndTime.value+'"';
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    var totalitems_input = document.getElementById("totalitems");
    var padding_input = document.getElementById("padding");

    var useDarkTheme = document.getElementById("theme");
    var darkTheme = document.getElementById("theme-dark");
    var lightTheme = document.getElementById("theme-light");
    var autoChangeTheme = document.getElementById("auto-change-theme");
    var themeStartTime = document.getElementById("theme-start-time");
    var themeEndTime = document.getElementById("theme-end-time");

    totalitems_input.value = localStorage["totalitems"];
    padding_input.value = localStorage["padding"];
    darkTheme.value = JSON.parse(localStorage["themeDarkColor"]);
    lightTheme.value = JSON.parse(localStorage["themeLightColor"]);
    useDarkTheme.checked = localStorage["useDarkTheme"] === "true";
    autoChangeTheme.checked = localStorage["autoChangeTheme"] === "true";
    themeStartTime.value = localStorage["themeStartTime"].replace(/\"|\\/g, '');
    themeEndTime.value = localStorage["themeEndTime"].replace(/\"|\\/g, '');
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
    
    var disableTimeBoxes = function() {
        if(!autoChangeCheckbox.checked) {
            document.getElementById("theme-start-time").disabled = true;
            document.getElementById("theme-end-time").disabled = true;
        }
        else {
            document.getElementById("theme-start-time").disabled = false;
            document.getElementById("theme-end-time").disabled = false;
        }
    };
    var autoChangeCheckbox = document.getElementById("auto-change-theme");
    autoChangeCheckbox.addEventListener( 'change', disableTimeBoxes);
    disableTimeBoxes();
};
