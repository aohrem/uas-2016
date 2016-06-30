$(document).ready(function() {
    $('#layer-list-export-png').click(function () {
        var dataURL = map.getCanvas().toDataURL();
        window.open(dataURL);
    });

    $('#layer-list-export-pdf').click(function () {
        var dataURL = map.getCanvas().toDataURL();
        var doc = new jsPDF();
        doc.addImage(dataURL, 'PNG', 15, 40, 180, 160);
        doc.save('test.pdf')
    });
});

function convertDataURLToImageData(dataURL, callback) {
    if (dataURL !== undefined && dataURL !== null) {
        var canvas, context, image;
        canvas = document.createElement('canvas');
        canvas.width = 470;
        canvas.height = 470;
        context = canvas.getContext('2d');
        image = new Image();
        image.addEventListener('load', function(){
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            callback(context.getImageData(0, 0, canvas.width, canvas.height));
        }, false);
        image.src = dataURL;
    }
}