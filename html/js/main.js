/* ### Game Pin Wheel ###
#Tạo 1 pin wheel có thể xoay được

Cần gì?
+ 1 hình background kute
+ 1 pinwheel
+ 1 file âm thanh gió của pinwheel
--------------------------------------------------- */
// window
var winWidth = window.innerWidth,
    winHeight = window.innerHeight;

// Khởi tạo game
var game = new Phaser.Game(winWidth, winHeight, Phaser.CANVAS, '', { preload: preload, create: create, update: update });
var ninja, text,
    counter = 0,
    music,
    giatoc = 1;
var isPlaying = true;


// khai báo hàm preload
// cho load file atlas vào trong game - lần này là file xml
function preload() {

  game.load.image('hinhnenbien','pic/bg-game-screen.png');
  game.load.image('daybien','pic/seabed.png');
  game.load.image('ninja','pic/pinwheel.png');

  // thêm button chỉnh tốc độ
  game.load.image('fast','pic/fast.png');
  // thêm âm thanh
  game.load.audio('amthanhbien', 'bensound-littleidea.mp3');
}

// thêm các đối tượng vào trong game
function create() {

   game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

   var hinhnen = game.add.sprite(0, 0, 'hinhnenbien');
   hinhnen.width = winWidth;

   var btnFast = game.add.sprite(20, 0, 'fast');
   var btnMedium = game.add.sprite(20, 80 , 'fast');
   var btnSlow = game.add.sprite(20, 160 , 'fast');

   // thêm hình chong chóng hoặc ninja vào game
   ninja = game.add.sprite( game.world.centerX, game.world.centerY , 'ninja');
   ninja.anchor.setTo(0.5);
   ninja.scale.setTo(0.5);

   // thêm action touch
   ninja.inputEnabled = true;
   ninja.events.onInputDown.add(listener, this);

   // thêm action cho button click
   btnFast.inputEnabled = true;
   btnFast.events.onInputDown.add(setAcceleration, {param1: 16} );

   btnMedium.inputEnabled = true;
   btnMedium.events.onInputDown.add(setAcceleration, {param1: 8 } );

   btnSlow.inputEnabled = true;
   btnSlow.events.onInputDown.add(setAcceleration, {param1: 2 } );

   // thêm touch cho toàn game
   //game.input.onDown.add(listener, this);

   music = game.add.audio('amthanhbien');
   //music.onDecoded.add(startMusic, this);

   // show text on screen
   text = game.add.text(0,16,'', {fill: '#ffffff' });
}

function update(){
  if(isPlaying==true) {
    ninja.angle += giatoc;
    //setTimer();
  }
}

// don't use: #setTimer
function setTimer() {
    var timer = 5,
        timeout = 0;

    setInterval(function () {
        if(timeout<5) {
          timeout++;
          console.log(timeout);
        }
    }, 1000);

    if(timeout < 4) {
      ninja.angle += 1;
    } else {
      ninja.angle += 5;
    }
}

// hàm khởi tạo file âm thanh
function startMusic() {
  music.fadeIn(2000); // chờ 2 s (bật từ nhỏ tới lớn);
}

function listener() {
    if(isPlaying==false) {
      isPlaying = true;
    } else {
      isPlaying = false;
    }
}

function setAcceleration() {
  giatoc = this.param1;
}

// render - dùng để chạy khi debug
function render () {

}