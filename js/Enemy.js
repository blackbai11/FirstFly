/**
 * 敌人
 */
function Enemy(director) {
    this.director = director;
    this.ctx = director.ctx;
    this.img = new Image();
    this.emyPlaneImgs = ["img/enemy_small.png", "img/enemy_small_2.png", "img/enemy_small_3.png", "img/enemy_small_4.png"];
    this.emyPlaneImg = this.emyPlaneImgs[parseInt(Math.random() * 10 % this.emyPlaneImgs.length)];
    this.x = parseInt((Math.random() * this.director.width).toFixed(0));
    this.y = parseInt((-Math.random() * this.director.height).toFixed(0));
    this.width = this.img.width;
    this.height = this.img.height;
    this.emys = director.enimes;
    this.exploded = false;
    this.explodedImg = new Image();
    this.explodedImg.src = "img/explosionEnemy.png";
    this.explodeIndex = 0;
    this.EnemyCode = {
        Type0: 0, //障碍物（eg：陨石）
        Type1: 1, //敌机
        Type2: 2, //可横向移动敌机
        Type3: 3  //boss
    };
    this.EnemyType = parseInt(Math.random() * (Object.keys(this.EnemyCode).length - 1));//随机产生除了boss的敌人
    this.bullets = director.bullets;
    this.BulletType = 0;
    this.angle = 0;
    this.initX = this.x;//记录初始值x坐标
    this.indexY = this.y;
    // this.moveX = parseInt(Math.random() * 5); //随机偏移X
    this.moveX = 2; //随机偏移X

    this.indexblood=500;
    this.maxblood=500;
}

/**
 * 画敌人
 */
Enemy.prototype.draw = function () {
    // this.EnemyType = 3;
    // console.log(this.EnemyType);
    //根据类型确定敌机
    if (!this.exploded) {
        switch (this.EnemyType) {
            case this.EnemyCode.Type0://障碍物（eg：陨石）
                //旋转绘制
                this.ctx.save();
                this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
                this.ctx.rotate((Math.PI / 180) * this.angle++);  //旋转
                this.ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
                this.ctx.restore();
                this.y += 5;
                if (this.y > -this.height) {
                    if (this.initX > this.director.width / 2) {
                        this.x -= this.moveX;
                    } else {
                        this.x += this.moveX;
                    }
                }
                break;
            case this.EnemyCode.Type1: //敌机
                this.ctx.drawImage(this.img, this.x, this.y);
                drawBlood(this.director, this.indexblood, this.maxblood, this.x+this.width/4, this.y, this.x+this.width/4+this.width/2, this.y, 3, 10,1,"red");
                this.y++;
                if (this.y > -this.height) {
                    //自动攻击（1秒2颗子弹）
                    if (this.director.time % 30 === 0) {
                        this.fire(this.x + 8, this.y);
                    }
                }
                break;
            case this.EnemyCode.Type2: //可横向移动敌机
                this.ctx.drawImage(this.img, this.x, this.y);
                drawBlood(this.director, this.indexblood, this.maxblood, this.x+this.width/4, this.y, this.x+this.width/4+this.width/2, this.y, 3, 10,1,"red");
                this.y++;
                if (this.y >= -this.height) {
                    this.x -= this.moveX;
                    if (this.x > (this.director.width - this.width) || this.x < 0) {
                        this.moveX = -this.moveX;
                    }
                    //自动攻击（1秒2颗子弹）
                    if (this.director.time % 30 === 0) {
                        this.fire(this.x + 8, this.y);
                    }
                }
                break;
            case this.EnemyCode.Type3:
                this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
                drawBlood(this.director, this.indexblood, this.maxblood, this.x+this.width/4, this.y, this.x+this.width/4+this.width/2, this.y, 3, 10,1,"red");
                if (this.indexY < (this.director.width - this.width) / 4) {
                    this.y++;
                    if (this.y === (this.director.width - this.width) / 4) {
                        this.indexY = this.y;
                    }
                }
                if (this.indexY === (this.director.width - this.width) / 4) {
                    this.y--;
                    if (this.y === 0) {
                        this.indexY = this.y;
                    }
                }
                if (this.initX > 0) {
                    this.x--;
                    if (this.x === 0) {
                        this.initX = this.x;
                    }
                }
                if (this.initX === 0) {
                    this.x++;
                    if (this.x === this.director.width - this.width) {
                        this.initX = this.x;
                    }
                }
                break
        }
    } else {//爆炸
        this.ctx.drawImage(this.explodedImg, this.explodeIndex * 44, 0, 44, 49, this.x, this.y, 44, 49);
        this.explodeIndex++;
        if (this.explodeIndex > 7) this.emys.remove(this);
    }
    //边界检测
    if (this.x < -10 || this.x > this.director.width || this.y > this.director.height) {
        this.emys.remove(this);
    }
};

/**
 * 获取中心点
 */
Enemy.prototype.getCenter = function () {
    return new Point(this.x + this.width / 2, this.y + this.height / 2);
};

/**
 * 开火
 * describe:发射子弹，涉及不同子弹类型
 */
Enemy.prototype.fire = function (removeX, removeY) {
    switch (this.BulletType) {
        case 0:// code0:1颗子弹
            this.bullets.push(new Bullet(this.director, removeX, removeY, 180, false));
            break;
    }
};

/**
 * 初始化
 * describe:
 */
Enemy.prototype.init = function () {
    switch (this.EnemyType) {
        case this.EnemyCode.Type0://障碍物（eg：陨石）
            this.img.src = "img/Rock.png";
            this.width = 66 * 2 / 3;
            this.height = 70 * 2 / 3;

            this.indexblood=200;
            this.maxblood=200;
            break;
        case this.EnemyCode.Type1: //敌机
            this.img.src = this.emyPlaneImg;
            this.width = 32;
            this.height = 32;

            this.indexblood=300;
            this.maxblood=300;
            break;
        case this.EnemyCode.Type2: //可横向移动敌机
            this.img.src = "img/enemy_small_2_special.png";
            this.width = 32;
            this.height = 32;

            this.indexblood=300;
            this.maxblood=300;
            break;
        case this.EnemyCode.Type3:
            this.img.src = "img/boss.png";
            this.width = 100;
            this.height = 100;
            console.log(this.width);
            console.log(this.height);
            this.x = this.director.width / 2 - this.width / 2;
            this.y = 0;
            this.initX = this.x;
            this.indexY = this.y;

            this.indexblood=5000;
            this.maxblood=5000;
            break
    }
};

/**
 * 设置敌人类型和子弹类型
 * describe:设置敌人的类型，比如出现boss
 */
Enemy.prototype.setEmyType = function (emyType) {
    this.EnemyType = emyType;
};