// <!-- Mouse Follow Clock 3 from Rainbow Arch -->
// <!-- This script and many more from : -->
// <!-- rainbow.arch.scriptmania.com -->

// <!-- Mouse Follow Clock 3 from http://rainbow.arch.scriptmania.com
// //Hide from older browsers 
// if (document.getElementById&&!document.layers){
// -->

// <!--Clock colours-->
dCol = '#fff'; //date colour.
fCol = '#fff'; //face colour.
sCol = '#fff'; //seconds colour.
mCol = '#fff'; //minutes colour.
hCol = '#fff'; //hours colour.

// <!--Controls-->
del = 0.75; //Follow mouse speed.
ref = 30; //Run speed (timeout).

// <!--Alter nothing below! Alignments will be lost! -->
var ieType = (typeof window.innerWidth != 'number');
var docComp = (document.compatMode);
var docMod = (docComp && docComp.indexOf("CSS") != -1);
var ieRef = (ieType && docMod) ?
  document.documentElement : document.body;
theDays = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
theMonths = new Array("1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月");
date = new Date();
day = date.getDate();
year = date.getYear();
if (year < 2000) year = year + 1900;
tmpdate = "•" + year + "年" + "•" + theMonths[date.getMonth()] + "•" + day + "日" + "•" + theDays[date.getDay()];
D = tmpdate.split("");
N = '3 4 5 6 7 8 9 10 11 12 1 2';
N = N.split(" ");
F = N.length;
H = '...';
H = H.split("");
M = '....';
M = M.split("");
S = '.....';
S = S.split("");
siz = 35;
eqf = 360 / F;
eqd = 360 / D.length;
han = siz / 5;
ofy = -7;
ofx = -3;
ofst = 70;
tmr = null;
vis = true;
mouseY = 0;
mouseX = 0;
dy = new Array();
dx = new Array();
zy = new Array();
zx = new Array();
tmps = new Array();
tmpm = new Array();
tmph = new Array();
tmpf = new Array();
tmpd = new Array();
var sum = parseInt(D.length + F + H.length + M.length + S.length) + 1;
for (i = 0; i < sum; i++) {
  dy[i] = 0;
  dx[i] = 0;
  zy[i] = 0;
  zx[i] = 0;
}

algn = new Array();
for (i = 0; i < D.length; i++) {
  algn[i] = (parseInt(D[i]) || D[i] == 0) ? 10 : 9;
  document.write('<div id="_date' + i + '" class="cursor2" style="font-size:' + algn[i] + 'px;color:' + dCol + '">' + D[i] + '<\/div>');
  tmpd[i] = document.getElementById("_date" + i).style;
}
for (i = 0; i < F; i++) {
  document.write('<div id="_face' + i + '" class="cursor2" style="color:' + fCol + '">' + N[i] + '<\/div>');
  tmpf[i] = document.getElementById("_face" + i).style;
}
for (i = 0; i < H.length; i++) {
  document.write('<div id="_hours' + i + '" class="cursor1" style="color:' + hCol + '">' + H[i] + '<\/div>');
  tmph[i] = document.getElementById("_hours" + i).style;
}
for (i = 0; i < M.length; i++) {
  document.write('<div id="_minutes' + i + '" class="cursor1" style="color:' + mCol + '">' + M[i] + '<\/div>');
  tmpm[i] = document.getElementById("_minutes" + i).style;
}
for (i = 0; i < S.length; i++) {
  document.write('<div id="_seconds' + i + '" class="cursor1" style="color:' + sCol + '">' + S[i] + '<\/div>');
  tmps[i] = document.getElementById("_seconds" + i).style;
}

function onoff() {
  if (vis) {
    vis = false;
    document.getElementById("control").value = "Clock On";
  } else {
    vis = true;
    document.getElementById("control").value = "Clock Off";
    Delay();
  }
  kill();
}

function kill() {
  if (vis)
    document.onmousemove = mouse;
  else
    document.onmousemove = null;
}

function mouse(e) {
  var msy = (!ieType) ? window.pageYOffset : 0;
  if (!e) e = window.event;
  if (typeof e.pageY == 'number') {
    mouseY = e.pageY + ofst - msy;
    mouseX = e.pageX + ofst;
  } else {
    mouseY = e.clientY + ofst - msy;
    mouseX = e.clientX + ofst;
  }
  if (!vis) kill();
}
document.onmousemove = mouse;

