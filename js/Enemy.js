/**
 *敌机
 */
function Enemy(director) {
    this.director=director;
    this.ctx = director.ctx;
    this.img = new Image();
    this.imgs = ["img/enemy_small.png", "img/enemy_small_2.png", "img/enemy_small_2_special.png",
        "img/enemy_small_3.png", "img/enemy_small_4.png"];
    // this.img.src = "img/Rock.png";
    this.x = parseInt((Math.random() * this.director.width).toFixed(0));
    this.y = parseInt((-Math.random() * this.director.height).toFixed(0));
    this.width = 32;
    this.height = 32;
    this.emys = director.enimes;
    this.exploded = false;
    this.explodedImg = new Image();
    this.explodedImg.src = "img/explosionEnemy.png";
    this.explodeIndex = 0;
    this.airplaneType = parseInt(Math.random() * 10 % this.imgs.length);
    this.img.src = this.imgs[this.airplaneType];
}

Enemy.prototype.draw = function () {

    if (!this.exploded) {
        this.ctx.drawImage(this.img, this.x, this.y);
        // this.ctx.fillStyle="white";
        // this.ctx.font = "16px";
        // this.ctx.moveTo(this.x-this.width/2,this.y-this.height);
        // this.ctx.lineTo(this.x+this.width/2,this.y-this.height);
        // this.ctx.stroke();
        this.y++;
    } else {
        this.ctx.drawImage(this.explodedImg,
            this.explodeIndex * 44, 0, 44, 49,
            this.x, this.y,
            44, 49);
        this.explodeIndex++;
    }
    if (this.y > this.director.height) {
        this.emys.remove(this);
    }
}

Enemy.prototype.getCenter = function () {
//	console.log(this.x);
//	console.log(typeof(this.x));
    return new Point(this.x + this.width / 2, this.y + this.height / 2);
}
