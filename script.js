let enterButton, homeButton, settingsButton, rightArrow, leftArrow, upArrow, slideButton, contrastUp, contrastDown, volumeUp, volumeDown;
let stars, platforms, floor;
let player, lcPlayer, hcPlayer;
let playerArt, lowContrastPlayerArt, highContrastPlayerArt, starsArt, lowContrastStarsArt, highContrastStarsArt, bgMusic;
let screen = 0;
let storyPath = 1;
let points = 0;
let playerSpeed = 4;
let contrast = 1; //scale of 0 to 2
let volume = 0.75;
let lightColor = 'lemonChiffon';
let darkColor = 'midnightBlue';
let slide = true;
let settingsShowing = false;
let firstFrame = false;

function preload() {
  //credits: none needed (all by me :DDD)
  playerArt = loadImage("assets/elf.png");
  lowContrastPlayerArt = loadImage("assets/jokelf.png");
  highContrastPlayerArt = loadImage("assets/lightelf.png");
  starsArt = loadImage("assets/star.png");
  lowContrastStarsArt = loadImage("assets/jokestar.png");
  highContrastStarsArt = loadImage("assets/lightstar.png");
  bgMusic = loadSound("assets/starrynights.mp3");
}

function setup() {
  createCanvas(1000, 500);
  textAlign(CENTER);
  rectMode(CENTER);
  noStroke();
  enterButton = new Sprite(-100,-100);
  homeButton = new Sprite(-100,-100);
  settingsButton = new Sprite(-100,-100);
  slideButton = new Sprite(-100,-100);
  contrastUp = new Sprite(-100,-100);
  contrastDown = new Sprite(-100,-100);
  volumeUp = new Sprite(-100,-100);
  volumeDown = new Sprite(-100,-100);
  player = new Sprite(playerArt,-100,-100);
  lcPlayer = new Sprite(lowContrastPlayerArt,-100,-100);
  hcPlayer = new Sprite(highContrastPlayerArt,-100,-100);
  rightArrow = new Sprite(-100,-100);
  leftArrow = new Sprite(-100,-100);
  upArrow = new Sprite(-100,-100);
  floor = new Sprite(-100,-100);
  platforms = new Group();
  let counter = 0
  while (counter < 10) { ///////////CHANGE IF MORE PLATFORMS NEEDED!!!
    platforms[counter] = new platforms.Sprite(-500,-500);
    counter += 1;
  }
  platforms.collider = 'dynamic'
  platforms.rotation = 0;
  platforms.rotationLock = true;
  stars = new Group();
  counter = 0
  while (counter < 5) { ///////////CHANGE IF MORE star NEEDED!!!
    star = new Sprite(-100,-100,20);
    star.rotationLock = true;
    star.addImage(lowContrastStarsArt);
    stars.add(star);
    counter += 1;
  }
  counter = 0
  while (counter < 5) { ///////////CHANGE IF MORE star NEEDED!!!
    star = new Sprite(-100,-100,20);
    star.rotationLock = true;
    star.addImage(starsArt);
    stars.add(star);
    counter += 1;
  }
  counter = 0
  while (counter < 5) { ///////////CHANGE IF MORE star NEEDED!!!
    star = new Sprite(-100,-100,20);
    star.rotationLock = true;
    star.addImage(highContrastStarsArt);
    stars.add(star);
    counter += 1;
  } //is there a more efficient way to do these three loops? yes. but it's easier for ME to copy and paste them
  stars.collider = 'dynamic'
  floor.collider = 'dynamic';
  floor.rotationLock = true;
  player.collider = 'kinematic';
  hcPlayer.collider = 'kinematic';
  lcPlayer.collider = 'kinematic';
  bgMusic.setVolume(volume);
}

