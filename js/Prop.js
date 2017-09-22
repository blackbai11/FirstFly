/**
 *道具类
 */
function Prop(director) {
    this.ctx = ctx;
    this.img = new Image();
    // this.imgs = ["img/enemy_small.png", "img/enemy_small_2.png", "img/enemy_small_2_special.png",
    //     "img/enemy_small_3.png", "img/enemy_small_4.png"];
    this.img.src = "img/Rock.png";
    this.x = parseInt((Math.random() * 500).toFixed(0));
    this.y = parseInt((-Math.random() * 700).toFixed(0));
    this.width = 32;
    this.height = 32;
    this.exploded = false;
    this.explodedImg = new Image();
    this.explodedImg.src = "img/explosionEnemy.png";
    // this.explodeIndex = 0;
    this.airplaneType = parseInt(Math.random() * 10 % this.imgs.length);
    // this.img.src = this.imgs[this.airplaneType];
}
Prop.prototype.draw= function () {
    if (!this.exploded) {
        CreateBezierPoints()
        this.ctx.drawImage(this.img, this.x, this.y);
        this.y++;
    } else {
        this.ctx.drawImage(this.explodedImg,
            this.explodeIndex * 44, 0, 44, 49,
            this.x, this.y,
            44, 49);
        this.explodeIndex++;
    }
    if (this.y > 450) {
        this.emys.remove(this);
    }
}