function drawCircleShapeWithGridsAroundIt(ctx, width, height, gridSize) {
    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Define main (inner) circle size and position
    const mainCircleDiameter = width * 0.5; // 50% of canvas size
    const mainCircleRadius = mainCircleDiameter / 2;
    const mainCircleCenterX = width / 2;
    const mainCircleCenterY = height / 2;

    // Draw the computational domain grid (outer grid)
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    // Draw the main circle (white background) in the center
    ctx.save();
    ctx.beginPath();
    ctx.arc(mainCircleCenterX, mainCircleCenterY, mainCircleRadius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
    // Draw border for the main circle
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#111111';
    ctx.stroke();
    ctx.restore();

    // Draw smaller grid OUTSIDE the main circle
    ctx.strokeStyle = '#b0b0b0';
    ctx.lineWidth = 1;

    for (let y = 0; y < height; y += gridSize) {
        for (let x = 0; x < width; x += gridSize) {
            // Calculate the center of the current grid cell
            const cellCenterX = x + gridSize / 2;
            const cellCenterY = y + gridSize / 2;
            // Check if the cell is outside the main circle
            const dx = cellCenterX - mainCircleCenterX;
            const dy = cellCenterY - mainCircleCenterY;
            if (dx * dx + dy * dy >= mainCircleRadius * mainCircleRadius) {
                ctx.beginPath();
                ctx.rect(x, y, gridSize, gridSize);
                ctx.stroke();
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('circle-shape-grids');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const width = 400;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    // Draw the circle shape with grids
    drawCircleShapeWithGridsAroundIt(ctx, width, height, 20);
});

// Remove the resize event listener for 'square-shape-grids' since it's not used
