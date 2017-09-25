/**
 * 子弹
 */
function Bullet(ctx, x, y, bullets) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "img/projectile.png"
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 28;
    this.bullets = bullets;
    this.exploded = false;
    this.speed = 10;
}

Bullet.prototype.draw = function () {
    // console.log("子弹数:" + this.bullets.length);
    // this.ctx.rotate(45 * Math.PI);
    this.ctx.drawImage(this.img, this.x, this.y);
    // this.ctx.rotate(-45 * Math.PI);
    this.y -= this.speed;
    if (this.y < -10 || this.exploded) {
        this.bullets.remove(this);
    }
};

Bullet.prototype.getCenter = function () {
    return new Point(this.x + this.width / 2, this.y + this.height / 2);
};
