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

