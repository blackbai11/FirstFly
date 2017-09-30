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
        /***
         *
         * @param director (用来获取canvas)
         * @param sX 初始点X (this.x+this.width/4)
         * @param sY 初始点Y (this.y)
         * @param indexblood 剩余血量 (int)
         * @param maxblood 总血量 (int)
         * @param eX 结束点X (sX+this.width/2)
         * @param eY 结束点Y (this.y)
         * @param bH 血条中高度 (this.bloodH)
         * @param bD 血条距离飞机距离 (this.Disblood)
         * @param lineWidth 血条粗细 (int)
         * @param strokeStyle 颜色 ("red")
         */
        drawBlood(this.director, 3000, 5000, this.x+this.width/4, this.y, this.x+this.width/4+this.width/2, this.y, 2, 10,1,"red");
        // this.ctx.lineWidth = 1;
        // this.ctx.strokeStyle = "red";
        // this.ctx.moveTo(this.x+this.width/4, this.y-this.bloodH-this.Disblood);
        // this.ctx.lineTo(this.x+this.width/4+this.width/2, this.y-this.bloodH-this.Disblood);
        // this.ctx.moveTo(this.x+this.width/4, this.y-this.Disblood);
        // this.ctx.lineTo(this.x+this.width/4+this.width/2, this.y-this.Disblood);
        // this.ctx.arc(this.x+this.width/4,this.y-this.bloodH/2-this.Disblood,this.bloodH/2,0.5*Math.PI,1.5*Math.PI);
        // this.ctx.arc(this.x+this.width/4+this.width/2,this.y-this.bloodH/2-this.Disblood,this.bloodH/2,-0.5*Math.PI,0.5*Math.PI);
        // this.ctx.stroke();
        // this. ctx.beginPath();
        // this.ctx.lineWidth = this.bloodH;
        // this.ctx.moveTo(this.x+this.width/4-this.bloodH/2,this.y-this.bloodH/2-this.Disblood);
        // this.ctx.lineTo(this.x+this.width/4+this.index*0.5*this.width/this.maxindex, this.y-this.bloodH/2-this.Disblood);
        // this. ctx.stroke();
        this.y++;
    } else {
        this.ctx.drawImage(this.explodedImg,
            this.explodeIndex * 44, 0, 44, 49,
            this.x, this.y,
            44, 49);
        this.explodeIndex++;
        if(this.explodeIndex>7){
            this.emys.remove(this);
        }
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
