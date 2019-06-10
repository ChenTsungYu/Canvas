window.onload = function () {
    const canvas = document.getElementById("mycanvas");
    const ctx = canvas.getContext('2d');
    const blockWidth = 200; // 九宮格寬度
    const PI = Math.PI;
    const PI2 = Math.PI * 2;

    // 大小為600*600九宮格 
    canvas.width = blockWidth * 3;
    canvas.height = blockWidth * 3;

    var color = {
        red: "#F74456",
        white: "#fff",
        yellow: "#F1DA56",
        blue: "#036FAF"
    }

    function drawBlock(pos, bgColor, draw, time) {
        ctx.save(); // 儲存初始狀態
        // 繪製九宮格
        ctx.translate(pos.x * blockWidth, pos.y * blockWidth);
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, blockWidth, blockWidth);
        // 相對於左上角的焦點，再位移(100,100)至中心
        ctx.translate(100, 100);
        draw()
        ctx.restore(); // 還原成初始狀態
    }

    var time = 0;
    function draw() {
        time++
        // 圓圈動的速度為time的 1/20
        let stime = parseInt(time / 20);

        drawBlock({ x: 0, y: 0 }, color.blue, function () {
            ctx.beginPath();
            // 太陽中心的縮放可透過半徑的變動完成
            // 分母範圍設定(stime % 3 + 1)
            ctx.arc(0, 0, 30 / (stime % 3 + 1), 0, PI2);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 15;
            ctx.stroke();
            // 外圍樣式
            for (let i = 0; i < 8; i++) {
                ctx.fillStyle = (stime % 8 === i) ? color.red : color.white;
                //  console.log(i);1
                // 顯示隱藏對邊的圖案，如1、5; 2、 6.....
                if ((i + stime) % 4 != 0) {
                    ctx.fillRect(60, -4, 20, 8);
                }
                ctx.rotate(PI2 / 8);
            }
        }, time)
        // 9個圓形排成九宮格
        drawBlock({ x: 1, y: 0 }, color.red, function () {
            ctx.scale(0.8, 0.8);// 縮放0.8倍  注意放的位置
            ctx.translate(-120, -120);
            for (var i = 0; i < 3; i++) {
                ctx.translate(60, 0);
                ctx.save();
                for (var o = 0; o < 3; o++) {
                    ctx.translate(0, 60);
                    ctx.beginPath();
                    ctx.arc(0, 0, 20, 0, PI2);
                    ctx.fillStyle = color.white
                    // 隨機填色
                    if ((i + o * 2 + stime) % 5 == 0) {
                        ctx.fillStyle = color.yellow;
                    }
                    ctx.fill();
                }
                ctx.restore();
            }
        }, time)
        // 風扇
        drawBlock({ x: 2, y: 0 }, color.yellow, function () {
            for (let i = 0; i < 4; i++) {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(80, 20);
                ctx.lineTo(80, 80);
                ctx.closePath();
                ctx.fillStyle = "white";
                ctx.fill();
                if (stime % 4 == i) {
                    ctx.beginPath();
                    ctx.arc(60, 40, 6, 0, PI2);
                    ctx.fillStyle = color.red;
                    ctx.fill();
                }

                ctx.rotate(PI / 2);
            }
        }, time)
        drawBlock({ x: 0, y: 1 }, color.yellow, function () { }, time)
        drawBlock({ x: 1, y: 1 }, color.white, function () { }, time)
        drawBlock({ x: 2, y: 1 }, color.blue, function () { }, time)
        drawBlock({ x: 0, y: 2 }, color.red, function () { }, time)
        drawBlock({ x: 1, y: 2 }, color.blue, function () { }, time)
        drawBlock({ x: 2, y: 2 }, color.yellow, function () { }, time)
        // 似setTimeout
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);





}