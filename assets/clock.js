(function () {
    const del = 0.6;
    const ref = 30;

    let date = new Date();
    let nDate = date.getDate();
    let year = date.getFullYear();
    const theMonths = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    const theDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

    let dateStr = `•${year}年•${theMonths[date.getMonth()]}•${nDate}日•${theDays[date.getDay()]}`;
    let dateArr = dateStr.split("");
    let faceArr = "3 4 5 6 7 8 9 10 11 12 1 2".split(" ");
    let hourArr = "...".split("");
    let minArr = "....".split("");
    let secArr = ".....".split("");

    let D = [], F = [], H = [], M = [], S = [];

    let mouseX = 0, mouseY = 0;
    let dy = [], dx = [], zy = [], zx = [];

    const siz = 35;
    const eqf = 360 / faceArr.length;
    const eqd = 360 / dateArr.length;
    const han = siz / 5.5;

    function createSpan(text, className) {
        let span = document.createElement("div");
        span.innerHTML = text;
        span.className = className;
        document.body.appendChild(span);
        return span;
    }

    function init() {
        for (let i = 0; i < dateArr.length; i++) D[i] = createSpan(dateArr[i], "clock-char clock-date");
        for (let i = 0; i < faceArr.length; i++) F[i] = createSpan(faceArr[i], "clock-char clock-face");
        for (let i = 0; i < hourArr.length; i++) H[i] = createSpan(hourArr[i], "clock-char clock-time");
        for (let i = 0; i < minArr.length; i++) M[i] = createSpan(minArr[i], "clock-char clock-time");
        for (let i = 0; i < secArr.length; i++) S[i] = createSpan(secArr[i], "clock-char clock-time");

        let sum = dateArr.length + faceArr.length + hourArr.length + minArr.length + secArr.length;
        for (let i = 0; i < sum; i++) {
            dy[i] = 0; dx[i] = 0; zy[i] = 0; zx[i] = 0;
        }

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        animate();
    }

    function animate() {
        const offsetX = 60;
        const offsetY = 60;

        zy[0] = Math.round(dy[0] += (mouseY + offsetY - dy[0]) * del);
        zx[0] = Math.round(dx[0] += (mouseX + offsetX - dx[0]) * del);

        let totalElements = D.concat(F, H, M, S);

        for (let i = 1; i < totalElements.length; i++) {
            zy[i] = Math.round(dy[i] += (zy[i - 1] - dy[i]) * del);
            zx[i] = Math.round(dx[i] += (zx[i - 1] - dx[i]) * del);
        }

        let time = new Date();
        let secs = time.getSeconds();
        let sec = -1.57 + Math.PI * secs / 30;
        let mins = time.getMinutes();
        let min = -1.57 + Math.PI * mins / 30;
        let hrs = time.getHours();
        let hr = -1.57 + Math.PI * hrs / 6 + Math.PI * parseInt(time.getMinutes()) / 360;

        for (let i = 0; i < D.length; i++) {
            D[i].style.top = dy[i] + siz * 1.5 * Math.sin(-sec + i * eqd * Math.PI / 180) + "px";
            D[i].style.left = dx[i] + siz * 1.5 * Math.cos(-sec + i * eqd * Math.PI / 180) + "px";
        }

        let offsetBase = D.length;
        for (let i = 0; i < F.length; i++) {
            F[i].style.top = dy[offsetBase + i] + siz * Math.sin(i * eqf * Math.PI / 180) + "px";
            F[i].style.left = dx[offsetBase + i] + siz * Math.cos(i * eqf * Math.PI / 180) + "px";
        }

        offsetBase += F.length;
        for (let i = 0; i < H.length; i++) {
            H[i].style.top = dy[offsetBase + i] + (i * han) * Math.sin(hr) + "px";
            H[i].style.left = dx[offsetBase + i] + (i * han) * Math.cos(hr) + "px";
        }

        offsetBase += H.length;
        for (let i = 0; i < M.length; i++) {
            M[i].style.top = dy[offsetBase + i] + (i * han) * Math.sin(min) + "px";
            M[i].style.left = dx[offsetBase + i] + (i * han) * Math.cos(min) + "px";
        }

        offsetBase += M.length;
        for (let i = 0; i < S.length; i++) {
            S[i].style.top = dy[offsetBase + i] + (i * han) * Math.sin(sec) + "px";
            S[i].style.left = dx[offsetBase + i] + (i * han) * Math.cos(sec) + "px";
        }

        requestAnimationFrame(animate);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();