function draw() {
  if ((frameCount % 1800 == 0) | (frameCount == 1)) {
    bgMusic.play();
  }
  if (contrast == 1) {
    lightColor = 'lemonChiffon';
    darkColor = 'midnightBlue';
  } else if (contrast == 0) {
    lightColor = 'gold';
    darkColor = 'slateBlue';
  } else if (contrast == 2) {
    lightColor = 'white';
    darkColor = 'black';
  }
  if (settingsButton.mouse.presses()) {
    settingsShowing = true;
    firstFrame = true;
  }
  if (settingsShowing == true) {
    if (mouse.presses()) {
      if (slideButton.mouse.presses()) {
        slide = !slide;
      } else if (contrastUp.mouse.presses()) {
        if (contrast < 2) {
          contrast += 1;
        }
      } else if (contrastDown.mouse.presses()) {
        if (contrast > 0) {
          contrast -= 1;
        }
      } else if (volumeUp.mouse.presses()) {
        if (volume < 1) {
          volume += 0.25;
          bgMusic.setVolume(volume);
        }
      } else if (volumeDown.mouse.presses()) {
        if (volume > 0) {
          volume -= 0.25;
          bgMusic.setVolume(volume);
        }
      } else if(!firstFrame) {
        settingsShowing = false;
      }
    }
    settingsScreen();
  } else if(homeButton.mouse.presses()) {
    screen = 0;
    screen0();
  } else if (enterButton.mouse.presses()) {
    screen = 1;
    firstFrame = true;
    screen1()
  } else if (screen == 0) {
    screen0();
  } else if (screen == 1) {
    screen1();
  } else if (screen == 2) {
    screen2();
  } else if (screen == 3) {
    screen3();
  } else if (screen == 4) {
    screen4();
  } else if (screen == 5) {
    screen5();
  } else if (screen == 6) {
    screen6();
  }
}

function screen0() {
  points = 0;
  hideAll();
  background(darkColor);
  fill(lightColor);
  textSize(50);
  text('~STARELF~',500,50);
  textSize(25);
  text("Star elves possess an illegal magic to harness the stars. It depends who you ask if\nit's because the magic is so dangerous or the star elves are so incompetent might\nhurt themselves with it, but star elves are officially outlawed. You have recently\nbeen found out to be a star elf, and are now on the run.",500,80);
  enterButton.pos = {x:500,y:425};
  enterButton.rotation = 0;
  enterButton.width = 200;
  enterButton.height = 100;
  enterButton.color = lightColor;
  enterButton.textColor = darkColor;
  enterButton.textSize = 50;
  enterButton.text = 'START';

  if (contrast == 1) {
    player.visible = true;
    lcPlayer.visible = false;
    hcPlayer.visible = false;
  } else if (contrast == 0) {
    player.visible = false;
    lcPlayer.visible = true;
    hcPlayer.visible = false;
  } else if (contrast == 2) {
    player.visible = false;
    lcPlayer.visible = false;
    hcPlayer.visible = true;
  }
  player.pos = {x:40,y:425};
  lcPlayer.pos = {x:40,y:425};
  hcPlayer.pos = {x:40,y:425};


  settingsButton.pos = {x:50,y:40};
  settingsButton.width = 50;
  settingsButton.height = 25;
  settingsButton.color = lightColor;
  settingsButton.textColor = darkColor;
  settingsButton.text = 'settings';
  settingsButton.textSize = 14;
}

