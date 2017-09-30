/**
 * 分数
 */
function Grade(director) {
    this.director = director;
    this.ctx = director.ctx;
    this.IndexGrade = 0;//当前分数
}

/**
 * 画分数
 */
Grade.prototype.draw = function () {
    this.ctx.fillStyle = "white";
    this.ctx.font = "26px";
    this.ctx.textAlign = "center";
    this.ctx.fillText("分数:" + this.IndexGrade, this.director.width - 60., 30, 60);
};

/**
 * 设置分数
 */
Grade.prototype.setGrade = function (addGrade) {
    this.IndexGrade += addGrade;
    this.draw();
}

