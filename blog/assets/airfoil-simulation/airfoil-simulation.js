// --- DOM Element References ---
const airfoilSelect = document.getElementById('airfoil-select');
const canvas = document.getElementById('airfoil-canvas');
const ctx = canvas.getContext('2d');
const dataTableBody = document.getElementById('data-table-body');
const pointCount = document.getElementById('point-count');

let lastParsedPoints = [];

// --- Tab Management ---
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
            
            // Redraw canvas when switching to visualization tab
            if (targetTab === 'visualization' && lastParsedPoints.length > 0) {
                setTimeout(() => drawAirfoil(lastParsedPoints), 10);
            }
        });
    });
}

// --- Data Table Management ---
function populateDataTable(points) {
    if (!points || points.length === 0) {
        dataTableBody.innerHTML = '<tr><td colspan="3" class="no-data">No data available</td></tr>';
        pointCount.textContent = 'No data loaded';
        return;
    }

    pointCount.textContent = `${points.length} coordinate points`;
    
    const rows = points.map((point, index) => {
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${point.x.toFixed(6)}</td>
                <td>${point.y.toFixed(6)}</td>
            </tr>
        `;
    }).join('');
    
    dataTableBody.innerHTML = rows;
}

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

    // Add padding for axes and labels
    const padding = 60;
    const canvasWidth = canvas.width - 2 * padding;
    const canvasHeight = canvas.height - 2 * padding;

    // Calculate scale factor, keeping aspect ratio
    const scaleX = canvasWidth / dataWidth;
    const scaleY = canvasHeight / dataHeight;
    const scale = Math.min(scaleX, scaleY) * 0.95; // Use 95% of available space for airfoil

    const offsetX = padding + (canvasWidth - dataWidth * scale) / 2;
    const offsetY = padding + (canvasHeight - dataHeight * scale) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw axes
    drawAxes(minX, maxX, minY, maxY, scale, offsetX, offsetY);

    // Draw airfoil
    ctx.beginPath();
    ctx.strokeStyle = '#0ea5e9'; // A nice blue color
    ctx.lineWidth = 3;

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
    
    // Optional: Draw chord line and fill
    const startPoint = points[0];
    const endPoint = points[points.length - 1];
    if (Math.abs(startPoint.y - endPoint.y) < 0.01) { // Heuristic for closed trailing edge
         ctx.closePath();
         ctx.fillStyle = 'rgba(14, 165, 233, 0.1)';
         ctx.fill();
    }
}

/**
 * Draws coordinate axes with tick marks and labels
 */
function drawAxes(minX, maxX, minY, maxY, scale, offsetX, offsetY) {
    const dataWidth = maxX - minX;
    const dataHeight = maxY - minY;
    
    // Calculate axis positions
    const axisLeft = offsetX;
    const axisRight = offsetX + dataWidth * scale;
    const axisBottom = canvas.height - offsetY;
    const axisTop = canvas.height - (offsetY + dataHeight * scale);
    
    // Calculate Y=0 position for X-axis
    const zeroY = canvas.height - ((0 - minY) * scale + offsetY);
    // Calculate X=0 position for Y-axis (if X=0 is within range)
    const zeroX = minX <= 0 && maxX >= 0 ? (0 - minX) * scale + offsetX : axisLeft;
    
    // Axis style
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.font = '12px monospace';
    ctx.fillStyle = '#9ca3af';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw X-axis at Y=0 (or at bottom if Y=0 is not in range)
    const xAxisY = (minY <= 0 && maxY >= 0) ? zeroY : axisBottom;
    ctx.beginPath();
    ctx.moveTo(axisLeft - 10, xAxisY);
    ctx.lineTo(axisRight + 10, xAxisY);
    ctx.stroke();

    // Draw Y-axis at X=0 (or at left if X=0 is not in range)
    const yAxisX = (minX <= 0 && maxX >= 0) ? zeroX : axisLeft;
    ctx.beginPath();
    ctx.moveTo(yAxisX, axisBottom + 10);
    ctx.lineTo(yAxisX, axisTop - 10);
    ctx.stroke();

    // Calculate nice tick intervals
    const xTickInterval = calculateTickInterval(dataWidth);
    const yTickInterval = calculateTickInterval(dataHeight);

    // Draw X-axis ticks and labels
    const xStart = Math.ceil(minX / xTickInterval) * xTickInterval;
    for (let x = xStart; x <= maxX; x += xTickInterval) {
        const canvasX = (x - minX) * scale + offsetX;
        
        // Tick mark
        ctx.beginPath();
        ctx.moveTo(canvasX, xAxisY);
        ctx.lineTo(canvasX, xAxisY + 8);
        ctx.stroke();
        
        // Label (position below the axis)
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(x.toFixed(1), canvasX, xAxisY + 12);
    }

    // Draw Y-axis ticks and labels
    const yStart = Math.ceil(minY / yTickInterval) * yTickInterval;
    for (let y = yStart; y <= maxY; y += yTickInterval) {
        const canvasY = canvas.height - ((y - minY) * scale + offsetY);
        
        // Tick mark
        ctx.beginPath();
        ctx.moveTo(yAxisX - 8, canvasY);
        ctx.lineTo(yAxisX, canvasY);
        ctx.stroke();
        
        // Label (position to the left of the axis)
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(y.toFixed(2), yAxisX - 12, canvasY);
    }

    // Draw axis labels
    ctx.fillStyle = '#d1d5db';
    ctx.font = '14px sans-serif';
    
    // X-axis label (position below the axis)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    // Y-axis label (rotated, position to the left of the axis)
    ctx.save();
    ctx.translate(yAxisX - 50, (axisTop + axisBottom) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.restore();
}

/**
 * Calculate appropriate tick interval for axis
 */
function calculateTickInterval(range) {
    const roughInterval = range / 8; // Aim for about 8 ticks
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughInterval)));
    const normalized = roughInterval / magnitude;
    
    let interval;
    if (normalized <= 1) interval = magnitude;
    else if (normalized <= 2) interval = 2 * magnitude;
    else if (normalized <= 5) interval = 5 * magnitude;
    else interval = 10 * magnitude;
    
    return interval;
}

// --- Event Listeners ---
airfoilSelect.addEventListener('change', async (event) => {
    const selectedAirfoil = event.target.value;
    if (!selectedAirfoil) {
        // Clear canvas and data table if no selection
        lastParsedPoints = [];
        drawAirfoil([]);
        populateDataTable([]);
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
            populateDataTable(lastParsedPoints);
        } else {
            lastParsedPoints = [];
            drawAirfoil([]);
            populateDataTable([]);
        }
    } catch (error) {
        console.error(`Error loading airfoil data: ${error.message}`);
        lastParsedPoints = [];
        drawAirfoil([]);
        populateDataTable([]);
    }
});

// Redraw on window resize
window.addEventListener('resize', () => {
    drawAirfoil(lastParsedPoints);
});

// Initialize tabs when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
});