function screen1() {
  hideAll();
  background(darkColor);
  if (firstFrame == true) {
    stars.visible = true;
    player.pos = {x:40,y:425};
    hcPlayer.pos = {x:40,y:425};
    lcPlayer.pos = {x:40,y:425};
    firstFrame = false;
  }
  
  floor.height = 20;
  floor.width = 1000;
  floor.pos = {x:500,y:490};
  floor.color = lightColor;

  if (contrast == 1) {
    player.visible = true;
    lcPlayer.visible = false;
    hcPlayer.visible = false;
  } else if (contrast == 0) {
    player.visible = false;
    lcPlayer.visible = true;
    hcPlayer.visible = false;
  } else if (contrast == 2) {
    player.visible = false;
    lcPlayer.visible = false;
    hcPlayer.visible = true;
  }
  player.rotation = 0;
  hcPlayer.rotation = 0;
  lcPlayer.rotation = 0;
  
  settingsButton.pos = {x:50,y:40};
  settingsButton.width = 50;
  settingsButton.height = 25;
  settingsButton.color = lightColor;
  settingsButton.textColor = darkColor;
  settingsButton.text = 'settings';
  settingsButton.textSize = 14;
  settingsButton.rotation = 0;

  rightArrow.pos = {x:125,y:425};
  rightArrow.width = 50;
  rightArrow.height = 50;
  rightArrow.color = lightColor;
  rightArrow.textColor = darkColor;
  rightArrow.textSize = 50;
  rightArrow.text = '>';
  rightArrow.rotation = 0;
  leftArrow.pos = {x:50,y:425};
  leftArrow.width = 50;
  leftArrow.height = 50;
  leftArrow.color = lightColor;
  leftArrow.textColor = darkColor;
  leftArrow.textSize = 50;
  leftArrow.text = '<';
  leftArrow.rotation = 0;
  upArrow.pos = {x:87,y:350};
  upArrow.width = 50;
  upArrow.height = 50;
  upArrow.color = lightColor;
  upArrow.textColor = darkColor;
  upArrow.textSize = 50;
  upArrow.text = '^';
  upArrow.rotation = 0;

  platforms.color = lightColor;
  platforms.height = 20;
  platforms[0].pos = {x:400,y:400};
  platforms[0].width = 100;
  platforms[1].pos = {x:600,y:300};
  platforms[1].width = 100;
  platforms[2].pos = {x:725,y:150};
  platforms[2].width = 150;
  platforms[3].pos = {x:750,y:400};
  platforms[3].width = 100;

  if (contrast == 0) {
    stars[0].pos = {x:735,y:100};
  } else if (contrast == 1) {
    stars[5].pos = {x:735,y:100};
  } else {
    stars[10].pos = {x:735,y:100};
  }
  
  move()
}

function screen2() {
  hideAll();
  background(darkColor);
  if (firstFrame == true) {
    stars.visible = true;
    player.pos = {x:40,y:425};
    hcPlayer.pos = {x:40,y:425};
    lcPlayer.pos = {x:40,y:425};
    firstFrame = false;
  }

  floor.height = 20;
  floor.width = 1000;
  floor.pos = {x:-250,y:490};
  floor.color = lightColor;

  if (contrast == 1) {
    player.visible = true;
    lcPlayer.visible = false;
    hcPlayer.visible = false;
  } else if (contrast == 0) {
    player.visible = false;
    lcPlayer.visible = true;
    hcPlayer.visible = false;
  } else if (contrast == 2) {
    player.visible = false;
    lcPlayer.visible = false;
    hcPlayer.visible = true;
  }
  player.rotation = 0;
  lcPlayer.rotation = 0;
  hcPlayer.rotation = 0;

  settingsButton.pos = {x:50,y:40};
  settingsButton.width = 50;
  settingsButton.height = 25;
  settingsButton.color = lightColor;
  settingsButton.textColor = darkColor;
  settingsButton.text = 'settings';
  settingsButton.textSize = 14;
  settingsButton.rotation = 0;

  rightArrow.pos = {x:125,y:425};
  rightArrow.width = 50;
  rightArrow.height = 50;
  rightArrow.color = lightColor;
  rightArrow.textColor = darkColor;
  rightArrow.textSize = 50;
  rightArrow.text = '>';
  rightArrow.rotation = 0;
  leftArrow.pos = {x:50,y:425};
  leftArrow.width = 50;
  leftArrow.height = 50;
  leftArrow.color = lightColor;
  leftArrow.textColor = darkColor;
  leftArrow.textSize = 50;
  leftArrow.text = '<';
  leftArrow.rotation = 0;
  upArrow.pos = {x:87,y:350};
  upArrow.width = 50;
  upArrow.height = 50;
  upArrow.color = lightColor;
  upArrow.textColor = darkColor;
  upArrow.textSize = 50;
  upArrow.text = '^';
  upArrow.rotation = 0;

  platforms.color = lightColor;
  platforms.height = 20;
  platforms[0].pos = {x:300,y:400};
  platforms[0].width = 100;
  platforms[1].pos = {x:150,y:300};
  platforms[1].width = 100;
  platforms[2].pos = {x:300,y:175};
  platforms[2].width = 100;
  platforms[3].pos = {x:450,y:225};
  platforms[3].width = 100;
  platforms[4].pos = {x:700,y:300};
  platforms[4].width = 100;
  platforms[5].pos = {x:900,y:400};
  platforms[5].width = 100;
  platforms[6].pos = {x:700,y:150};
  platforms[6].width = 100;
  platforms[7].pos = {x:640,y:0};
  platforms[7].width = 20;
  platforms[7].height = 50;
  platforms[8].pos = {x:760,y:0};
  platforms[8].width = 20;
  platforms[8].height = 50;

  if (contrast == 0) {
    stars[0].pos = {x:400,y:350};
    stars[1].pos = {x:700,y:250};
  } else if (contrast == 1) {
    stars[5].pos = {x:400,y:350};
    stars[6].pos = {x:700,y:250};
  } else {
    stars[10].pos = {x:400,y:350};
    stars[11].pos = {x:700,y:250};
  }

  move()
}

