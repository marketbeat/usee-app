var url = 'http://xmpp.radiomarketbeat.com/plataforma/assets/lnImagenes/';

///INICIALIZACION DE APP
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }
};

app.initialize();

$(document).ready(function(){
    get_playlist_updated_usee()
})

var pf_local = 0;
var pf_server = 0;

/// DESCARGA DE CONTENIDO
function update_files() {
    document.addEventListener("deviceready", function() {
        var playlist_usee = json_decode(localStorage.getItem("playlist_usee"));
        $.each(playlist_usee, function(index, item) {
            pf_server++;
            search_file_local(item.nombre_imagen);
        });
    }, false);
    setInterval('local_wait()',1000);

}

function local_wait(){
    if(pf_local >= pf_server){
        window.location = "usee.html"
    }
}

function get_playlist_updated_usee() {
    var data ={
        'id_app' : id_app,
        'X-API-KEY': key_value
    };
    $.ajax({
        url: base_url + "usee_services/get_lista",
        type: "POST",
        dataType: 'json',
        data : data,
        success: function(response) {
            if(response.status == "success"){
                console.log(json_encode(response.data));
                localStorage.setItem("playlist_usee", json_encode(response.data));
                update_files();
            }else{
                console.log("Error POST: No se obtuvo la lista de imagenes actualizada");
                window.location = "usee.html"
            }
        },
        error: function (request, status, error) {
            console.log("Sin conexion a Internet");
            window.location = "usee.html"
        }
    });
}

function search_file_local(file_name) {
    $.ajax({
        url: "file:///storage/emulated/0/" + file_name,
        type: 'HEAD',
        error: function(){
            download_file(file_name)
        },
        success: function(){
            pf_local++;
            console.log('Archivo ya existe: ' + file_name);
        }
    });
}

function download_file(file_name){
    var fileTransfer = new FileTransfer();
    console.log("About to start transfer:" + file_name);
    fileTransfer.download(url + file_name, "file:///storage/emulated/0/" + file_name,
        function(entry) {
            console.log("Success!");
            pf_local++;
        },
        function(err) {
            console.log("Error");
            console.dir(err);
        }
    );
}
