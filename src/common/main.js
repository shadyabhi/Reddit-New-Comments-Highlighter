

TOTAL_COMMENTS_TO_REMEMBER = 10000;
PADDING = 10;
USE_DARK_THEME = false;
THEME_DARK_COLOR = '#444444';
THEME_LIGHT_COLOR = '#FFFDCC';
AUTO_CHANGE_THEME = false;
THEME_START_TIME = '18:00';
THEME_END_TIME = '08:00';

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

if (kango.storage.getItem("autoChangeTheme") === null){
    kango.storage.setItem("autoChangeTheme", AUTO_CHANGE_THEME);
    console.log("Setting default for auto change theme: %s", AUTO_CHANGE_THEME);
}

if (kango.storage.getItem("themeStartTime") === null){
    kango.storage.setItem("themeStartTime", THEME_START_TIME);
    console.log("Setting default for start time of auto change theme: %s", THEME_START_TIME);
}

if (kango.storage.getItem("themeEndTime") === null){
    kango.storage.setItem("themeEndTime", THEME_END_TIME);
    console.log("Setting default for end time of auto change theme: %s", THEME_END_TIME);
}

function getSettings() {
    return {
        'totalitems': kango.storage.getItem('totalitems'),
        'useDarkTheme': kango.storage.getItem('useDarkTheme'),
        'themeDarkColor': kango.storage.getItem('themeDarkColor'),
        'themeLightColor': kango.storage.getItem('themeLightColor'),
        "padding": kango.storage.getItem('padding'),
        'autoChangeTheme': kango.storage.getItem('autoChangeTheme'),
        'themeStartTime': kango.storage.getItem('themeStartTime'),
        'themeEndTime': kango.storage.getItem('themeEndTime')
    };
}