function screen3() {
  hideAll();
  background(darkColor);
  if (firstFrame == true) {
    stars.visible = true;
    player.pos = {x:40,y:425};
    lcPlayer.pos = {x:40,y:425};
    hcPlayer.pos = {x:40,y:425};
    firstFrame = false;
  }

  floor.height = 20;
  floor.width = 1000;
  floor.pos = {x:500,y:490};
  floor.color = lightColor;

  if (contrast == 1) {
    player.visible = true;
    lcPlayer.visible = false;
    hcPlayer.visible = false;
  } else if (contrast == 0) {
    player.visible = false;
    lcPlayer.visible = true;
    hcPlayer.visible = false;
  } else if (contrast == 2) {
    player.visible = false;
    lcPlayer.visible = false;
    hcPlayer.visible = true;
  }
  player.rotation = 0;
  lcPlayer.rotation = 0;
  hcPlayer.rotation = 0;

  settingsButton.pos = {x:50,y:40};
  settingsButton.width = 50;
  settingsButton.height = 25;
  settingsButton.color = lightColor;
  settingsButton.textColor = darkColor;
  settingsButton.text = 'settings';
  settingsButton.textSize = 14;
  settingsButton.rotation = 0;

  rightArrow.pos = {x:125,y:425};
  rightArrow.width = 50;
  rightArrow.height = 50;
  rightArrow.color = lightColor;
  rightArrow.textColor = darkColor;
  rightArrow.textSize = 50;
  rightArrow.text = '>';
  rightArrow.rotation = 0;
  leftArrow.pos = {x:50,y:425};
  leftArrow.width = 50;
  leftArrow.height = 50;
  leftArrow.color = lightColor;
  leftArrow.textColor = darkColor;
  leftArrow.textSize = 50;
  leftArrow.text = '<';
  leftArrow.rotation = 0;
  upArrow.pos = {x:87,y:350};
  upArrow.width = 50;
  upArrow.height = 50;
  upArrow.color = lightColor;
  upArrow.textColor = darkColor;
  upArrow.textSize = 50;
  upArrow.text = '^';
  upArrow.rotation = 0;

  platforms.color = lightColor;
  platforms.height = 20;
  platforms[0].pos = {x:850,y:250};
  platforms[0].width = 300;
  platforms[1].pos = {x:600,y:375};
  platforms[1].width = 100;

  fill(lightColor);
  textSize(25);
  text("Try to join another, far\naway, society and\ncontinue hiding your status\nas a star elf.",850,125);
  text("Keep running.",850,375);

  move()
}

