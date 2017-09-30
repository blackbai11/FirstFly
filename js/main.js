$(function () {
    var director = new Director();
    director.ctx = $("#game_canvas")[0].getContext("2d");
    director.back = new Background(director);
    director.grade = new Grade(director);
    director.width = director.ctx.canvas.width;
    director.height = director.ctx.canvas.height;
    director.choosePlayer();

    //飞机按键监听
    new KeyControl(director);
});