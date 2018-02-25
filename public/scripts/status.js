setTimeout(function(){
    $('#status-check').remove();
}, 2000);

var query = window.location.search.substring(1)

// is there anything there ?
if(query.length) {
   // are the new history methods available ?
   if(window.history != undefined && window.history.pushState != undefined) {
        // if push state exists, add a new state the the history, this changes the url without reloading the page

        window.history.pushState({}, document.title, window.location.pathname);
   }
}