function screen4() {
  hideAll();
  background(darkColor);
  fill(lightColor);
  textSize(50);
  text("On the Run",500,150);
  textSize(25);
  text("You realize you can't live like this, even if you can't live all that well\nbeing yourself either. Not letting yourself be you is no way to live.",500,200);

  if (firstFrame == true) {
    player.pos = {x:40,y:425};
    lcPlayer.pos = {x:40,y:425};
    hcPlayer.pos = {x:40,y:425};
    firstFrame = false;
  }

  floor.height = 20;
  floor.width = 1000;
  floor.pos = {x:500,y:490};
  floor.color = lightColor;

  if (contrast == 1) {
    player.visible = true;
    lcPlayer.visible = false;
    hcPlayer.visible = false;
  } else if (contrast == 0) {
    player.visible = false;
    lcPlayer.visible = true;
    hcPlayer.visible = false;
  } else if (contrast == 2) {
    player.visible = false;
    lcPlayer.visible = false;
    hcPlayer.visible = true;
  }
  player.rotation = 0;
  lcPlayer.rotation = 0;
  hcPlayer.rotation = 0;

  settingsButton.pos = {x:50,y:40};
  settingsButton.width = 50;
  settingsButton.height = 25;
  settingsButton.color = lightColor;
  settingsButton.textColor = darkColor;
  settingsButton.text = 'settings';
  settingsButton.textSize = 14;
  settingsButton.rotation = 0;

  rightArrow.pos = {x:125,y:425};
  rightArrow.width = 50;
  rightArrow.height = 50;
  rightArrow.color = lightColor;
  rightArrow.textColor = darkColor;
  rightArrow.textSize = 50;
  rightArrow.text = '>';
  rightArrow.rotation = 0;
  leftArrow.pos = {x:50,y:425};
  leftArrow.width = 50;
  leftArrow.height = 50;
  leftArrow.color = lightColor;
  leftArrow.textColor = darkColor;
  leftArrow.textSize = 50;
  leftArrow.text = '<';
  leftArrow.rotation = 0;
  upArrow.pos = {x:87,y:350};
  upArrow.width = 50;
  upArrow.height = 50;
  upArrow.color = lightColor;
  upArrow.textColor = darkColor;
  upArrow.textSize = 50;
  upArrow.text = '^';
  upArrow.rotation = 0;

  move()
}

function screen5() {
  hideAll();
  background(darkColor);
  fill(lightColor);
  textSize(50);
  text("Happy Community",500,150);
  textSize(25);
  text("You find an encampment of runaway star elves, like you. You have finally found a home\nwhere you comfortable and surrounded by friends and protectors. You are filled\nwith happiness and are very glad you decided to make this decision.",500,200);
  text("points: "+points,200,50);

  if (firstFrame == true) {
    player.pos = {x:40,y:425};
    lcPlayer.pos = {x:40,y:425};
    hcPlayer.pos = {x:40,y:425};
    firstFrame = false;
    stars.visible = true;
  }

  floor.height = 20;
  floor.width = 1000;
  floor.pos = {x:500,y:490};
  floor.color = lightColor;

  if (contrast == 1) {
    player.visible = true;
    lcPlayer.visible = false;
    hcPlayer.visible = false;
  } else if (contrast == 0) {
    player.visible = false;
    lcPlayer.visible = true;
    hcPlayer.visible = false;
  } else if (contrast == 2) {
    player.visible = false;
    lcPlayer.visible = false;
    hcPlayer.visible = true;
  }
  player.rotation = 0;
  lcPlayer.rotation = 0;
  hcPlayer.rotation = 0;

  settingsButton.pos = {x:50,y:40};
  settingsButton.width = 50;
  settingsButton.height = 25;
  settingsButton.color = lightColor;
  settingsButton.textColor = darkColor;
  settingsButton.text = 'settings';
  settingsButton.textSize = 14;
  settingsButton.rotation = 0;

  rightArrow.pos = {x:125,y:425};
  rightArrow.width = 50;
  rightArrow.height = 50;
  rightArrow.color = lightColor;
  rightArrow.textColor = darkColor;
  rightArrow.textSize = 50;
  rightArrow.text = '>';
  rightArrow.rotation = 0;
  leftArrow.pos = {x:50,y:425};
  leftArrow.width = 50;
  leftArrow.height = 50;
  leftArrow.color = lightColor;
  leftArrow.textColor = darkColor;
  leftArrow.textSize = 50;
  leftArrow.text = '<';
  leftArrow.rotation = 0;
  upArrow.pos = {x:87,y:350};
  upArrow.width = 50;
  upArrow.height = 50;
  upArrow.color = lightColor;
  upArrow.textColor = darkColor;
  upArrow.textSize = 50;
  upArrow.text = '^';
  upArrow.rotation = 0;

  if (contrast == 0) {
    stars[1].pos = {x:800,y:150};
    stars[2].pos = {x:350,y:400};
    stars[3].pos = {x:625,y:375};
  } else if (contrast == 1) {
    stars[6].pos = {x:800,y:150};
    stars[7].pos = {x:350,y:400};
    stars[8].pos = {x:625,y:375};
  } else {
    stars[11].pos = {x:700,y:250};
    stars[12].pos = {x:400,y:350};
    stars[13].pos = {x:700,y:250};
  }

  move()
}

