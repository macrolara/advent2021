{
    var readline = require('readline');
    var grid_1 = [];
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    rl.on('line', function (line) {
        grid_1.push(line.split('').map(function (v) { return +v; }));
    });
    function getNeighbors2(point) {
        var points = [];
        if (point.y > 0) {
            if (point.x > 0 && grid_1[point.y - 1][point.x - 1] !== 0)
                points.push({ y: point.y - 1, x: point.x - 1 });
            if (grid_1[point.y - 1][point.x] !== 0)
                points.push({ y: point.y - 1, x: point.x });
            if (point.x < grid_1[0].length - 1 && grid_1[point.y - 1][point.x + 1] !== 0)
                points.push({ y: point.y - 1, x: point.x + 1 });
        }
        if (point.y < grid_1.length - 1) {
            if (point.x > 0 && grid_1[point.y + 1][point.x - 1] !== 0)
                points.push({ y: point.y + 1, x: point.x - 1 });
            if (grid_1[point.y + 1][point.x] !== 0)
                points.push({ y: point.y + 1, x: point.x });
            if (point.x < grid_1[0].length - 1 && grid_1[point.y + 1][point.x + 1] !== 0)
                points.push({ y: point.y + 1, x: point.x + 1 });
        }
        if (point.x > 0 && grid_1[point.y][point.x - 1] !== 0)
            points.push({ y: point.y, x: point.x - 1 });
        if (point.x < grid_1[0].length - 1 && grid_1[point.y][point.x + 1] !== 0)
            points.push({ y: point.y, x: point.x + 1 });
        return points;
    }
    function flash2(point, total) {
        total.count++;
        grid_1[point.y][point.x] = 0;
        var next = getNeighbors2(point);
        next.forEach(function (n) { grid_1[n.y][n.x]++; });
        next.forEach(function (n) { if (grid_1[n.y][n.x] > 9)
            flash2(n, total); });
    }
    rl.on('close', function () {
        var total = { count: 0 };
        var count = 0, flashed;
        do {
            flashed = total.count;
            for (var y = 0; y < grid_1.length; y++)
                for (var x = 0; x < grid_1[0].length; x++)
                    grid_1[y][x]++;
            for (var y = 0; y < grid_1.length; y++)
                for (var x = 0; x < grid_1[0].length; x++) {
                    if (grid_1[y][x] > 9) {
                        flash2({ y: y, x: x }, total);
                    }
                }
            count++;
        } while (total.count - flashed < grid_1.length * grid_1[0].length);
        console.log(count);
    });
}
