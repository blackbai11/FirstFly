/**
 *分数
 */
function Grade(director) {
    this.ctx = director.ctx;
    this.img = new Image();
    this.img.src = "img/double_image.png";
    this.x = 250;
    this.y = 350;
    this.director = director;
    this.width = 66;
    this.height = 70;
    this.exploded = false;
    this.explodedImg = new Image();
    this.explodedImg.src = "img/explosionEnemy.png";
    this.IndexGrade = 0;//当前分数
}

Grade.prototype.draw = function () {
    // this.ctx.drawImage(this.img, this.x, this.y);
    this.ctx.fillStyle = "white";
    this.ctx.font = "26px";
    this.ctx.textAlign = "center";
    this.ctx.fillText("分数:" + this.IndexGrade, this.director.width - 60., 30, 60);

    // this.img.click(function () {
    //     alert("imag");
    // });
}
Grade.prototype.setGrade=function (addgrade) {
    this.IndexGrade+=addgrade;
    this.draw();
}

