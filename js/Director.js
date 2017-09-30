function Director() {
    this.ctx = null;//canvas的上下文
    this.width = 0;
    this.height = 0;
    this.back = null;//背景
    this.players = [];//玩家
    this.enimes = [];//敌人集合
    this.bullets = [];//子弹集合
    this.props = [];//道具集合
    this.grade = null;//分数
    this.animID = null;//刷帧ID
    this.animenimesID = null;//刷帧ID
    this.status = 0;//游戏阶段（0-选择玩家 1-开始游戏）
    this.multiPlayer = false;
    this.time = 0; //(因为动画设置了1秒60帧，所以time=60代表一秒)
    this.choose = 1;

}

/**
 * 游戏开始
 */
Director.prototype.play = function () {
    var temp = this;

    temp.animID = setInterval(function () {
        temp.gameLoop();
    }, 1000 / 60);
    temp.animenimesID = setInterval(function () {
        //5.添加敌人
        temp.enimes.push(new Enemy(temp));

    }, 1000);

}

/**
 * 游戏动画循环
 */
Director.prototype.gameLoop = function () {
    var temp = this;
    //1.清屏
    temp.ctx.clearRect(0, 0, this.width, this.height);
    //2.画背景
    temp.back.draw();
    //3.画玩家
    if (!temp.multiPlayer) {
        temp.players[0].draw();
        if (temp.players[0].animStep())
            temp.onPause();
    } else {
        temp.players[0].draw();
        temp.players[1].draw();
        if (temp.players[0].animStep() && temp.players[1].animStep())
            temp.onPause();
    }
    //4.画分数
    temp.grade.draw();
    //4.画敌人
    temp.enimes.forEach(function (enime) {
        enime.draw();
        /***
         * 7.飞机撞击动画
         */
        temp.players.forEach(function (player) {
            if (IsCollided(enime, player)) {
                player.exploded = true;
            }
        });
        /***
         * 6.爆炸检测
         */
        temp.bullets.forEach(function (bullet) {
            if (!enime.exploded) {
                if (IsCollided(enime, bullet)) {
                    console.log("打中了");
                    enime.exploded = true;
                    bullet.exploded = true;
                    // temp.grade.setGrade((enime.airplaneType + 1) * 1000);
                    temp.grade.setGrade(1000);
                }
            }
        });

    });
    //5.画子弹
    temp.bullets.forEach(function (bullet) {
        bullet.draw();
    });

    /***
     * 添加道具
     */
    if (temp.grade.IndexGrade > -1) {
        if (temp.props.length === 0) {
            temp.props.push(new Prop(temp));
        }
    }
    /***
     * 8画道具
     */
    temp.props.forEach(function (prop) {
        prop.draw();
    });

    /***
     * 9.吃道具
     */

    temp.props.forEach(function (prop) {
        temp.players.forEach(function (player) {
            if (IsCollided(prop, player)) {
                player.BulletType = prop.propTypeCode;
                console.log("propTypeCode:" + prop.propTypeCode);
                prop.exploded = true;
            }
        });
    });


    temp.time++;
    //一分钟清零一次
    if (temp.time === 60 * 60) {
        temp.time = 0;
    }

    // if (temp.time % 60 === 0 ) {
    //     console.log( s);
    // }

};

/**
 * 暂停动画（游戏循环）
 */
Director.prototype.onPause = function () {
    clearInterval(this.animID);
    clearInterval(this.animenimesID);
    this.animenimesID = null;
    this.animID = null;
};

/**
 * 画玩家选择
 * @param choose
 */
Director.prototype.drawChoose = function (choose) {
    if (choose === 1) {
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.fillText("1 players", this.width / 2, this.height / 2, 1000);
        this.ctx.fillStyle = "DarkGray";
        this.ctx.font = "16px Arial";
        this.ctx.fillText("2 players", this.width / 2, this.height / 2 + 40, 1000);

        // this.ctx.moveTo(100, 100);
        // this.ctx.lineTo(200, 100);
        // this.ctx.lineWidth = 3;
        // this.ctx.strokeStyle = "red";
        // this.ctx.strokeRect(20,20,150,100);
        // this.ctx.stroke();
    } else if (choose === 2) {
        this.ctx.fillStyle = "DarkGray";
        this.ctx.font = "16px Arial";
        this.ctx.fillText("1 players", this.width / 2, this.height / 2, 1000);
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.fillText("2 players", this.width / 2, this.height / 2 + 40, 1000);
    }
};

/**
 * 选择玩家
 */
Director.prototype.choosePlayer = function () {
    var temp = this;

    temp.ctx.font = "16px Arial";
    temp.ctx.textAlign = "center";
    this.animID = setInterval(function () {
        //1.清屏
        temp.ctx.clearRect(0, 0, temp.width, temp.height);
        //2.画背景
        temp.back.draw();
        //3.画选择
        temp.drawChoose(temp.choose);

    }, 1000 / 60);
    $(document).keydown(function (e) {
        if (temp.status !== 0) {
            return;
        }
        switch (e.which) {
            case keyCode.keyUp:
                temp.choose = 1;
                break;

            case keyCode.keyDown:
                temp.choose = 2;
                break;

            case keyCode.keyEnter:
                temp.init();
                break;
        }
    })
};

/***
 * 鼠标移动事件
 * @param x 相对画布的x坐标
 * @param y 相对画布的y坐标
 */
Director.prototype.setmousemove = function (x, y) {

    if (this.width / 2 - 30 < x && x < this.width / 2 + 30) {
        if (this.height / 2 - 20 < y && y < this.height / 2 + 60) {
            if (y < this.height / 2 + 20) {
                this.choose = 1;
            } else {
                this.choose = 2;
            }
        }
    }
    if (this.status === 1) {
        this.players.forEach(function (player) {
            player.setmousemove(x, y);
        })
    }
};

/***
 * 鼠标按下事件
 * @param x 相对画布的x坐标
 * @param y 相对画布的y坐标
 */
Director.prototype.setmousedowm = function (x, y) {
    if (this.width / 2 - 30 < x && x < this.width / 2 + 30) {
        if (this.height / 2 - 50 < y && y < this.height / 2 + 90) {
            this.init();
        }
    }
};

/***
 * 提取公共方法，初始化---开始游戏
 */
Director.prototype.init = function () {
    if (this.choose === 1) {
        var player = new Player(this);
        player.initPlayer("img/Player.png", this.width / 2 - player.width / 2, this.height * 3 / 4, false);
        this.players.push(player);
    } else if (this.choose === 2) {
        var player1 = new Player(this);
        player1.initPlayer("img/Player2.png", this.width * 2 / 3, this.height * 3 / 4);
        this.players.push(player1);
        var player2 = new Player(this);
        player2.initPlayer("img/Player.png", this.width / 3, this.height * 3 / 4, true);
        this.players.push(player2);
        this.multiPlayer = true;
    }
    this.enimes.removeAll();
    this.bullets.removeAll();
    this.grade.setGrade(0);
    this.onPause();
    this.play();
    this.status = 1;
};