function screen6() {
  hideAll();
  background(darkColor);
  fill(lightColor);
  textSize(50);
  text("Happy Community",500,100);
  text("(Secret 3rd Ending)",500,150);
  textSize(25);
  text("You find an encampment of runaway star elves, like you. You have finally found a home\nwhere you comfortable and surrounded by friends and protectors. You are filled\nwith happiness and are very glad you decided to make this decision. You start going\naround and campaigning for star elf rights in neighboring places and end up\ndeclaring sovereignty for your land. The future looks bright.",500,200);
  text("points: "+points,200,50);

  if (firstFrame == true) {
    player.pos = {x:40,y:425};
    hcPlayer.pos = {x:40,y:425};
    lcPlayer.pos = {x:40,y:425};
    firstFrame = false;
  }

  floor.height = 20;
  floor.width = 1000;
  floor.pos = {x:500,y:490};
  floor.color = lightColor;

  if (contrast == 1) {
    player.visible = true;
    lcPlayer.visible = false;
    hcPlayer.visible = false;
  } else if (contrast == 0) {
    player.visible = false;
    lcPlayer.visible = true;
    hcPlayer.visible = false;
  } else if (contrast == 2) {
    player.visible = false;
    lcPlayer.visible = false;
    hcPlayer.visible = true;
  }
  player.rotation = 0;
  lcPlayer.rotation = 0;
  hcPlayer.rotation = 0;

  settingsButton.pos = {x:50,y:40};
  settingsButton.width = 50;
  settingsButton.height = 25;
  settingsButton.color = lightColor;
  settingsButton.textColor = darkColor;
  settingsButton.text = 'settings';
  settingsButton.textSize = 14;
  settingsButton.rotation = 0;

  rightArrow.pos = {x:125,y:425};
  rightArrow.width = 50;
  rightArrow.height = 50;
  rightArrow.color = lightColor;
  rightArrow.textColor = darkColor;
  rightArrow.textSize = 50;
  rightArrow.text = '>';
  rightArrow.rotation = 0;
  leftArrow.pos = {x:50,y:425};
  leftArrow.width = 50;
  leftArrow.height = 50;
  leftArrow.color = lightColor;
  leftArrow.textColor = darkColor;
  leftArrow.textSize = 50;
  leftArrow.text = '<';
  leftArrow.rotation = 0;
  upArrow.pos = {x:87,y:350};
  upArrow.width = 50;
  upArrow.height = 50;
  upArrow.color = lightColor;
  upArrow.textColor = darkColor;
  upArrow.textSize = 50;
  upArrow.text = '^';
  upArrow.rotation = 0;

  stars.visible = true;
  if (contrast == 0) {
    stars[0].pos = {x:200,y:150};
    stars[1].pos = {x:800,y:150};
    stars[2].pos = {x:350,y:400};
    stars[3].pos = {x:625,y:375};
    stars[4].pos = {x:775,y:425};
  } else if (contrast == 1) {
    stars[5].pos = {x:200,y:150};
    stars[6].pos = {x:800,y:150};
    stars[7].pos = {x:350,y:400};
    stars[8].pos = {x:625,y:375};
    stars[9].pos = {x:775,y:425};
  } else {
    stars[10].pos = {x:400,y:350};
    stars[11].pos = {x:700,y:250};
    stars[12].pos = {x:400,y:350};
    stars[13].pos = {x:700,y:250};
    stars[14].pos = {x:400,y:350};
  }

  move()
}

