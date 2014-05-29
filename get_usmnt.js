$(document).ready(function(data) {
    var Req = new XMLHttpRequest();
//    Req.upload.addEventListener("progress", updateProgress, false);
    Req.upload.addEventListener("load", transferComplete, false);
//    Req.upload.addEventListener("error", transferFailed, false);
//    Req.upload.addEventListener("abort", transferCanceled, false); 
    new function(transferComplete) {
        Req.open("get", "http://www.ussoccer.com/mens-national-team/lineups/2003-lineups", true);
    }
    alert(Req);
});
