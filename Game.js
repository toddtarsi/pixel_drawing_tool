//canvas - Handles rendering manipulation
//

var artist = (function(idString){

  var artist = {};
  
  artist.ctx = document.getElementById(idString).getContext('2d');
  artist.colors ={px:'#000000',bg:'#FFFFFF'};
  
  artist.canvas = (function() {
    var canvas = {};
    canvas.dimensions = [800, 800];
    canvas.position = [0, 0];
    canvas.setDimensions = function(){
      local.dimensions = dimensions;
      $('#' + idString).width(dimensions[0] + 'px');
      $('#' + idString).height(dimensions[1] + 'px');
      return console.log('reset dimensions');
    };
    return canvas;
  })();
  
  artist.data = (function(){
    var data = {};
    data.currentImage = [];
    data.size = 'medium';
    data.width = 20;
    data.height = 20;
    var init = function init(){
      for (var i = 0; i < data.height; i++) {
        data.currentImage[i] =  [];
        for (var j = 0; j < data.width; j++) {
          data.currentImage[i][j] = '';
        }
      }
    }();
    data.refresh = function refreshImageData(size){
      data.size = size;
      data.width = {tall: 10, wide: 30, small: 10, medium: 20, large: 30}[data.size];
      data.height = {tall: 30, wide: 15, small: 10, medium: 20, large: 30}[data.size];
      for (var j = 1; j <= data.height; j++) {
        if (!data.currentImage[i]) data.currentImage.push([]);
        for (var i = 1; i <= data.width; i++) {
          if (!data.currentImage[i][j]) data.currentImage[i][j] = '';
        }
      }
    };
    data.updatePixel = function updatePixelData(i, j, color) {
      data.currentImage[i][j] = color;
      artist.draw.pixel(i,j);
    }
    return data;
  })();
  
  artist.draw = (function(){
    var draw = {};
    draw.pixel = function drawPixel(i,j){
      artist.ctx.fillStyle = artist.data.currentImage[i][j] === '' ? artist.colors.bg : artist.data.currentImage[i][j];
      artist.ctx.fillRect(i*25 + 25,j*25 + 25,24,24);
    };
    draw.clear = function clearPixelMap(){
      artist.ctx.setTransform(1,0,0,1,0,0);
      artist.ctx.clearRect(0,0, artist.canvas.dimensions[0], artist.canvas.dimensions[1]);
    };
    draw.screen = function(){
      draw.clear();
      for (var j = 0; j < artist.data.width; j++) {
        for (var i = 0; i < artist.data.height; i++) {
          draw.pixel(i,j);
        }
      }
    };
    draw.screen();
    return draw;
  })();
  
  artist.bindInputs = function(){
    var dragging = false;
    var erasing = false;
    
    $(document).on('contextmenu', function(event){
      event.preventDefault();
      erasing = true;
      return false;
    });
    
    $('#pxColor').change(function(value){
      artist.colors.px = $('#pxColor').val();
    });

    $('#bgColor').change(function(value){
      artist.colors.bg = $('#bgColor').val();
      artist.draw.screen();
    });

    $('select.gridDimensions').change(function(){
      var newSize = $('.gridDimensions').val();
      artist.data.refresh(newSize);
      artist.draw.screen();
    });

    $('#' + idString).mousedown(function(event){
      event.preventDefault();
      dragging = true;
      var xPixel = Math.floor(event.offsetX/25) - 1;
      var yPixel = Math.floor(event.offsetY/25) - 1;
      if(event.button==2) erasing = true;
      if (xPixel >= 0 && xPixel < artist.data.height && yPixel >= 0 && yPixel < artist.data.height ) {
        if (erasing) artist.data.updatePixel(xPixel,yPixel, '');
        else artist.data.updatePixel(xPixel,yPixel, artist.colors.px);
      }
      if(event.which==2) return false;
    });

    $('#' + idString).mousemove(function(event){
      event.preventDefault();
      if (dragging) {
        var xPixel = Math.floor(event.offsetX/25) - 1;
        var yPixel = Math.floor(event.offsetY/25) - 1;
        if (xPixel >= 0 && xPixel < artist.data.height && yPixel >= 0 && yPixel < artist.data.height ) {
          if (erasing) artist.data.updatePixel(xPixel,yPixel, '');
          else artist.data.updatePixel(xPixel,yPixel, artist.colors.px);
        }
      }
    });

    $('#' + idString).mouseup(function(event){
      event.preventDefault();
      dragging = false;
      erasing = false;
    });
  }();
  
  return artist;
})('gameCanvas');

$('#bgColor').val('#FFFFFF').change();

