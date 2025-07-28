/**
 * Draws a circle shape with polar grids on a canvas.
 * 
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {number} width - The width of the canvas.
 * @param {number} height - The height of the canvas.
 * @param {number} radialStep - The step size for radial divisions (in pixels).
 * @param {number} angularStepDegrees - The step size for angular divisions (in degrees
 */
function drawCircleShapeWithPolarGrids(ctx, width, height, radialStep, angularStepDegrees) {
    /**
     * Draws an arrow on the canvas.
     * @param {number} fromX - The starting x-coordinate.
     * @param {number} fromY - The starting y-coordinate.
     * @param {number} toX - The ending x-coordinate.
     * @param {number} toY - The ending y-coordinate.
     */
    function drawArrow(fromX, fromY, toX, toY) {
        const headLength = 10; // length of head in pixels
        const dx = toX - fromX;
        const dy = toY - fromY;
        const angle = Math.atan2(dy, dx);
        
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
    }

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

    console.log({mainCircleCenterX, mainCircleCenterY, mainCircleRadius, maxRadius});

    // Draw a cartesian axis in the center just to help visualize the circular grid
    ctx.strokeStyle = '#000000ff';
    ctx.lineWidth = 1;

    const axisLength = 30;

    // Draw vertical axis with arrow
    drawArrow(mainCircleCenterX, mainCircleCenterY, mainCircleCenterX, mainCircleCenterY - axisLength);

    // Draw horizontal axis with arrow
    drawArrow(mainCircleCenterX, mainCircleCenterY, mainCircleCenterX + axisLength, mainCircleCenterY);

    // Draw axis labels
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('x', mainCircleCenterX + axisLength + 8, mainCircleCenterY);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('y', mainCircleCenterX, mainCircleCenterY - axisLength - 8);

    // Draw a polar axis on the surface of the main circle
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;

    axisLocationOffset = 100

    // draw the "r" axis with arrow
    drawArrow(
        mainCircleCenterX + axisLocationOffset,
        mainCircleCenterY,
        mainCircleCenterX + axisLocationOffset + axisLength,
        mainCircleCenterY
    );

    // draw the "θ" axis (arc)
    ctx.beginPath();
    ctx.arc(
        mainCircleCenterX,
        mainCircleCenterY,
        mainCircleRadius,
        Math.PI * 2, // start angle (90 degrees)
        Math.PI * 2 - Math.PI / 10, // end angle (135 degrees)
        true,
    );

    ctx.stroke();
    // draw the arrow line after the arc
    ctx.beginPath();
    ctx.moveTo(
        mainCircleCenterX + axisLocationOffset - 4,
        mainCircleCenterY - 28
    );
    ctx.lineTo(
        mainCircleCenterX + axisLocationOffset + 7,
        mainCircleCenterY - 17
    );
    ctx.moveTo(
        mainCircleCenterX + axisLocationOffset - 4,
        mainCircleCenterY - 28
    );
    ctx.lineTo(
        mainCircleCenterX + axisLocationOffset - 7,
        mainCircleCenterY - 14
    ); 
    ctx.stroke();
    // drawArrow(
    //     mainCircleCenterX + axisLocationOffset + axisLength,
    //     mainCircleCenterY,
    //     mainCircleCenterX + axisLocationOffset + axisLength + 30 * Math.cos(Math.PI / 4),
    //     mainCircleCenterY - 30 * Math.sin(Math.PI / 4)
    // );
    // fill text with "r" and "θ"
    ctx.fillStyle = 'blue';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('r', mainCircleCenterX + axisLocationOffset + axisLength + 3, mainCircleCenterY);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('𝜃', mainCircleCenterX + axisLocationOffset + 5,
        mainCircleCenterY - 30 * Math.sin(Math.PI / 4) - 5
    );

    ctx.beginPath();
    ctx.stroke();
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('circle-shape-grids-polar'));
    const ctx = canvas.getContext('2d');

    const width = 400;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    // Draw the circle shape with polar grids
    drawCircleShapeWithPolarGrids(ctx, width, height, 20, 15); // 20px radial, 15° angular
});
