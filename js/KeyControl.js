/**
 *键盘监听
 */
var keyCode = {
    keyUp: 38,
    keyDown: 40,
    keyLeft: 37,
    keyRight: 39,
    keyW: 87,
    keyS: 83,
    keyA: 65,
    keyD: 68,
    keyJ: 74,
    keyEnter: 13,
    keyEsc: 27,
    keyDot: 110


}

var keyStatus = {
    keyUpStatus: false,
    keyDownStatus: false,
    keyLeftStatus: false,
    keyRightStatus: false,
    keyWStatus: false,
    keySStatus: false,
    keyAStatus: false,
    keyDStatus: false,
    keyJStatus: true,
    keyEnterStatus: false,
    keyEscStatus: false,
    keyDotStatus: true
}

function KeyControl(director) {
    $(document).keydown(function (e) {
        switch (e.which) {
            case keyCode.keyEnter:
                keyStatus.keyEnterStatus = true;
                break;
            case keyCode.keyEsc:
                keyStatus.keyEscStatus = true;
                logout();
                break;
            case keyCode.keyLeft:
                keyStatus.keyLeftStatus = true;
                break;
            case keyCode.keyRight:
                keyStatus.keyRightStatus = true;
                break;
            case keyCode.keyUp:
                keyStatus.keyUpStatus = true;
                break;
            case keyCode.keyDown:
                keyStatus.keyDownStatus = true;
                break;
            case keyCode.keyA:
                keyStatus.keyAStatus = true;
                break;
            case keyCode.keyD:
                keyStatus.keyDStatus = true;
                break;
            case keyCode.keyW:
                keyStatus.keyWStatus = true;
                break;
            case keyCode.keyS:
                keyStatus.keySStatus = true;
                break;
            case keyCode.keyJ:
                keyStatus.keyJStatus = true;
                break;
            case keyCode.keyDot:
                keyStatus.keyDotStatus = true;
                break;
        }
    }).keyup(function (e) {
        switch (e.which) {
            case keyCode.keyLeft:
                keyStatus.keyLeftStatus = false;
                break;
            case keyCode.keyRight:
                keyStatus.keyRightStatus = false;
                break;
            case keyCode.keyUp:
                keyStatus.keyUpStatus = false;
                break;
            case keyCode.keyDown:
                keyStatus.keyDownStatus = false;
                break;
            case keyCode.keyA:
                keyStatus.keyAStatus = false;
                break;
            case keyCode.keyD:
                keyStatus.keyDStatus = false;
                break;
            case keyCode.keyW:
                keyStatus.keyWStatus = false;
                break;
            case keyCode.keyS:
                keyStatus.keySStatus = false;
                break;
            case keyCode.keyEnter:
                keyStatus.keyEnterStatus = false;
                break;
            case keyCode.keyJ:
                keyStatus.keyJStatus = false;
                break;
            case keyCode.keyDot:
                keyStatus.keyDotStatus = false;
                break;
            case keyCode.keyEsc:
                keyStatus.keyEscStatus = false;
                break;
        }
    });
    document.getElementById("game_canvas").onmousemove = function (e) {
        console.log("子弹数x:"+e.clientX);
        console.log("子弹数y:"+e.clientY);
        director.players[0].setmousemove(e.clientX,e.clientY);
    }
}
