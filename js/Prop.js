/**
 *道具类
 */
function Prop(director) {
    this.ctx = director.ctx;
    this.director = director;
    this.img = new Image();
    // this.imgs = ["img/enemy_small.png", "img/enemy_small_2.png", "img/enemy_small_2_special.png",
    //     "img/enemy_small_3.png", "img/enemy_small_4.png"];
    this.img.src = "img/prop.png";
    this.x = parseInt((Math.random() * 500).toFixed(0));
    this.y = parseInt((Math.random() * 700).toFixed(0));
    this.vx = 5;//速度vx，vy
    this.vy = 2;
    this.width = 32;
    this.height = 32;
    this.exploded = false;
    this.explodedImg = new Image();
    this.explodedImg.src = "img/explosionEnemy.png";
    this.explodeIndex = 0;

    this.props=director.props;
    // this.airplaneType = parseInt(Math.random() * 10 % this.imgs.length);
    // this.img.src = this.imgs[this.airplaneType];
}


Prop.prototype.draw = function () {
    if (!this.exploded) {
        this.ctx.drawImage(this.img, this.x, this.y)
        this.x += this.vx;
        this.y += this.vy;
        if (this.y + this.vy > this.director.height - this.height ||
            this.y + this.vy < 0) {
            this.vy = -this.vy;
        }
        if (this.x + this.vx > this.director.width - this.width ||
            this.x + this.vx < 0) {
            this.vx = -this.vx;
        }
    } else {
        // this.ctx.drawImage(this.explodedImg,
        //     this.explodeIndex * 44, 0, 44, 49,
        //     this.x, this.y,
        //     44, 49);
        // this.explodeIndex++;
        this.props.removeAll();
    }
}

Prop.prototype.getCenter = function () {
    return new Point(this.x + this.width / 2, this.y + this.height / 2);
}
