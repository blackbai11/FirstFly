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
}

/**
 * 游戏开始
 */
Director.prototype.play = function () {
    var temp = this;

    this.animID = setInterval(function () {
        temp.gameLoop();
    }, 1000 / 60);
    this.animenimesID = setInterval(function () {
        //5.添加敌人
        temp.enimes.push(new Enemy(temp));

    }, 1000);
    //飞机按键监听
    new KeyControl();
}

/**
 * 游戏动画循环
 */
Director.prototype.gameLoop = function () {
    //1.清屏
    this.ctx.clearRect(0, 0, this.width, this.height);
    //2.画背景
    this.back.draw();
    //3.画玩家
    if (!this.multiPlayer) {
        this.players[0].draw();
    } else {
        this.players[0].draw();
        this.players[1].draw();
    }
    //4.画分数
    this.grade.draw();
    // 5.添加敌人
    // this.enimes.push(new Enemy(this.ctx, this.enimes));

    //4.画敌人
    for (var i = 0; i < this.enimes.length; i++) {
        this.enimes[i].draw();
    }
    //5.画子弹
    // this.bullets.forEach(function (t) {
    //     t.draw();
    // });
    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].draw();
    }
    //6.爆炸检测
    for (var i = 0; i < this.enimes.length; i++) {
        for (var j = 0; j < this.bullets.length; j++) {
            if (!this.enimes[i].exploded) {
                if (IsCollided(this.enimes[i], this.bullets[j])) {
                    console.log("打中了");
                    this.enimes[i].exploded = true;
                    this.bullets[j].exploded = true;
                    this.grade.setGrade((this.enimes[i].airplaneType + 1) * 1000);
                }
            }
        }
    }

    /***
     * 6.爆炸检测
     */
    for (var i = 0; i < this.enimes.length; i++) {
        for (var j = 0; j < this.bullets.length; j++) {
            if (!this.enimes[i].exploded) {
                if (IsCollided(this.enimes[i], this.bullets[j])) {
                    console.log("打中了");
                    this.enimes[i].exploded = true;
                    this.bullets[j].exploded = true;
                    this.grade.setGrade((this.enimes[i].airplaneType + 1) * 1000);
                }
            }
        }
    }

    /***
     * 7.飞机撞击动画
     */
    for (var i = 0; i < this.enimes.length; i++) {
        for (var j = 0; j < this.players.length; j++) {
            if (IsCollided(this.enimes[i], this.players[j])) {
                this.players[j].exploded = true;
            }
        }
    }
    /***
     * 添加道具
     */
    if (this.grade.IndexGrade > -1) {
        if (this.props.length === 0) {
            this.props.push(new Prop(this));
        }
    }
    /***
     * 8画道具
     */
        for (var i = 0; i < this.props.length; i++) {
            this.props[i].draw();
        }
    /***
     * 9.吃道具
     */

    for (var i = 0; i < this.props.length; i++) {
        for (var j = 0; j < this.players.length; j++) {
            if (IsCollided(this.props[i], this.players[j])) {
                this.players[j].bulleType = 1;
                this.props[i].exploded = true;
            }
        }
    }
    // if (this.players.animStep()) {
    //     this.onPause();
    // }

    this.time++;
    //一分钟清零一次
    if (this.time === 60 * 60) {
        this.time = 0;
    }
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
    var choose = 1;
    temp.ctx.font = "16px Arial";
    temp.ctx.textAlign = "center";
    this.animID = setInterval(function () {
        //1.清屏
        temp.ctx.clearRect(0, 0, temp.width, temp.height);
        //2.画背景
        temp.back.draw();
        //3.画选择
        temp.drawChoose(choose);
    }, 1000 / 60);

    $(document).keydown(function (e) {
        if (temp.status !== 0) {
            return;
        }
        switch (e.which) {
            case keyCode.keyUp:
                choose = 1;
                break;

            case keyCode.keyDown:
                choose = 2;
                break;

            case keyCode.keyEnter:
                if (choose === 1) {
                    var player = new Player(temp);
                    player.initPlayer("img/Player.png", temp.width / 2 - player.width / 2, temp.height * 3 / 4, false);
                    temp.players.push(player);
                } else if (choose === 2) {
                    var player1 = new Player(temp);
                    player1.initPlayer("img/Player2.png", temp.width * 2 / 3, temp.height * 3 / 4);
                    temp.players.push(player1);
                    var player2 = new Player(temp);
                    player2.initPlayer("img/Player.png", temp.width / 3, temp.height * 3 / 4, true);
                    temp.players.push(player2);
                    temp.multiPlayer = true;
                }
                temp.enimes.removeAll();
                temp.bullets.removeAll();
                temp.grade.setGrade(0);
                temp.onPause();
                temp.play();
                temp.status = 1;
                break;
        }
    })
};

