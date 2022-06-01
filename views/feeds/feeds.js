function preFeeds(cate){
    var query = window.location.search.substring(1);
    var page = parseInt(query.charAt(query.length-1)) - 1;
    window.location.assign(`${cate ? "albums" : "photos"}?page=${page}`);
}
function nextFeeds(cate){
    var query = window.location.search.substring(1);
    var page = parseInt(query.charAt(query.length-1)) + 1;
    window.location.assign(`${cate ? "albums" : "photos"}?page=${page}`);
}

