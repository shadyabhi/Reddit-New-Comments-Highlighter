NewCommentsHighlighter = {

    presentCommentMarker: -1,
    new_comment_boxes: null,
    newcomments_padding : null,

    init: function() {
    //Add shortcuts
    shortcut.add("Shift+Up",function() {
        NewCommentsHighlighter.gotoPreviousComment(NewCommentsHighlighter.presentCommentMarker);
    });
    shortcut.add("Shift+Down", function() {
        NewCommentsHighlighter.gotoNextComment(NewCommentsHighlighter.presentCommentMarker);
    });

    var now = new Date();

    //var commentspage = document.getElementsByTagName("body")[0].classList.contains("comments-page");
    var commentspage = document.getElementsByClassName("comments-page").length;

    chrome.extension.sendRequest({method: "getLocalStorage", key: "number_of_days"}, function(response) {
          console.log(response.data);
    });
    
    chrome.extension.sendRequest({method: "getLocalStorage", key: "padding"}, function(response) {
          NewCommentsHighlighter.newcomments_padding = parseInt(response.data, 10);
    });

    //Clean localstorage for entried older than 7 days
    for (i=0; i<localStorage.length; i++){
        if (localStorage.key(i).match(/^cc-/) != null){
            comment_stored_on = new Date(parseInt(localStorage[localStorage.key(i)].split(",")[0]));
            if ( ((now - comment_stored_on)/1000/3600/24) > 0.5){
                localStorage.removeItem(localStorage.key(i));
                console.log("To delete: " + comment_stored_on.getDate());
            }
            else{
                console.log(((now - comment_stored_on)/1000/3600/24));
            }
        }
    }
    // Update comment count if viewing a comments page
    if( commentspage ){

        var thing = document.getElementById("siteTable").getElementsByClassName("thing")[0].classList;
        var id = thing.toString().match(/_(.*?) /)[1];
        var data = localStorage.getItem('cc-'+id);
        var count = document.getElementsByClassName("comments")[0].innerText.split(" ")[0];

        // If we've been here before, highlight any new comments made since our last visit.
        // After highlighting only, we will update the localStorage about lastvisit time for the comments page
        if (data){ 
            data=data.split(',');
            console.log(new Date(parseInt(data[0], 10)).toString());
            console.log("Saved Time in localStorage: " + localStorage.getItem("cc-"+id));
            console.log("Saved Time in localStorage: (String) " + new Date(parseInt(localStorage.getItem("cc-"+id).split(","), 10)).toString());
            var comment_boxes = document.getElementsByClassName("noncollapsed");
            for (i=0; i < comment_boxes.length; i++){
                time_tag = comment_boxes[i].getElementsByTagName("time");

                if (time_tag.length == 0){
                    //We don't actually have a comment here
                    continue;
                }
                //In other case, we are just gonna continue executing.
                console.log(comment_boxes[i]);
                console.log(i + ": Comment on: " + new Date(Date.parse(time_tag[0].getAttribute("datetime"))).toString() + "Reference: " + new Date(parseInt(data[0], 10)).toString());
                if (Date.parse(time_tag[0].getAttribute("datetime")) > parseInt(data[0], 10)){
                    console.log("Adding CSS to above : " + i);
                    console.log(comment_boxes[i]);
                    comment_boxes[i].style.backgroundColor = "#FFFDCC";
                    //Add a class for traversing among new comments
                    comment_boxes[i].className = comment_boxes[0].className + " newcomments";
            }
            }

        }
        //Now that we have comments highlighted, lets update the timestamp
        NewCommentsHighlighter.saveCommentCount(id,count);
        //Prepare the NodeList of unread comments
        NewCommentsHighlighter.new_comment_boxes = document.getElementsByClassName("newcomments");
        console.log("New comments; ");console.log(NewCommentsHighlighter.new_comment_boxes);
        }
    },

    saveCommentCount: function(id, count){
        //Function to save number of comments for this thingID.
        // Trim list to maximum 1000 links
        var list=(localStorage.getItem('cc-list')||id).split(',');
        while (list.length>1000){
            localStorage.removeItem('cc-'+list.shift());
        }
        // Save data for this thingID
        var now = new Date();
        if (list.indexOf(id)+1){
            list.push(id);
        }
        localStorage.setItem('cc-'+id,now.getTime()+','+count);
        localStorage.setItem('cc-list',list.join());
        console.log("New comments time saved at: "+ now.toString());
    },

    //Finds y value of given object
    findPos: function(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        console.log(curtop);
        console.log(NewCommentsHighlighter.newcomments_padding);
        return [curtop - NewCommentsHighlighter.newcomments_padding];
        }
    },

    gotoNextComment: function(pos) {
        console.log(pos);
        console.log(NewCommentsHighlighter.new_comment_boxes);
        if (NewCommentsHighlighter.new_comment_boxes.length == 0){
            return;
        } 
        NewCommentsHighlighter.presentCommentMarker = pos + 1;
        var comment = NewCommentsHighlighter.new_comment_boxes[NewCommentsHighlighter.presentCommentMarker];
        console.log(comment);
        window.scroll(0, NewCommentsHighlighter.findPos(comment));
        
    },
    
    gotoPreviousComment: function(pos) {
        console.log(pos);
        if (NewCommentsHighlighter.new_comment_boxes.length == 0){
            return;
        }
        if (pos > 0){
             NewCommentsHighlighter.presentCommentMarker = pos - 1;
        }
        var comment = NewCommentsHighlighter.new_comment_boxes[NewCommentsHighlighter.presentCommentMarker];
        console.log(comment);
        window.scroll(0, NewCommentsHighlighter.findPos(comment)); 
    }
    
};

NewCommentsHighlighter.init();
