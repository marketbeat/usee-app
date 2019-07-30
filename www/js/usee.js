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
    $('.botonF1').click(function(){
        window.location = "registro.html"
    })
})

var playlist_usee = json_decode(localStorage.getItem("playlist_usee"));
$.each(playlist_usee, function(index, item) {
    console.log("Playing:" + item.nombre_imagen);
    add_slide_nodes(item.nombre_imagen);
});
// add_slide_nodes('useeupoll001.jpg');
// add_slide_nodes('useeupoll002.jpg');
// add_slide_nodes('useeupoll003.jpg');
// add_slide_nodes('useeupoll004.jpg');
// add_slide_nodes('useeupoll005.jpg');
// add_slide_nodes('useeupoll006.jpg');
// add_slide_nodes('useeupoll007.jpg');
// add_slide_nodes('useeupoll008.jpg');

function add_slide_nodes(local_name) {
    $('.slides').append('<div><img data-u="image" src="file:///storage/emulated/0/'+local_name+'" /></div>')
}

///FUNCIONES PERSONALIZADAS
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

///PLUGIN DE SLIDESHOW
jssor_1_slider_init = function() {
    var jssor_1_options = {
        $FillMode: 2,
        $AutoPlay: 1,
        $Idle: 4000,
        $PauseOnHover: 1,
        $SlideEasing: $Jease$.$OutQuint,
        $SlideDuration: 800,
        $MinDragOffsetToSlide: 20
    };
    var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);
    jssor_1_slider.$Elmt.style.margin = "";
    var MAX_WIDTH = 3000;
    var MAX_HEIGHT = 3000;
    var MAX_BLEEDING = 0.128;

    function ScaleSlider() {
        var containerElement = jssor_1_slider.$Elmt.parentNode;
        var containerWidth = containerElement.clientWidth;
        if (containerWidth) {
            var originalWidth = jssor_1_slider.$OriginalWidth();
            var originalHeight = jssor_1_slider.$OriginalHeight();
            var containerHeight = containerElement.clientHeight || originalHeight;
            var expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);
            var expectedHeight = Math.min(MAX_HEIGHT || containerHeight, containerHeight);
            jssor_1_slider.$ScaleSize(expectedWidth, expectedHeight, MAX_BLEEDING);
            jssor_1_slider.$Elmt.style.top = ((containerHeight - expectedHeight) / 2) + "px";
            jssor_1_slider.$Elmt.style.left = ((containerWidth - expectedWidth) / 2) + "px";
        }
        else {
            window.setTimeout(ScaleSlider, 30);
        }
    }

    function OnOrientationChange() {
        ScaleSlider();
        window.setTimeout(ScaleSlider, 800);
    }

    ScaleSlider();

    $Jssor$.$AddEvent(window, "load", ScaleSlider);
    $Jssor$.$AddEvent(window, "resize", ScaleSlider);
    $Jssor$.$AddEvent(window, "orientationchange", OnOrientationChange);
};
