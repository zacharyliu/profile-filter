var c = document.querySelector('#canvas');
var cx = c.getContext('2d');
var cropper;

var overlay = new Image();
overlay.src = 'filter.png';
overlay.onload = function (e) {
  cropper = new Cropper(c, {
    aspectRatio: 1,
    movable: false,
    zoomable: false,
    scalable: false,
  });
};

document.getElementById('file').addEventListener('change', function (e) {
  e.preventDefault();
  var files = this.files;
  if (files.length > 0) {
    var file = files[0];
    if (file.type.indexOf('image') !== -1) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        cropper.replace(e.target.result);
      };
    }
  }
}, false);

document.getElementById('download').addEventListener('click', function (e) {
  var cropped = cropper.getCroppedCanvas({
    width: 2000,
    height: 2000,
  });
  cropped.getContext('2d').drawImage(overlay, 0, 0, cropped.width, cropped.height);
  this.href = cropped.toDataURL('image/jpeg');
}, false);
