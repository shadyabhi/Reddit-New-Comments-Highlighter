// ==UserScript==
// @name Reddit New Comments Highlighter
// @include http://www.reddit.com/r/*/comments/*
// @include https://www.reddit.com/r/*/comments/*
// ==/UserScript==

//var $ = window.$.noConflict(true); // Required for Opera and IE

NewCommentsHighlighter = {

    extension_settings: null,
    isCommentsPage: null,
    dateNow: null,
    commentId: null,
    commentData: null,
    count: null,

    init: function() {

        NewCommentsHighlighter.dateNow = new Date();
        NewCommentsHighlighter.isCommentsPage = document.getElementsByClassName("comments-page").length;

        //Get all settings from background script and call main
        kango.invokeAsync('getSettings', function (val){
            NewCommentsHighlighter.extension_settings = val;
            NewCommentsHighlighter.main();
        });
    },

    scanAndAddTriggers: function(){
        // This function adds onclick events
        var loadMoreComments = document.getElementsByClassName("morecomments");
        $.each($(".morecomments"), function(i, moreCommentsLink){
            moreCommentsLink.onclick = function(){
                window.setTimeout(NewCommentsHighlighter.highlightNewComments, 3000);
            };
        });
    },

    highlightNewComments: function(){
        var commentData = NewCommentsHighlighter.commentData;
        var commentId = NewCommentsHighlighter.commentId;
        var count = NewCommentsHighlighter.count;

        var themeColor;

        if (this.extension_settings['autoChangeTheme']) {
            var startTime = new Date('1970-01-01 ' + this.extension_settings["themeStartTime"]);
            var endTime = new Date('1970-01-01 ' + this.extension_settings["themeEndTime"]);
            var timeNow = new Date();
            if ((timeNow.getHours() >= startTime.getHours() && timeNow.getMinutes() >= startTime.getMinutes()) ||
                (timeNow.getHours() <= endTime.getHours() && timeNow.getMinutes() <= endTime.getMinutes())) {
                themeColor = this.extension_settings["themeDarkColor"];
            }
            else {
                themeColor = this.extension_settings["themeLightColor"];
            }
        }
        else {
            themeColor = this.extension_settings['useDarkTheme'] ? this.extension_settings["themeDarkColor"] : this.extension_settings["themeLightColor"];
        }

        if (commentData){
            commentData=commentData.split(',');
            var comment_boxes = $('.noncollapsed > .entry.unvoted');
            for (var i=0; i < comment_boxes.length; i++){
                var time_tag = comment_boxes[i].getElementsByTagName("time");

                if (time_tag.length == 0){
                    //We don't actually have a comment here
                    continue;
                }
                //In other case, we are just gonna continue executing.
                if (Date.parse(time_tag[0].getAttribute("datetime")) > parseInt(commentData[0], 10)){
                    console.log(comment_boxes[i]);
                    $(comment_boxes[i]).attr('style', 'background-color: ' + themeColor + ' !important');
                    //Add a class for traversing among new comments
                    comment_boxes[i].className = comment_boxes[0].className + " newcomments";
            }
            }

        }
    },

    saveCommentCount: function(){
        var commentId = NewCommentsHighlighter.commentId;
        var count = NewCommentsHighlighter.count;

        //Function to save number of comments for this thingID.
        // Trim list to maximum 1000 links
        var itemsToKeep = null;
        itemsToKeep = NewCommentsHighlighter.extension_settings['totalitems'];
        var list=(localStorage.getItem('cc-list')||commentId).split(',');
        while (list.length > itemsToKeep){
            localStorage.removeItem('cc-'+list.shift());
        }
        // Save data for this thingID
        var now = new Date();
        if (list.indexOf(commentId)+1){
            list.push(commentId);
        }
        localStorage.setItem('cc-'+commentId,now.getTime()+','+count);
        localStorage.setItem('cc-list',list.join());
    },

    main: function() {

        if( NewCommentsHighlighter.isCommentsPage ){

            //"thing" is the top part of the page which contains actual link and other smaller a hrefs.
            var thing = document.getElementById("siteTable").getElementsByClassName("thing")[0].classList;

            NewCommentsHighlighter.commentId = thing.toString().match(/_(.*?) /)[1];
            NewCommentsHighlighter.commentData = localStorage.getItem('cc-'+NewCommentsHighlighter.commentId);
            NewCommentsHighlighter.count = document.getElementsByClassName("comments")[0].textContent.split(" ")[0];

            // Add onclick events on all "load more comments" link to trigger highlights when they are clicked
            // This is done because there might be new comments wrapper under "load more comments".
            NewCommentsHighlighter.scanAndAddTriggers();

            NewCommentsHighlighter.highlightNewComments();
            NewCommentsHighlighter.saveCommentCount();
            NewCommentsHighlighter.new_comment_boxes = document.getElementsByClassName("newcomments");
        }

    }
};

NewCommentsHighlighter.init();
