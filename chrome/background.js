//Perform initial setup

if (localStorage.getItem("totalitems") === null){
    localStorage.setItem("totalitems", 1000);
}

if (localStorage.getItem("padding") === null){
    localStorage.setItem("padding", 10);
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
if (request.method == "getLocalStorage")
    sendResponse({data: localStorage[request.key]});
else
    sendResponse({}); // snub them.
});