function winDims() {
  winH = (ieType) ? ieRef.clientHeight : window.innerHeight;
  winW = (ieType) ? ieRef.clientWidth : window.innerWidth;
}
winDims();
window.onresize = new Function("winDims()");

function ClockAndAssign() {
  time = new Date();
  secs = time.getSeconds();
  sec = Math.PI * (secs - 15) / 30;
  mins = time.getMinutes();
  min = Math.PI * (mins - 15) / 30;
  hrs = time.getHours();
  hr = Math.PI * (hrs - 3) / 6 + Math.PI * parseInt(time.getMinutes()) / 360;

  for (i = 0; i < S.length; i++) {
    tmps[i].top = dy[D.length + F + H.length + M.length + i] + ofy + (i * han) * Math.sin(sec) + scrollY + "px";
    tmps[i].left = dx[D.length + F + H.length + M.length + i] + ofx + (i * han) * Math.cos(sec) + "px";
  }
  for (i = 0; i < M.length; i++) {
    tmpm[i].top = dy[D.length + F + H.length + i] + ofy + (i * han) * Math.sin(min) + scrollY + "px";
    tmpm[i].left = dx[D.length + F + H.length + i] + ofx + (i * han) * Math.cos(min) + "px";
  }
  for (i = 0; i < H.length; i++) {
    tmph[i].top = dy[D.length + F + i] + ofy + (i * han) * Math.sin(hr) + scrollY + "px";
    tmph[i].left = dx[D.length + F + i] + ofx + (i * han) * Math.cos(hr) + "px";
  }
  for (i = 0; i < F; i++) {
    tmpf[i].top = dy[D.length + i] + siz * Math.sin(i * eqf * Math.PI / 180) + scrollY + "px";
    tmpf[i].left = dx[D.length + i] + siz * Math.cos(i * eqf * Math.PI / 180) + "px";
  }
  for (i = 0; i < D.length; i++) {
    tmpd[i].top = dy[i] + siz * 1.5 * Math.sin(-sec + i * eqd * Math.PI / 180) + scrollY + "px";
    tmpd[i].left = dx[i] + siz * 1.5 * Math.cos(-sec + i * eqd * Math.PI / 180) + "px";
  }
  if (!vis) clearTimeout(tmr);
}

buffW = (ieType) ? 80 : 90;

function Delay() {
  scrollY = (ieType) ? ieRef.scrollTop : window.pageYOffset;
  if (!vis) {
    dy[0] = -100;
    dx[0] = -100;
  } else {
    zy[0] = Math.round(dy[0] += ((mouseY) - dy[0]) * del);
    zx[0] = Math.round(dx[0] += ((mouseX) - dx[0]) * del);
  }
  for (i = 1; i < sum; i++) {
    if (!vis) {
      dy[i] = -100;
      dx[i] = -100;
    } else {
      zy[i] = Math.round(dy[i] += (zy[i - 1] - dy[i]) * del);
      zx[i] = Math.round(dx[i] += (zx[i - 1] - dx[i]) * del);
    }
    if (dy[i - 1] >= winH - 80) dy[i - 1] = winH - 80;
    if (dx[i - 1] >= winW - buffW) dx[i - 1] = winW - buffW;
  }

  tmr = setTimeout('Delay()', ref);
  ClockAndAssign();
}
window.onload = Delay;





