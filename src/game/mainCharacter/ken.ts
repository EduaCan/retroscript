
class Ken {
  imgWalk: HTMLImageElement
  walk: {
    x: number
    y: number
    w: number
    h: number
  }
  imgJump: HTMLImageElement
  jump: {
    x: number[]
    y: number
    w: number[]
    h: number
  }
  imgHadouken: HTMLImageElement
  hadouken: {
    x: number[]
    y: number
    w: number[]
    h: number
  }
  img: HTMLImageElement
  action: {
    x: number
    y: number
    w: number
    h: number
  }
  spriteJump: number
  spriteHadouken: number
  positionX: number
  bgPositionX: number
  bgPositionY: number
  positionY: number
  speedY: number
  jumpPower: number
  mapRelationfactor: number
  walkSpeed = 1
  groundFeetDistance: number
  groundMargin: number
  health: number
  hadoukenAnimation: boolean
  hadoukenCreated: boolean

  constructor() {
    //walking animation
    this.imgWalk = new Image(),
      this.imgWalk.src = "../../../images/player/kenWalking.png",
      this.walk = {
        x: 0,
        y: 0,
        w: 49, // ancho
        h: 95, // alto //!87
      }
    //jumping animation
    this.imgJump = new Image()
    this.imgJump.src = "../../../images/player/kenJump.png"
    this.jump = {
      x: [0, 46, 88, 154, 194, 274, 324],
      y: 0,
      w: [46, 42, 64, 40, 80, 50, 40],
      h: 95
    }
    //hadouken animation
    this.imgHadouken = new Image()
    this.imgHadouken.src = "../../../images/player/hadoukenSprite.png"
    this.hadouken = {
      x: [0, 55, 125, 196],
      y: 0,
      w: [55, 70, 71, 76],
      h: 95 //!85
    }
    this.img //= this.imgWalk
    this.action = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    }//= this.walk
    //sprite frame counter
    this.spriteJump = 0
    this.spriteHadouken = 0
    //position x
    this.positionX = 0
    this.bgPositionX = 25//this.walk.w[0] / 2
    //speed
    this.positionY = 150
    this.groundFeetDistance = 18
    this.bgPositionY = this.positionY + this.action.h - this.groundFeetDistance //player feet position

    //jumpSpeed
    this.speedY = 0
    this.jumpPower = -4 //-4

    //walk speed
    this.walkSpeed = 4 //1

    this.groundMargin = 10

    //this.mapRelationfactor = 1.65

    this.health = 3
    this.hadoukenAnimation = false
    this.hadoukenCreated = true
  }

  drawKen = () => {
    ctx.drawImage(this.img, this.action.x, this.action.y, this.action.w, this.action.h, this.positionX, this.positionY, this.action.w, this.action.h)
  }

  drawKenHitBox = () => {
    ctx.beginPath();
    ctx.ellipse(this.positionX + this.action.w/2, this.positionY + this.action.h/2, this.action.w/4, this.action.h/2, 0, 0, Math.PI *2)
    ctx.stroke();
  }

  gravity = (gravity: number, ground: number) => { //
    this.positionY = this.positionY + Math.floor(this.speedY)
    this.bgPositionY = this.positionY + this.action.h - this.groundFeetDistance
    if (Math.floor(this.bgPositionY) < ground - this.groundMargin) {
      this.speedY += gravity
      this.groundMargin = this.speedY + 2

    }
    if ((Math.floor(this.bgPositionY) > ground - this.groundMargin || Math.floor(this.bgPositionY) > ground) && this.speedY > 0) {
      this.speedY = 0
      this.positionY = ground - this.action.h + this.groundFeetDistance
    }
  }

  animateKen = (frames: number, right: boolean, left: boolean, ground: number) => {
    if (this.hadoukenAnimation) {
      this.animateKenHadouken(frames)
    } else {
      if ((Math.floor(this.bgPositionY) > ground - this.groundMargin) && this.speedY === 0) {
        this.animateKenWalking(frames, right, left)
      } else {
        this.animateKenJumping(frames)
      }
    }
  }

  animateKenWalking = (frames: number, right: boolean, left: boolean) => {
    this.img = this.imgWalk
    this.action.y = this.walk.y
    this.action.h = this.walk.h
    this.action.w = this.walk.w
    if (this.action.x % 49 !== 0) {
      this.action.x = 0
    }
    if (frames % 29 === 0 && (right || left)) {
      this.action.x = this.action.x + this.walk.w
      if (this.action.x > 196) {
        this.action.x = 0
      }
    }
  }

  animateKenHadouken = (frames: number) => {
    this.img = this.imgHadouken
    this.action.y = this.hadouken.y
    this.action.h = this.hadouken.h
    if (frames % 10 === 0 && this.hadoukenAnimation) {
      if (this.spriteHadouken > 3) {
        this.action.x = 0
        this.hadoukenAnimation = false
        this.hadoukenCreated = false
        this.action.w = this.hadouken.w[this.spriteHadouken]
        this.spriteHadouken = 0
      }
      this.action.w = this.hadouken.w[this.spriteHadouken]
      this.action.x = this.hadouken.x[this.spriteHadouken]
      this.spriteHadouken++
    }
  }

  animateKenJumping = (frames: number) => {
    this.img = this.imgJump
    this.action.y = this.jump.y
    this.action.h = this.jump.h
    if (frames % 14 === 0) {
      this.action.x = this.jump.x[this.spriteJump]
      this.action.w = this.jump.w[this.spriteJump]
      this.spriteJump++
    } if (this.spriteJump > 5) {
      this.spriteJump = 0
    }
  }


  movingKen = (right: boolean, left: boolean, isJumping: boolean, ground: number, bossStage:boolean) => {
    if (isJumping && Math.floor(this.bgPositionY) > ground - this.groundMargin) {
      this.kenJumping()
    }
    if ((right || left)) {
      this.kenWalking(right, left, bossStage)
    }
  }

  kenJumping = () => {
    this.speedY = this.jumpPower
  }


  kenWalking = (right: boolean, left: boolean, bossStage: boolean) => {
    if (bossStage) { //needs refactorization
      if (right && (this.positionX < canvas.width-this.action.w)) {
        this.positionX = this.positionX + this.walkSpeed;
        this.bgPositionX = this.bgPositionX + this.walkSpeed
      } else if (left && (this.positionX > 0)) {
        this.positionX = this.positionX - this.walkSpeed;
        this.bgPositionX = this.bgPositionX - this.walkSpeed
      }
    } else {
      if (right && (this.positionX < (canvas.width / 2))) {
        this.positionX = this.positionX + this.walkSpeed;
        this.bgPositionX = this.bgPositionX + this.walkSpeed
      } else if (left && (this.positionX > 0)) {
        this.positionX = this.positionX - this.walkSpeed;
        this.bgPositionX = this.bgPositionX - this.walkSpeed
      }
    }
  }
}