/**
 * 子弹
 */
function Bullet(director, x, y,angle,isPlayerBullet) {
    this.director = director;
    this.ctx = director.ctx;
    this.img = new Image();
    this.img.src = "img/projectile.png";
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 28;
    this.exploded = false;
    this.speed = 10;
    this.angle = angle;
    this.bullets = director.bullets;
    this.isPlayerBullet = isPlayerBullet;
}

/**
 * 绘制子弹
 */
Bullet.prototype.draw = function () {
    // console.log("子弹数:" + this.bullets.length);
    //根据子弹角度绘制
    this.ctx.save();
    this.ctx.translate(this.x + 8, this.y + 28);
    this.ctx.rotate((Math.PI / 180) * this.angle);  //旋转45度
    this.ctx.drawImage(this.img, -this.img.width / 2, -this.img.height);
    this.ctx.restore();
    this.x += Math.sin((Math.PI / 180) * this.angle) * this.speed;
    this.y -= Math.cos((Math.PI / 180) * this.angle) * this.speed;
    //边界检测
    if (this.x < -10 || this.x > this.director.width || this.y < -10 || this.y > this.director.height || this.exploded) {
        this.bullets.remove(this);
    }
};

/**
 * 获取子弹中心点
 */
Bullet.prototype.getCenter = function () {
    return new Point(this.x + this.width / 2, this.y + this.height / 2);
};

