$(document).ready(function () {
    $('#layer-list-export-png').click(function () {
        var dataURL = map.getCanvas().toDataURL();
        window.open(dataURL);
    });

    $('#layer-list-export-pdf').click(function () {
        var dataURL = map.getCanvas().toDataURL();
        var blob = dataURLToBlob(dataURL);

        var fileReader = new FileReader;

        fileReader.onload = function () {
            var img = new Image;

            img.onload = function () {
                var width = img.width;
                var height = img.height;
                var aspectRatio = width / height;
                var doc;
                var widthInMm;
                var heightInMm;
                if (width > height) {
                    doc = new jsPDF('landscape');
                    widthInMm = 297;
                    heightInMm = 297 / aspectRatio;
                } else {
                    doc = new jsPDF();
                    widthInMm = 297 * aspectRatio;
                    heightInMm = 297;
                }
                doc.addImage(dataURL, 'PNG', 0, 0, widthInMm, heightInMm);
                doc.save('renaagis-map-export.pdf')
            };

            img.src = fileReader.result;
        };
        fileReader.readAsDataURL(blob);
    });
});

function dataURLToBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);

        return new Blob([raw], {type: contentType});
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
}