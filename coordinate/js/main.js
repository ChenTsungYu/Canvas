window.onload = function () {
    const canvas = document.getElementById("mycanvas");
    const ctx = canvas.getContext('2d');
    const blockWidth = 200; // 九宮格寬度
    const PI = Math.PI;
    const PI2 = Math.PI * 2;

    // 大小為600*600九宮格 
    canvas.width = blockWidth * 3;
    canvas.height = blockWidth * 3;

    // 自訂一個畫圓的函數
    ctx.fillCircle = function (x, y, r) {
        this.beginPath();
        this.arc(x, y, r, 0, PI2);
        this.fill();
    }

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
        // 1-2
        drawBlock({ x: 0, y: 1 }, color.yellow, function () {
            ctx.translate(-60, -60); // 移至左上方
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 60, 60);
            ctx.translate(30, 30); // 移至方形中心
            ctx.rotate(-PI / 4); // 轉45度
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(40, 0);
            ctx.arc(40, 40, 40, -PI / 2, PI / 2);
            ctx.lineTo(0, 80);
            ctx.closePath();
            ctx.fillStyle = color.red;
            ctx.fill();

            // 長方型 1
            ctx.translate(-100 + 10 * Math.sin(time / 10), 60);
            ctx.fillStyle = color.blue;
            ctx.fillRect(0, 0, 100, 40);
            // 長方型  2
            ctx.translate(100 + 10 * Math.cos(time / 10), 40);
            ctx.fillStyle = color.white;
            ctx.fillRect(0, 0, 50, 20);
        }, time)
        // 2-2
        drawBlock({ x: 1, y: 1 }, color.white, function () {
            // 繪製扇形
            ctx.beginPath();
            ctx.fillStyle = color.red;

            // 旋轉效果
            // 0 ~ 100 / 100 = 0 ~ 1
            // 0 ~ 1 * 360 = 0 ~ 360
            let angle = (time % 100) / 100 * PI2; // 0~360 之間
            let angle2 = (time % 50) / 50 * PI2;
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, 80, angle, angle2);
            ctx.fill();

            // 利用自訂畫圓形的函數繪製
            ctx.fillStyle = color.yellow;
            ctx.fillCircle(60, 60, 30);
        }, time)
        drawBlock({ x: 2, y: 1 }, color.blue, function () {
            ctx.fillStyle = color.white;
            ctx.fillCircle(0, 0, 80);
            // 旋轉
            ctx.rotate(time / 10);
            ctx.fillStyle = color.red;
            ctx.fillCircle(-30, 0, 20);
            ctx.rotate(time / 20);
            ctx.fillStyle = color.yellow;
            ctx.fillCircle(40, 0, 50);


        }, time)
        drawBlock({ x: 0, y: 2 }, color.red, function () {
            ctx.rotate(time / 100);
            for (let i = 0; i < 8; i++) {
                ctx.fillStyle = color.white;
                let r = 16
                if ((stime + i) % 4 < 2) {  // 變換大小
                    r = 10
                }
                ctx.fillCircle(60, 0, r);
                ctx.rotate(PI2 / 8);
                ctx.fillStyle = color.blue;
                ctx.fillCircle(35, 0, 5);
            }
        }, time)
        drawBlock({ x: 1, y: 2 }, color.blue, function () {
            // 黃色長方形
            ctx.translate(-80, -100);
            ctx.fillStyle = color.yellow;
            ctx.fillRect(0, time % 200, 40, time % 200);
            // 紅色長方形
            ctx.translate(40, 40);
            ctx.fillStyle = color.red;
            ctx.fillRect(0, 0, 120, 80);
            ctx.fillStyle = color.white;
            // 兩個白色圓
            ctx.fillCircle(0, 40, stime % 20);
            ctx.fillCircle(70, 40, stime % 10);

            // 白色長方形
            ctx.translate(70, 80);
            ctx.fillRect(0, 0, 50, 80);

        }, time)
        drawBlock({ x: 2, y: 2 }, color.yellow, function () {
            // 左方白色三角型
            ctx.beginPath();
            ctx.moveTo(-100, -100);
            ctx.lineTo(0, -100);
            ctx.lineTo(-100, 100);
            ctx.closePath();
            ctx.fillStyle = color.white;
            ctx.fill();

            // 右方白色三角型(以中心為基準轉180度)
            ctx.rotate(PI);

            ctx.save(); // 儲存紅色三角形狀態
            ctx.translate(time % 100, 0);
            ctx.beginPath();
            ctx.moveTo(-100, -100);
            ctx.lineTo(0, -100);
            ctx.lineTo(-100, 100);
            ctx.closePath();
            ctx.fillStyle = color.red;
            ctx.fill();
            ctx.restore();

            ctx.beginPath();
            ctx.moveTo(-100, -100);
            ctx.lineTo(0, -100);
            ctx.lineTo(-100, 100);
            ctx.closePath();
            ctx.fillStyle = color.white;
            ctx.fill();

        }, time)
        // 似setTimeout
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);





}