

TOTAL_COMMENTS_TO_REMEMBER = 10000;
PADDING = 10;

if (kango.storage.getItem("totalitems") === null){
    kango.storage.setItem("totalitems", TOTAL_COMMENTS_TO_REMEMBER);
    console.log("Setting default for totalitems: " + kango.storage.getItem("totalitems"));
}

if (kango.storage.getItem("padding") === null){
    kango.storage.setItem("padding", PADDING);
    console.log("Setting default for padding: 10");
}

function getSettings() {
    return {'totalitems': kango.storage.getItem('totalitems'), "padding": kango.storage.getItem('padding')};
}
