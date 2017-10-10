/**
 *工具
 */
Array.prototype.remove = function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == obj) {
            this.splice(i, 1)
            return this;
        }
    }
}
Array.prototype.removeAll = function () {
    //清空数组 方法1
    this.splice(0, this.length);
    //清空数组 方法2
    // this.length=0;
    return this;
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function IsCollided(obj1, obj2) {
    //判断两个物体都有，即不发子弹时不比较
    if (obj1 && obj2) {
        var cen1 = obj1.getCenter();
        var cen2 = obj2.getCenter();
//		console.log(cen1.x);
        return Math.abs(cen1.x - cen2.x) < (obj1.width + obj2.width) / 2
            && Math.abs(cen1.y - cen2.y) < (obj1.height + obj2.height) / 2;
    }
    return false;
}


function logout() {
    if (confirm("你确定要退出游戏吗？是－选择确定，否-选择取消")) {
        // window.location.href="https://www.baidu.com";
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
                window.opener = null;
                window.close();
            } else {
                window.open('', '_top');
                window.top.close();
            }
        } else if (navigator.userAgent.indexOf("Firefox") > 0 || navigator.userAgent.indexOf("Presto") > 0) {
            window.location.href = 'about:blank ';
        } else if (navigator.userAgent.indexOf("Chrome") > 0) {
            open(location, '_self').close();
        } else {
            window.opener = null;
            window.open('', '_self', '');
            window.close();
        }
    }
}

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
function drawBlood(director, indexblood, maxblood, sX, sY, eX, eY, bH, bD,lineWidth,strokeStyle) {
    this.ctx = director.ctx;
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.moveTo(sX, sY - bH - bD);
    this.ctx.lineTo(eX, eY - bH - bD);
    this.ctx.moveTo(sX, sY - bD);
    this.ctx.lineTo(eX, eY - bD);
    this.ctx.arc(sX, sY - bH / 2 - bD, bH / 2, 0.5 * Math.PI, 1.5 * Math.PI);
    this.ctx.arc(eX, eY - bH / 2 - bD, bH / 2, -0.5 * Math.PI, 0.5 * Math.PI);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.lineWidth = bH;
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.moveTo(sX - bH / 2, sY - bH / 2 - bD);
    this.ctx.lineTo(sX - bH / 2 + indexblood * (eX - sX + bH) / maxblood, eY - bH / 2 - bD);
    this.ctx.stroke();
}