function settingsScreen() {
  if (firstFrame) {
    firstFrame = false;
  }
  hideAll();
  player.visible = false;
  lcPlayer.visible = false;
  hcPlayer.visible = false;
  background(lightColor);
  
  settingsButton.pos = {x:50,y:40};
  settingsButton.width = 50;
  settingsButton.height = 25;
  settingsButton.color = lightColor;
  settingsButton.textColor = darkColor;
  settingsButton.text = 'settings';
  settingsButton.textSize = 14;
  settingsButton.rotation = 0;

  slideButton.pos = {x:500,y:150};
  slideButton.width = 150;
  slideButton.height = 50;
  slideButton.color = darkColor;
  slideButton.textColor = lightColor;
  if (slide) {
    slideButton.text = 'Slide: on';
  } else {
    slideButton.text = 'Slide: off';
  }
  slideButton.textSize = 25;
  slideButton.rotation = 0;

  fill(darkColor);
  textSize(25);
  text('Contrast:',500,275);
  stroke(darkColor);
  strokeWeight(5);
  rect(450,300,25,25);
  if (!contrast > 0) {
    fill(lightColor);
  }
  rect(500,300,25,25);
  if (contrast != 2) {
    fill(lightColor);
  }
  rect(550,300,25,25);
  noStroke();
  contrastUp.pos = {x:600,y:300};
  contrastUp.width = 50;
  contrastUp.height = 50;
  contrastUp.color = lightColor;
  contrastUp.textColor = darkColor;
  contrastUp.text = '+';
  contrastUp.textSize = 50;
  contrastUp.rotation = 0;
  contrastDown.pos = {x:400,y:300};
  contrastDown.width = 50;
  contrastDown.height = 50;
  contrastDown.color = lightColor;
  contrastDown.textColor = darkColor;
  contrastDown.text = '-';
  contrastDown.textSize = 50;
  contrastDown.rotation = 0;

  fill(darkColor);
  textSize(25);
  text('Volume:',500,425);
  stroke(darkColor);
  strokeWeight(5);
  if (volume == 0) {
    fill(lightColor);
  }
  rect(425,450,25,25);
  if (volume == 0.25) {
    fill(lightColor);
  }
  rect(475,450,25,25);
  if (volume == 0.5) {
    fill(lightColor);
  }
  rect(525,450,25,25);
  if (volume != 1) {
    fill(lightColor);
  }
  rect(575,450,25,25);
  noStroke();
  volumeUp.pos = {x:625,y:450};
  volumeUp.width = 50;
  volumeUp.height = 50;
  volumeUp.color = lightColor;
  volumeUp.textColor = darkColor;
  volumeUp.text = '+';
  volumeUp.textSize = 50;
  volumeUp.rotation = 0;
  volumeDown.pos = {x:375,y:450};
  volumeDown.width = 50;
  volumeDown.height = 50;
  volumeDown.color = lightColor;
  volumeDown.textColor = darkColor;
  volumeDown.text = '-';
  volumeDown.textSize = 50;
  volumeDown.rotation = 0;
  
  //add volume adjustment
}

