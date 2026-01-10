(function () {
    const canvas = document.getElementById("lines");
    const ctx = canvas.getContext("2d");

    let width, height;
    let cols, rows;
    const resolution = 8;
    let grid;
    let nextGrid;
    let animationId;
    let colorConfig = {};

    function updateColors() {
        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (isDarkMode) {
            colorConfig = {
                cell: '#9ecaff'
            };
        } else {
            colorConfig = {
                cell: '#0061a4'
            };
        }
    }

    function make2DArray(cols, rows) {
        let arr = new Array(cols);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);
        }
        return arr;
    }

    function initGrid() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        cols = Math.ceil(width / resolution);
        rows = Math.ceil(height / resolution);

        grid = make2DArray(cols, rows);
        nextGrid = make2DArray(cols, rows);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = Math.random() < 0.08 ? 1 : 0;
            }
        }
    }

    function countNeighbors(grid, x, y) {
        let sum = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let col = (x + i + cols) % cols;
                let row = (y + j + rows) % rows;
                sum += grid[col][row];
            }
        }
        sum -= grid[x][y];
        return sum;
    }

    function draw() {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, width, height);

        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = colorConfig.cell;

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (grid[i][j] === 1) {
                    let x = i * resolution;
                    let y = j * resolution;
                    ctx.beginPath();
                    ctx.rect(x, y, resolution - 1, resolution - 1);
                    ctx.fill();
                }
            }
        }

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j];
                let neighbors = countNeighbors(grid, i, j);

                if (state === 0 && neighbors === 3) {
                    nextGrid[i][j] = 1;
                } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                    nextGrid[i][j] = 0;
                } else {
                    nextGrid[i][j] = state;
                }
            }
        }

        let temp = grid;
        grid = nextGrid;
        nextGrid = temp;
    }

    function loop() {
        draw();
        setTimeout(() => {
            animationId = requestAnimationFrame(loop);
        }, 50);
    }

    function addLifeAt(x, y) {
        if (!grid) return;

        let col = Math.floor(x / resolution);
        let row = Math.floor(y / resolution);

        if (col >= 0 && col < cols && row >= 0 && row < rows) {
            let extent = 1;
            for (let i = -extent; i <= extent; i++) {
                for (let j = -extent; j <= extent; j++) {
                    let c = (col + i + cols) % cols;
                    let r = (row + j + rows) % rows;
                    if (Math.random() > 0.5) {
                        grid[c][r] = 1;
                    }
                }
            }
        }
    }

    window.addEventListener('mousemove', (e) => {
        addLifeAt(e.clientX, e.clientY);
    });

    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            addLifeAt(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    window.addEventListener('resize', () => {
        cancelAnimationFrame(animationId);
        initGrid();
        loop();
    });

    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            updateColors();
        });
    }

    updateColors();
    initGrid();
    loop();

    setTimeout(() => {
        canvas.style.opacity = 1;
    }, 1000);

})();