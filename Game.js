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
    data.init = function initImageData(size){
      data.size = 'medium';
      data.width = 20;
      data.height = 20;
      for (var i = 0; i < artist.canvasSettings.height; i++) {
        if (!)data.currentImage.push([]);
        for (var j = 0; j < artist.canvasSettings.width; j++) {
          data.currentImage.push('');
        }
      }
      return true;
    };
    data.refresh = function refreshImageData(size){
      data.size = size;
      data.width = {tall: 10, wide: 30, small: 10, medium: 20, large: 30}[data.size];
      data.height = {tall: 30, wide: 15, small: 10, medium: 20, large: 30}[data.size];
      for (var j = 1; j <= data.height; j++) {
        if (!data.currentImage[i])data.currentImage.push([]);
          for (var i = 1; i <= data.width; i++) {
            if (!data.currentImage[i][j]) data.currentImage[i][j] = '';
          }
        }
      }
    };
    data.updatePixel = function updatePixelData(i, j, color) {
      artist.canvasSettings.currentImage[i][j] = color || '';
    }
    return data;
  })();
  
  artist.draw = (function(){
    var pixelator = {};
    pixelator.drawPixel = function drawPixel(i,j){
      artist.ctx.fillStyle = artist.canvasSettings.bgColor;
      artist.ctx.fillRect(i*25,j*25,24,24);
    };
    pixelator.render = function(){ 
      for (var j = 1; j <= artist.canvasSettings.height; j++) {
        for (var i = 1; i <= artist.canvasSettings.width; i++) {
          pixelator.drawPixel(i,j);
        }
      }
    };
    return pixelator;
  })();
  
  artist.inputs = function(){
    var dragging = false;
    
    $('#pxColor').change(function(value){
      artist.canvasSettings.pxColor = $('#pxColor').val();
    });

    $('#bgColor').change(function(value){
      artist.canvasSettings.bgColor = $('#bgColor').val();
      updateBackground();
    });

    $('select.gridDimensions').change(function(){
      var newSize = $('.gridDimensions').val();
      artist.canvasSettings.size = newSize;
      clearPixelMap();
      updateImageDataArrayDim();
      updateBackground();
    });

    $(idString).mousedown(function(event){
      event.preventDefault();
      artist.canvasSettings.dragging = true;
      return false;
    });

    $(idString).mousemove(function(event){
      event.preventDefault();
      if (dragging) {
        var xPixel = Math.floor(event.offsetX/25);
        var yPixel = Math.floor(event.offsetY/25);
        if (xPixel > 0 && xPixel <= artist.canvasSettings.height && yPixel > 0 && yPixel <= artist.canvasSettings.height ) {
          artist.data.updatePixel(xPixel,yPixel);    
        }
      }
    });

    $(idString).mouseup(function(event){
      event.preventDefault();
      artist.canvasSettings.dragging = false;
    });
  }();
  
  return artist;
})('gameCanvas');

function updateImageDataArrayDim(){
  artist.canvasSettings.width = {tall: 10, wide: 30, small: 10, medium: 20, large: 30}[artist.canvasSettings.size];
  artist.canvasSettings.height = {tall: 30, wide: 15, small: 10, medium: 20, large: 30}[artist.canvasSettings.size];
  for (var j = 1; j <= artist.canvasSettings.height; j++) {
    if (!artist.canvasSettings.currentImage[i])artist.canvasSettings.currentImage.push([]);
    for (var i = 1; i <= artist.canvasSettings.width; i++) {
      if (!artist.canvasSettings.currentImage[i][j]) artist.canvasSettings.currentImage[i][j] = '';
    }
  }
}

function updateBackground(){
  function drawPixel(i,j){
    artist.ctx.fillStyle= artist.canvasSettings.bgColor;
    artist.ctx.fillRect(i*25,j*25,24,24);
  };
  for (var j = 0; j < artist.canvasSettings.height; j++) {
    for (var i = 0; i < artist.canvasSettings.width; i++) {
      if (artist.canvasSettings.currentImage[i][j] === '') drawPixel(i+1,j+1);
    }
  }
}

function clearPixelMap(){
  artist.ctx.setTransform(1,0,0,1,0,0);
  artist.ctx.clearRect(0,0, artist.Canvas.width, artist.Canvas.height);
}


function updatePixel(i,j){
  if (artist.canvasSettings.pxColor !== artist.canvasSettings.currentImage[i-1][j-1]) {
    artist.canvasSettings.currentImage[i-1][j-1] = artist.canvasSettings.pxColor;
    artist.ctx.fillStyle= artist.canvasSettings.pxColor;
    artist.ctx.fillRect(i*25,j*25,24,24);
  }
}

initImageData();
blankPixelMap('medium');
