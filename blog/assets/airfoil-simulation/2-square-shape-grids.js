function drawSquareShapeWithGridsAroundIt(ctx, width, height, gridSize) {
    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Define main (inner) square size and position
    const mainSquareSize = width * 0.5; // 50% of canvas size
    const mainSquareX = (width - mainSquareSize) / 2;
    const mainSquareY = (height - mainSquareSize) / 2;

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

    // Draw the main square (white background) in the center
    ctx.fillStyle = 'white';
    ctx.fillRect(mainSquareX, mainSquareY, mainSquareSize, mainSquareSize);

    // Draw border for the main square
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 2;
    ctx.strokeRect(mainSquareX, mainSquareY, mainSquareSize, mainSquareSize);

    // Draw smaller grid OUTSIDE the main square
    ctx.strokeStyle = '#b0b0b0';
    ctx.lineWidth = 1;

    // Top region
    for (let y = 0; y < mainSquareY; y += gridSize) {
        for (let x = 0; x <= width; x += gridSize) {
            ctx.beginPath();
            ctx.rect(x, y, gridSize, gridSize);
            ctx.stroke();
        }
    }
    // Bottom region
    for (let y = mainSquareY + mainSquareSize; y < height; y += gridSize) {
        for (let x = 0; x <= width; x += gridSize) {
            ctx.beginPath();
            ctx.rect(x, y, gridSize, gridSize);
            ctx.stroke();
        }
    }
    // Left region
    for (let y = mainSquareY; y < mainSquareY + mainSquareSize; y += gridSize) {
        for (let x = 0; x < mainSquareX; x += gridSize) {
            ctx.beginPath();
            ctx.rect(x, y, gridSize, gridSize);
            ctx.stroke();
        }
    }
    // Right region
    for (let y = mainSquareY; y < mainSquareY + mainSquareSize; y += gridSize) {
        for (let x = mainSquareX + mainSquareSize; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.rect(x, y, gridSize, gridSize);
            ctx.stroke();
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('square-shape-grids');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const width = 400;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    // Draw the square shape with grids
    drawSquareShapeWithGridsAroundIt(ctx, width, height, 20);
});

document.addEventListener('resize', () => {
    const canvas = document.getElementById('square-shape-grids');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const width = 400;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    // Redraw the square shape with grids
    drawSquareShapeWithGridsAroundIt(ctx, width, height, 20);
});
