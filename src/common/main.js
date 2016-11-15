

TOTAL_COMMENTS_TO_REMEMBER = 10000;
PADDING = 10;
USE_DARK_THEME = false;
THEME_DARK_COLOR = '#444444';
THEME_LIGHT_COLOR = '#FFFDCC';

if (kango.storage.getItem("totalitems") === null){
    kango.storage.setItem("totalitems", TOTAL_COMMENTS_TO_REMEMBER);
    console.log("Setting default for totalitems: " + kango.storage.getItem("totalitems"));
}

if (kango.storage.getItem("padding") === null){
    kango.storage.setItem("padding", PADDING);
    console.log("Setting default for padding: 10");
}

if (kango.storage.getItem("useDarkTheme") === null){
    kango.storage.setItem("useDarkTheme", USE_DARK_THEME);
    console.log("Setting default for Theme: %s", USE_DARK_THEME);
}

if (kango.storage.getItem("themeDarkColor") === null){
    kango.storage.setItem("themeDarkColor", THEME_DARK_COLOR);
    console.log("Setting default for dark-theme: #%s", THEME_DARK_COLOR);
}

if (kango.storage.getItem("themeLightColor") === null){
    kango.storage.setItem("themeLightColor", THEME_LIGHT_COLOR);
    console.log("Setting default for light-theme: #%s", THEME_LIGHT_COLOR);
}

function getSettings() {
    return {
        'totalitems': kango.storage.getItem('totalitems'),
        'useDarkTheme': kango.storage.getItem('useDarkTheme'),
        'themeDarkColor': kango.storage.getItem('themeDarkColor'),
        'themeLightColor': kango.storage.getItem('themeLightColor'),
        "padding": kango.storage.getItem('padding')
    };
}
