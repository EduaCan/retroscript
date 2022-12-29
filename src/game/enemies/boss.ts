class Boss {
    img: HTMLImageElement
    imgBoss: HTMLImageElement
    boss: {
        x: number[]
        y: number
        w: number //[]
        h: number
    }
    action: {
    x: number
    y: number
    w: number
    h: number
  }
  positionX: number
  positionY:number
  bossWide: number
  bossHeight: number
  spriteBoss: number

  speedY: number
  bgPositionX: number
  bgPositionY: number
  groundMargin: number
  groundFeetDistance : number
  bossBulletCreated: boolean

    constructor() {
        this.imgBoss = new Image(),
      this.imgBoss.src = "../../../images/enemies/boss/duoBoss.png",
      this.boss = {
        x: [3, 106,205,295,383,474,565,650,741,826,911],
        y: 0,
        w:  74 , //[68, 72,74,69,68,65,65,65,66,66,61], 
        h: 80, 
      }

      this.action = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    }
    this.positionX = 650
    this.positionY = 0
    this.bossWide = 150
    this.bossHeight = 225
    this.spriteBoss = 0

    this.speedY = 0
    this.groundMargin = 10
    this.groundFeetDistance = 10

    this.bgPositionX = 3000
    this.bossBulletCreated = true
    }

    drawBoss = () => {
    ctx.drawImage(this.img, this.action.x, this.action.y, this.action.w, this.action.h, this.positionX, this.positionY, this.bossWide, this.bossHeight)
  }

   gravity = (gravity: number, ground: number) => { //
    this.positionY = this.positionY + Math.floor(this.speedY)
    this.bgPositionY = this.positionY + this.bossHeight - this.groundFeetDistance
    if (Math.floor(this.bgPositionY) < ground - this.groundMargin) {
      this.speedY += gravity
      this.groundMargin = this.speedY + 2

    }
    if ((Math.floor(this.bgPositionY) > ground - this.groundMargin || Math.floor(this.bgPositionY) > ground) && this.speedY > 0) {
      this.speedY = 0
      this.positionY = ground - this.bossHeight + this.groundFeetDistance
    }
  }

  animateBossShooting = (frames: number) => {
    this.img = this.imgBoss
    this.action.y = this.boss.y
    this.action.h = this.boss.h
    if (frames % 14 === 0) {
        if (this.spriteBoss === 7) {
            this.bossBulletCreated = false
        }
        if (this.spriteBoss > 10) {
            this.spriteBoss = 0
        }
      this.action.x = this.boss.x[this.spriteBoss]
      this.action.w = this.boss.w//[this.spriteBoss]
      this.spriteBoss++
    } 

}
}