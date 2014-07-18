game.rawElements = {
  spriteSheet: function(sourceFile){
    var local = {};
    local.sourceFile = sourceFile;
    local.drawFrame = function drawFrame(inputRect, outputRect) {
    
    };
    local.animateFrames = function animateFrames(inputRect, outputRect) {
    
    };
    local.loopAnimation = function animateFrames(inputRect, outputRect) {
    
    };
    local.makeTiles = function makeTiles(inputRect, outputRect) {
    
    };
    return local;
  },
  audioSound: function(sourceClip){
    var local = {};
    local.sourceClip = sourceClip;
    local.emitNoise = function emitNoise(){
    
    };
    local.loopNoise = function emitNoise(){
    
    };
    local.stopNoise = function emitNoise(){
    
    };
    return local;
  },
  playerListener: function(player){
    var local = {};
    local.availableActions = {};
    local.addActionAbility = function addActionAbility(){
    
    };
    local.removeActionAbility = function removeActionAbility(){
    
    };
    local.performActionAbility = function performActionAbility(){
    
    };
    return local;
  },
};
game.models = {
  background: function background(source) {
  
  },
  foreground: function foreground(spriteSheet, coordinates, parallaxingSpeed) {
  
  },
  terrain: function terrain(textureNumber) {
  
  },
  npc: function npc(spriteSheet, coordinates, behaviors) {
  
  },
  player: function terrain(spriteSheet, coordinates, behaviors) {
  
  },  
};
