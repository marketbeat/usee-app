var base_url = "http://xmpp.radiomarketbeat.com/resources_mobile/";
var key_value = "c526bef2-cc7d-48fc-830d-3c094788a942"
var id_app = "mb0002"

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function json_encode(str){
    return JSON.stringify(str);
}

function json_decode(str){
    return JSON.parse(str);
}
