// --- DOM Element References ---
const airfoilSelect = document.getElementById('airfoil-select');
const canvas = document.getElementById('airfoil-canvas');
const ctx = canvas.getContext('2d');

let lastParsedPoints = [];

/**
 * Parses airfoil data from a string.
 * @param {string} data - The string content of the .dat file.
 * @returns {{points: {x: number, y: number}[], errorCount: number}|null} - The parsed points array or null on failure.
 */
function parseAirfoilDat(data) {
    const points = [];
    let lineCount = 0;
    let errorCount = 0;

    const lines = data.split(/\r?\n/);

    for (const line of lines) {
        lineCount++;
        const trimmed = line.trim();

        // Skip empty lines and comments
        if (trimmed === '' || trimmed.startsWith('#') || trimmed.startsWith(';')) {
            continue;
        }
        
        // The first line might be the name, but we often ignore it and use the user-provided one.
        // Some formats have coordinate counts, which we can also ignore by checking for non-numeric parts.
        const parts = trimmed.split(/\s+/);
        
        if (parts.length >= 2) {
            const x = parseFloat(parts[0]);
            const y = parseFloat(parts[1]);

            if (!isNaN(x) && !isNaN(y)) {
                points.push({ x, y });
            } else {
                // This might be a header line like "NACA 2412" or a line with text.
                // We don't count it as a hard error if it's early in the file.
                if(points.length > 0) { // Only count as error if we've already started parsing points
                   errorCount++;
                }
            }
        } else if (trimmed !== '') {
            errorCount++;
        }
    }
    
    if (points.length === 0) {
        return null;
    }

    return { points, errorCount };
}

/**
 * Draws the airfoil shape on the canvas.
 * @param {{x: number, y: number}[]} points - An array of airfoil coordinates.
 */
function drawAirfoil(points) {
    if (!points || points.length === 0) {
        // Clear canvas if no points
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    };

    // Ensure canvas has a resolution for drawing
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Find data bounds to scale and center the drawing
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    points.forEach(p => {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y);
    });

    const dataWidth = maxX - minX;
    const dataHeight = maxY - minY;

    // Add padding
    const padding = 50;
    const canvasWidth = canvas.width - 2 * padding;
    const canvasHeight = canvas.height - 2 * padding;

    // Calculate scale factor, keeping aspect ratio
    const scaleX = canvasWidth / dataWidth;
    const scaleY = canvasHeight / dataHeight;
    const scale = Math.min(scaleX, scaleY) * 0.9; // Use 90% of available space

    const offsetX = padding + (canvasWidth - dataWidth * scale) / 2;
    const offsetY = padding + (canvasHeight - dataHeight * scale) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = '#0ea5e9'; // A nice blue color
    ctx.lineWidth = 2;

    points.forEach((p, index) => {
        // Transform point from data coordinates to canvas coordinates
        const canvasX = (p.x - minX) * scale + offsetX;
        const canvasY = canvas.height - ((p.y - minY) * scale + offsetY); // Flip Y-axis

        if (index === 0) {
            ctx.moveTo(canvasX, canvasY);
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    });

    ctx.stroke();
    
    // Optional: Draw chord line
    const startPoint = points[0];
    const endPoint = points[points.length - 1];
    if (Math.abs(startPoint.y - endPoint.y) < 0.01) { // Heuristic for closed trailing edge
         ctx.closePath();
         ctx.fillStyle = 'rgba(14, 165, 233, 0.1)';
         ctx.fill();
    }
}

// --- Event Listeners ---
airfoilSelect.addEventListener('change', async (event) => {
    const selectedAirfoil = event.target.value;
    if (!selectedAirfoil) {
        // Clear canvas if no selection
        lastParsedPoints = [];
        drawAirfoil([]);
        return;
    }

    try {
        const response = await fetch(`./assets/airfoil-simulation/${selectedAirfoil}.dat`);
        if (!response.ok) {
            throw new Error(`Failed to load airfoil data: ${response.statusText}`);
        }
        
        const data = await response.text();
        const result = parseAirfoilDat(data);
        if (result) {
            lastParsedPoints = result.points;
            drawAirfoil(lastParsedPoints);
        } else {
            lastParsedPoints = [];
            drawAirfoil([]); // Clear canvas on error
        }
    } catch (error) {
        console.error(`Error loading airfoil data: ${error.message}`);
        lastParsedPoints = [];
        drawAirfoil([]);
    }
});

// Redraw on window resize
window.addEventListener('resize', () => {
    drawAirfoil(lastParsedPoints);
});