(function() {
  const canvas = document.getElementById("lines");
  const ctx = canvas.getContext("2d");
  let width;
  let height;
  class Line {
    constructor(origin, size, length, color, style = "pattern") {
      this.size = size;
      this.origin = origin;
      this.length = length;
      this.color = color;
      this.style = style;
      this.origin = `M${origin.x},${origin.y}`;
      this.offSet = 0;
      this.line = null;
      this.offSetSpeed = length / size;
    }
    getColorString() {
      return `hsla(${this.color.h}deg,${this.color.s}%,${this.color.l}%,${this.color.a})`;
    }
    generators() {
      return [{
          line: `h${this.size}`,
          mag: this.size
        },
        {
          line: `h-${this.size}`,
          mag: this.size
        },
        {
          line: `v${this.size}`,
          mag: this.size
        },
        {
          line: `v-${this.size}`,
          mag: this.size
        },
        {
          line: `l${this.size},${this.size}`,
          mag: Math.hypot(this.size, this.size)
        },
        {
          line: `l${this.size}-${this.size}`,
          mag: Math.hypot(this.size, this.size)
        },
        {
          line: `l-${this.size},${this.size}`,
          mag: Math.hypot(this.size, this.size)
        },
        {
          line: `l-${this.size}-${this.size}`,
          mag: Math.hypot(this.size, this.size)
        }
      ];
    }
    generate() {
      let segments = this.generators(this.size);
      let path = this.origin;
      let mag = 0;
      let fragment;
      let i;
      for (i = 0; i < this.length; i += 1) {
        fragment = segments[(Math.random() * segments.length) | 0];
        path += ` ${fragment.line}`;
        mag += fragment.mag;
      }
      this.line = {
        path,
        mag
      };
      return this;
    }
    renderStyle(style) {
      if (style === "glitches") {
        ctx.lineDashOffset = this.line.mag + this.offSet;
        ctx.setLineDash([
          this.size ** 1.5,
          (this.line.mag / this.length) * this.size ** 2
        ]);
        this.offSet += 20;
        // this.size / (this.size ** 2);
        ctx.lineWidth = 2;
        return this;
      }
      if (style === "pattern") {
        ctx.lineDashOffset = this.line.mag - this.offSet;
        ctx.setLineDash([this.line.mag, this.line.mag]);
        this.offSet += 10;
        //this.size / (this.size ** 100);
        ctx.lineWidth = 0.2;
      }
    }
    mutatePath() {
      let lineFragment = this.line.path.split(" ").slice(1);
      let generator = this.generators();
      lineFragment[(Math.random() * lineFragment.length) | 0] =
        generator[(Math.random() * generator.length) | 0].line;
      this.line.path = `${this.line.path.split(" ")[0]} ${lineFragment.join(
        " "
      )}`;
    }
    draw() {
      !this.line && this.generate();

      ctx.strokeStyle = this.getColorString();
      this.renderStyle(this.style);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke(new Path2D(this.line.path));
      return this;
    }
  }

  function clear() {
    ctx.fillStyle = `hsla(200deg, 20%, 10%, 0.3)`;
    ctx.fillRect(0, 0, width, height);
  }

  function generateLines(amount) {
    let lines = [];
    let styles = [{
        size: 1.25,
        style: "pattern",
        color: {
          h: 210,
          s: 100,
          l: 70,
          a: 0.5
        }
      },
      {
        size: 2.5,
        style: "pattern",
        color: {
          h: 190,
          s: 90,
          l: 50,
          a: 0.3
        }
      },
      {
        size: 5,
        style: "pattern",
        color: {
          h: 210,
          s: 70,
          l: 60,
          a: 0.2
        }
      },
      {
        size: 10,
        style: "pattern",
        color: {
          h: 310,
          s: 80,
          l: 55,
          a: 0.15
        }
      },
      {
        size: 20,
        style: "pattern",
        color: {
          h: 200,
          s: 25,
          l: 35,
          a: 0.12
        }
      },
      {
        size: 20,
        style: "pattern",
        color: {
          h: 210,
          s: 20,
          l: 40,
          a: 0.12
        }
      },
      {
        size: 40,
        style: "pattern",
        color: {
          h: 190,
          s: 40,
          l: 50,
          a: 0.12
        }
      },
      {
        size: 80,
        style: "pattern",
        color: {
          h: 220,
          s: 50,
          l: 60,
          a: 0.12
        }
      },
      {
        size: 40,
        style: "glitches",
        color: {
          h: 300,
          s: 100,
          l: 50,
          a: 0.3
        }
      },
      {
        size: 20,
        style: "glitches",
        color: {
          h: 210,
          s: 100,
          l: 50,
          a: 0.3
        }
      },
      {
        size: 60,
        style: "glitches",
        color: {
          h: 30,
          s: 100,
          l: 50,
          a: 0.3
        }
      }
    ];
    for (let i = 0; i < amount; i += 1) {
      let style = styles[(Math.random() ** 2 * styles.length) | 0];
      lines.push(
        new Line({
            x: width * 0.5,
            y: height * 0.5
          },
          style.size,
          500 + Math.random() * 1000,
          style.color,
          style.style
        )
      );
    }
    return lines;
  }
  let id;

  function resize() {
    id = cancelAnimationFrame(id);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const lines = generateLines(40);

    function update() {
      if (!(id % 3)) {
        clear();
        lines.forEach((line) => {
          line.draw();
          if (!(id % 5) && Math.random() > 0.95) {
            line.mutatePath();
          }
        });
      }
      id = requestAnimationFrame(update);
    }
    id = requestAnimationFrame(update);
  }
  window.addEventListener("resize", resize, {
    passive: true
  });
  resize();
})();