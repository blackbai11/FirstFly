function Player(director) {
    this.director = director;
    this.ctx = director.ctx;
    this.img = new Image();
    this.img.src = "img/Player.png";
    this.x = 0;
    this.y = 0;
    this.bullets = director.bullets;
    this.width = 32;
    this.height = 32;
    this.exploded = false;
    this.explodedImg = new Image();
    this.explodedImg.src = "img/explosionEnemy.png";
    this.explodeIndex = 0;
    this.isSecondPlayer = false;
    this.isAutoFire = false;
    this.PropCode = {
        Type0: 0, //默认
        Type1: 1,
        Type2: 2,
        Type3: 3,
        Type4: 4
    };
    this.BulletType = this.PropCode.Type0;
    // this.BulletType = this.director.players[!this.isSecondPlayer ? 0 : 1].BulletType;
    this.vx = 0;
    this.vy = 0;
}

/**
 * 画玩家
 * 位置随键盘移动，子弹由键盘控制
 */
Player.prototype.draw = function () {
    if (!this.exploded) {
        this.ctx.drawImage(this.img, this.x, this.y);
        if (!this.isSecondPlayer) {
            //位置移动
            this.setKeyDirection(keyStatus.keyLeftStatus, keyStatus.keyRightStatus, keyStatus.keyUpStatus, keyStatus.keyDownStatus);
            //子弹控制
            this.setKeyBullet(keyStatus.keyDotStatus);
            keyStatus.keyDotStatus = true;
        } else {
            //第二玩家
            this.setKeyDirection(keyStatus.keyAStatus, keyStatus.keyDStatus, keyStatus.keyWStatus, keyStatus.keySStatus);
            //子弹控制
            this.setKeyBullet(keyStatus.keyJStatus);
            keyStatus.keyJStatus = true;
        }
    } else {
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
    switch (this.BulletType) {
        case this.PropCode.Type0:// code0:1颗子弹
            this.bullets.push(new Bullet(this.director, removeX, removeY, this.isSecondPlayer, 0));
            break;
        case this.PropCode.Type1:// code1:3颗子弹
            this.bullets.push(new Bullet(this.director, removeX, removeY, this.isSecondPlayer, 0));
            this.bullets.push(new Bullet(this.director, removeX, removeY, this.isSecondPlayer, -30));
            this.bullets.push(new Bullet(this.director, removeX, removeY, this.isSecondPlayer, 30));
            break;
        case this.PropCode.Type2:// code2:散弹
            this.bullets.push(new Bullet(this.director, removeX, removeY, this.isSecondPlayer, 0));
            this.bullets.push(new Bullet(this.director, removeX, removeY, this.isSecondPlayer, -15));
            this.bullets.push(new Bullet(this.director, removeX, removeY, this.isSecondPlayer, -30));
            this.bullets.push(new Bullet(this.director, removeX, removeY, this.isSecondPlayer, 15));
            this.bullets.push(new Bullet(this.director, removeX, removeY, this.isSecondPlayer, 30));
            break;
        case this.PropCode.Type3:// code3:散弹（密集）
            this.bullets.push(new Bullet(this.director, removeX, removeY, this.isSecondPlayer, 0));
            this.bullets.push(new Bullet(this.director, removeX, removeY, this.isSecondPlayer, -15));
            this.bullets.push(new Bullet(this.director, removeX, removeY, this.isSecondPlayer, -30));
            this.bullets.push(new Bullet(this.director, removeX, removeY, this.isSecondPlayer, -45));
            this.bullets.push(new Bullet(this.director, removeX, removeY, this.isSecondPlayer, 15));
            this.bullets.push(new Bullet(this.director, removeX, removeY, this.isSecondPlayer, 30));
            this.bullets.push(new Bullet(this.director, removeX, removeY, this.isSecondPlayer, 45));
            break;
        case this.PropCode.Type4:// code0:1颗子弹
            this.bullets.push(new Bullet(this.director, removeX, removeY, this.isSecondPlayer, 0));
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
        if (!keyAttack) {
            this.fire(this.x + 8, this.y - 12);
        }
    } else {
        // 自动攻击（1秒6颗子弹）
        if (temp.director.time % 10 === 0) {
            temp.fire(temp.x + 8, temp.y - 12);
        }
    }
};

Player.prototype.setmousemove = function (x, y) {
    this.x = ( 0 < x && x < this.director.width - this.width ? x : this.x);
    this.y = (0 < y && y < this.director.height - this.height ? y : this.y);
};
