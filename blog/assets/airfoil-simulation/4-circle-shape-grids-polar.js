function drawCircleShapeWithPolarGrids(ctx, width, height, radialStep, angularStepDegrees) {
    ctx.clearRect(0, 0, width, height);

    // Define main (inner) circle size and position
    const mainCircleDiameter = width * 0.5;
    const mainCircleRadius = mainCircleDiameter / 2;
    const mainCircleCenterX = width / 2;
    const mainCircleCenterY = height / 2;

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

    // Draw concentric circles (radial divisions) outside the main circle
    ctx.strokeStyle = '#b0b0b0';
    ctx.lineWidth = 1;
    const maxRadius = Math.min(width, height) / 2;
    for (let r = mainCircleRadius + radialStep; r <= maxRadius; r += radialStep) {
        ctx.beginPath();
        ctx.arc(mainCircleCenterX, mainCircleCenterY, r, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // Draw angular divisions (lines from center outwards)
    for (let angle = 0; angle < 360; angle += angularStepDegrees) {
        const rad = angle * Math.PI / 180;
        const x1 = mainCircleCenterX + mainCircleRadius * Math.cos(rad);
        const y1 = mainCircleCenterY + mainCircleRadius * Math.sin(rad);
        const x2 = mainCircleCenterX + maxRadius * Math.cos(rad);
        const y2 = mainCircleCenterY + maxRadius * Math.sin(rad);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('circle-shape-grids-polar');
    const ctx = canvas.getContext('2d');

    const width = 400;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    // Draw the circle shape with polar grids
    drawCircleShapeWithPolarGrids(ctx, width, height, 20, 15); // 20px radial, 15° angular
});
