const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs');

const width = 800;
const height = 600;
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

// Parse arguments and log them for debugging
const labels = JSON.parse(process.argv[2]);
const data = JSON.parse(process.argv[3]);
const lowerLimit = JSON.parse(process.argv[4]);
const upperLimit = JSON.parse(process.argv[5]);
const chartTitle = process.argv[6];

console.log("Labels:", labels);
console.log("Data:", data);
console.log("Lower Limit:", lowerLimit);
console.log("Upper Limit:", upperLimit);
console.log("Chart Title:", chartTitle);

const configuration = {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            {
                label: `${chartTitle} (%)`,
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            },
            {
                label: 'Límite Inferior',
                data: lowerLimit,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                borderDash: [10, 5],
                fill: false
            },
            {
                label: 'Límite Superior',
                data: upperLimit,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                borderDash: [10, 5],
                fill: false
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                min: chartTitle === 'Humedad' ? 0 : -10,
                max: chartTitle === 'Humedad' ? 100 : 50
            }
        }
    }
};

(async () => {
    try {
        const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
        const fileName = chartTitle === 'Humedad' ? 'humidity_chart.png' : 'temperature_chart.png';
        fs.writeFileSync(`C:/xampp/htdocs/MonitoringDashboard/${fileName}`, buffer);
        console.log(`Generated ${fileName} successfully`);
    } catch (error) {
        console.error('Error generating chart:', error);
    }
})();