function move() { //the 4 diff inputs seemed like a lot to have to read/write each screen each direction...
  if ((((kb.pressing('d')) | (kb.pressing('l'))) | (kb.pressing('right'))) | (rightArrow.mouse.pressing())) {
    player.vel.x = playerSpeed;
    lcPlayer.vel.x = playerSpeed;
    hcPlayer.vel.x = playerSpeed;
  } else if ((((kb.pressing('a')) | (kb.pressing('j'))) | (kb.pressing('left'))) | (leftArrow.mouse.pressing())) {
    player.vel.x = 0 - playerSpeed;
    lcPlayer.vel.x = 0 - playerSpeed;
    hcPlayer.vel.x = 0 - playerSpeed;
  } else if (player.vel.x > 0) {
    if (slide) {
      player.vel.x -= 0.25;
      hcPlayer.vel.x -= 0.25;
      lcPlayer.vel.x -= 0.25;
    } else {
      player.vel.x = 0;
      hcPlayer.vel.x = 0;
      lcPlayer.vel.x = 0;
    }
  } else if (player.vel.x < 0) {
    if (slide) {
      player.vel.x += 0.25;
      lcPlayer.vel.x += 0.25;
      hcPlayer.vel.x += 0.25;
    } else {
      player.vel.x = 0;
      lcPlayer.vel.x = 0;
      hcPlayer.vel.x = 0;
    }
  }
  if (((((kb.presses('w')) | (kb.presses('i'))) | (kb.presses('up'))) | (upArrow.mouse.presses())) | (kb.presses('space'))) {
    player.vel.y = 0 - (playerSpeed * 2.25);
    lcPlayer.vel.y = 0 - (playerSpeed * 2.25);
    hcPlayer.vel.y = 0 - (playerSpeed * 2.25);
  } else if (player.vel.y != 0) {
    player.vel.y += 0.25;
    lcPlayer.vel.y += 0.25;
    hcPlayer.vel.y += 0.25;
  } else if ((player.vel.y == 0) & ((!player.colliding(floor)) & (!player.colliding(platforms)))) {
    player.vel.y += 0.25;
    lcPlayer.vel.y += 0.25;
    hcPlayer.vel.y += 0.25;
  } else if (player.colliding(floor)) {
    player.vel.y = 0;
    hcPlayer.vel.y = 0;
    lcPlayer.vel.y = 0;
  }
  if (player.collides(floor)) {
    player.vel.y = 0;
    hcPlayer.vel.y = 0;
    lcPlayer.vel.y = 0;
  } else if (player.collides(platforms)) {
    player.vel.y = 0;
    hcPlayer.vel.y = 0;
    lcPlayer.vel.y = 0;
  }
  if (player.collides(stars)) {
    if ((((player.collides(stars[0])) & (stars[0].visible == true)) | ((player.collides(stars[5])) & (stars[5].visible == true))) | ((player.collides(stars[10])) & (stars[10].visible == true))) {
      points += 1;
      stars[0].visible = false;
      stars[5].visible = false;
      stars[10].visible = false;
    } else if ((((player.collides(stars[1])) & (stars[1].visible == true)) | ((player.collides(stars[6])) & (stars[6].visible == true))) | ((player.collides(stars[11])) & (stars[11].visible == true)))  {
        points += 1;
        stars[1].visible = false;
        stars[6].visible = false;
        stars[11].visible = false;
      } else if ((((player.collides(stars[2])) & (stars[2].visible == true)) | ((player.collides(stars[7])) & (stars[7].visible == true))) | ((player.collides(stars[12])) & (stars[12].visible == true)))  {
        points += 1;
        stars[2].visible = false;
        stars[7].visible = false;
        stars[12].visible = false;
      } else if ((((player.collides(stars[3])) & (stars[3].visible == true)) | ((player.collides(stars[8])) & (stars[8].visible == true))) | ((player.collides(stars[13])) & (stars[13].visible == true))) {
        points += 1;
        stars[3].visible = false;
        stars[8].visible = false;
        stars[13].visible = false;
      } else if ((((player.collides(stars[4])) & (stars[4].visible == true)) | ((player.collides(stars[9])) & (stars[9].visible == true))) | ((player.collides(stars[14])) & (stars[14].visible == true))) {
        points += 1;
        stars[4].visible = false;
        stars[9].visible = false;
        stars[14].visible = false;
      }
  }
  if ((player.x >= 1005) & (!firstFrame)) {
    if ((screen == 3) & (player.y > 250)) {
      screen += 1;
    } else if (((screen == 4) | (screen == 5)) | (screen == 6)) {
      screen = -1;
    }
    screen += 1;
    firstFrame = true;
  } else if (player.y > 500) {
    screen = 0;
  } else if ((((player.x >= 650) & (player.x <= 750)) & (player.y <= 0)) & (screen == 2)) {
    screen = 6;
    firstFrame = true;
  }
}

function hideAll() {
  clear();
  enterButton.pos = {x:-100,y:-100};
  homeButton.pos = {x:-100,y:-100};
  slideButton.pos = {x:-100,y:-100};
  contrastUp.pos = {x:-100,y:-100};
  contrastDown.pos = {x:-100,y:-100};
  volumeUp.pos = {x:-100,y:-100};
  volumeDown.pos = {x:-100,y:-100};
  stars.x = -100;
  stars.y = -100;
  platforms.x = -100;
  platforms.y = -100;
  rightArrow.pos = {x:-100,y:-100};
  leftArrow.pos = {x:-100,y:-100};
  upArrow.pos = {x:-100,y:-100};
  floor.pos = {x:-100,y:-100};
}