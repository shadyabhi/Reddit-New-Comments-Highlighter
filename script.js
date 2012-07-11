NewCommentsHighlighter = {
    init: function() {
    
    var now = new Date();

    //var commentspage = document.getElementsByTagName("body")[0].classList.contains("comments-page");
    var commentspage = document.getElementsByClassName("comments-page").length;
    console.log(commentspage);

    chrome.extension.sendRequest({method: "getLocalStorage", key: "number_of_days"}, function(response) {
          console.log(response.data);
    });
    //Clean localstorage for entried older than 7 days
    for (i=0; i<localStorage.length; i++){
        if (localStorage.key(i).match(/^cc-/) != null){
            comment_stored_on = new Date(parseInt(localStorage[localStorage.key(i)].split(",")[0]))
            if ( ((now - comment_stored_on)/1000/3600/24) > 0.5){
                localStorage.removeItem(localStorage.key(i));
                console.log("To delete: " + comment_stored_on.getDate());
            }
            else
                console.log(((now - comment_stored_on)/1000/3600/24));
        }
    }
    // Update comment count if viewing a comments page
    if( commentspage ){

        var thing = document.getElementById("siteTable").getElementsByClassName("thing")[0].classList;
        var id = thing.toString().match(/_(.*?) /)[1];
        var data = localStorage.getItem('cc-'+id);
        var count = document.getElementsByClassName("comments")[0].innerText.split(" ")[0]
        
        // If we've been here before, highlight any new comments made since our last visit.
        // After highlighting only, we will update the localStorage about lastvisit time for the comments page
        if (data){ 
            data=data.split(',');
            console.log(new Date(parseInt(data[0])).toTimeString());
            console.log("Saved Time in localStorage: " + localStorage.getItem("cc-"+id));
            var comment_boxes = document.getElementsByClassName("noncollapsed");
            for (i=0; i < comment_boxes.length; i++){
                console.log("Comment on: " + new Date(Date.parse(comment_boxes[i].getElementsByTagName("time")[0].getAttribute("datetime"))).toTimeString() + "Reference: " + new Date(parseInt(data[0])).toTimeString());
                if (Date.parse(comment_boxes[i].getElementsByTagName("time")[0].getAttribute("datetime")) > parseInt(data[0])){
                    console.log("Add CSS to: " + comment_boxes[i]);
                    comment_boxes[i].style.backgroundColor = "#FFFDCC";
            }
            }

        }
        NewCommentsHighlighter.saveCommentCount(id,count);
        }
    },

    saveCommentCount: function(id, count){
        //Function to save number of comments for this thingID.
        // Trim list to maximum 1000 links
        var list=(localStorage.getItem('cc-list')||id).split(',');
        while(list.length>1000)localStorage.removeItem('cc-'+list.shift());

        // Save data for this thingID
        var now = new Date();
        if(list.indexOf(id)+1)list.push(id);
        localStorage.setItem('cc-'+id,now.getTime()+','+count);
        localStorage.setItem('cc-list',list.join());
        console.log("New comments time saved at: "+ now.toTimeString());
    }
};

NewCommentsHighlighter.init()
