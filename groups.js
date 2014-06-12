//this is the sandbox

var httpRequest;
if(window.XMLHttpRequest) {
    httpRequest = new XMLHttpRequest();
}
else if(window.ActiveXObject) {
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
};

httpRequest.onreadystatechange = function() {
    console.log(httpRequest);
};

httpRequest.open('GET', 'https://www.fifa.com/worldcup/matches/index.html',
                 true)
httpRequest.send(null);

if(httpRequest.readyState === 4) {
    if(httpRequest.status === 200) {
        var match1;
        match1 = httpRequest.responseXML;
        document.write(match1);
    }
    else {
        console.log('broke in status return');
    };
}
else {
    console.log('broke in ready state');
};


