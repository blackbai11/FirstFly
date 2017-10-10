function Player(director) {
    this.director = director;
    this.ctx = director.ctx;
    this.img = new Image();
    this.img.src = "img/Player.png";
    this.x = 0;
    this.y = 0;
    this.width = 32;
    this.height = 32;
    this.exploded = false;
    this.explodedImg = new Image();
    this.explodedImg.src = "img/explosionEnemy.png";
    this.explodeIndex = 0;
    this.isSecondPlayer = false;
    this.isAutoFire = true;
    this.PropCode = {
        Type0: 0, //默认
        Type1: 1,
        Type2: 2,
        Type3: 3,
        Type4: 4
    };
    this.bullets = director.bullets;
    this.BulletType = this.PropCode.Type0;

    this.indexblood = 1000;
    this.maxblood = 1000;
}

/**
 * 画玩家
 * 位置随键盘移动，子弹由键盘控制
 */
Player.prototype.draw = function () {
    if (!this.exploded) {
        this.ctx.drawImage(this.img, this.x, this.y);
        drawBlood(this.director, this.indexblood, this.maxblood, this.x + this.width / 4, this.y, this.x + this.width / 4 + this.width / 2, this.y, 3, 10, 1, "red");
        if (!this.isSecondPlayer) {
            //位置移动
            this.setKeyDirection(keyStatus.keyLeftStatus, keyStatus.keyRightStatus, keyStatus.keyUpStatus, keyStatus.keyDownStatus);
            //子弹控制
            this.setKeyBullet(keyStatus.keyDotStatus);
            keyStatus.keyDotStatus = false;
        } else {
            //第二玩家
            this.setKeyDirection(keyStatus.keyAStatus, keyStatus.keyDStatus, keyStatus.keyWStatus, keyStatus.keySStatus);
            //子弹控制
            this.setKeyBullet(keyStatus.keyJStatus);
            keyStatus.keyJStatus = false;
        }
    } else {//爆炸
        if (this.explodeIndex < 10) {
            this.ctx.drawImage(this.explodedImg,
                this.explodeIndex * 44, 0, 44, 49,
                this.x, this.y, 44, 49);
            this.explodeIndex++;
        }
    }
};

/**
 * 开火
 * describe:发射子弹，涉及不同子弹类型
 */
Player.prototype.fire = function (removeX, removeY) {
    var temp = this;
    var array;
    switch (this.BulletType) {
        case this.PropCode.Type0:// code0:1颗子弹
            this.bullets.push(new Bullet(this.director, removeX, removeY, 0, true));
            break;
        case this.PropCode.Type1:// code1:3颗子弹
            array = [0, -30, 30];
            array.forEach(function (t) {
                temp.bullets.push(new Bullet(temp.director, removeX, removeY, t, true));
            });
            break;
        case this.PropCode.Type2:// code2:散弹
            array = [0, -15, -30, 15, 30];
            array.forEach(function (t) {
                temp.bullets.push(new Bullet(temp.director, removeX, removeY, t, true));
            });
            break;
        case this.PropCode.Type3:// code3:散弹（密集）
            array = [0, -15, -30, -45, 15, 30, 45];
            array.forEach(function (t) {
                temp.bullets.push(new Bullet(temp.director, removeX, removeY, t, true));
            });
            break;
        case this.PropCode.Type4:// code0:1颗子弹
            array = [0, -30, -60, -90, -120, -150, -180, 30, 60, 90, 120, 150];
            array.forEach(function (t) {
                temp.bullets.push(new Bullet(temp.director, removeX, removeY, t, true));
            });
            break;
    }
};

/**
 * 获取中心点
 */
Player.prototype.getCenter = function () {
    return new Point(this.x + this.width / 2, this.y + this.height / 2);
}

Player.prototype.animStep = function () {
    return (this.exploded && this.explodeIndex > 7);
}

/**
 * 初始化飞机
 */
Player.prototype.initPlayer = function (img, x, y, isSecondPlayer) {
    this.img.src = img;
    this.x = x;
    this.y = y;
    this.isSecondPlayer = isSecondPlayer;
};

/**
 * 设置键盘方向
 * describe:上下左右控制
 */
Player.prototype.setKeyDirection = function (keyLeft, keyRight, keyUp, keyDown) {
    if (keyLeft) {
        this.x > 0 ? this.x -= 5 : this.x;
    }
    if (keyRight) {
        this.x < this.director.width - this.width ? this.x += 5 : this.x;
    }
    if (keyUp) {
        this.y > 0 ? this.y -= 5 : this.y;
    }
    if (keyDown) {
        this.y < this.director.height - this.height ? this.y += 5 : this.y;
    }
};

/**
 * 设置子弹控制
 * describe:不同子弹按键设置
 */
Player.prototype.setKeyBullet = function (keyAttack) {
    var temp = this;
    if (!this.isAutoFire) {
        if (keyAttack) {
            this.fire(this.x + 8, this.y - 12);
        }
    } else {
        //自动攻击（1秒3颗子弹）
        if (temp.director.time % 20 === 0) {
            temp.fire(temp.x + 8, temp.y - 12);
        }
    }
};
