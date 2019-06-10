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
    /* 想法
    drawBlock({ x: 0, y: 0 }, color.blue, function () {
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, PI2);
        ctx.fillStyle = "white";
        ctx.fill();
    }, 0)
*/





}