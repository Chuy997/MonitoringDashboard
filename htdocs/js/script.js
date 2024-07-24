document.addEventListener('DOMContentLoaded', function() {
    const humidityElement = document.getElementById('humidity');
    const temperatureElement = document.getElementById('temperature');
    const humidityChartCtx = document.getElementById('humidityChart').getContext('2d');
    const temperatureChartCtx = document.getElementById('temperatureChart').getContext('2d');
    const humidityIndicator = document.getElementById('humidityIndicator');
    const temperatureIndicator = document.getElementById('temperatureIndicator');

    let humidityChart = new Chart(humidityChartCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Humedad (%)',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Límite Inferior',
                    data: [],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    borderDash: [10, 5],
                    fill: false
                },
                {
                    label: 'Límite Superior',
                    data: [],
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
                    min: 0,
                    max: 100
                }
            }
        }
    });

    let temperatureChart = new Chart(temperatureChartCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Temperatura (°C)',
                    data: [],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Límite Inferior',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    borderDash: [10, 5],
                    fill: false
                },
                {
                    label: 'Límite Superior',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
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
                    min: -10,
                    max: 50
                }
            }
        }
    });

    function updateData() {
        fetch('php/get_data.php')
            .then(response => response.json())
            .then(data => {
                const labels = data.map(entry => new Date(entry.timestamp).toLocaleTimeString());
                const humidityData = data.map(entry => entry.humidity);
                const temperatureData = data.map(entry => entry.temperature);

                humidityElement.textContent = humidityData[humidityData.length - 1] + '%';
                temperatureElement.textContent = temperatureData[temperatureData.length - 1] + '°C';

                updateIndicator(humidityIndicator, humidityData[humidityData.length - 1], 30, 75);
                updateIndicator(temperatureIndicator, temperatureData[temperatureData.length - 1], 10, 30);

                humidityChart.data.labels = labels;
                humidityChart.data.datasets[0].data = humidityData;
                humidityChart.data.datasets[1].data = new Array(humidityData.length).fill(30); // Límite Inferior
                humidityChart.data.datasets[2].data = new Array(humidityData.length).fill(75); // Límite Superior
                humidityChart.update();

                temperatureChart.data.labels = labels;
                temperatureChart.data.datasets[0].data = temperatureData;
                temperatureChart.data.datasets[1].data = new Array(temperatureData.length).fill(10); // Límite Inferior
                temperatureChart.data.datasets[2].data = new Array(temperatureData.length).fill(30); // Límite Superior
                temperatureChart.update();
            })
            .catch(error => console.error('Error al obtener los datos:', error));
    }

    function updateIndicator(indicator, value, lowerLimit, upperLimit) {
        if (value < lowerLimit || value > upperLimit) {
            indicator.style.backgroundColor = 'red';
        } else if (value < lowerLimit + 0.1 * lowerLimit || value > upperLimit - 0.1 * upperLimit) {
            indicator.style.backgroundColor = 'yellow';
        } else {
            indicator.style.backgroundColor = 'green';
        }
    }

    setInterval(updateData, 60000);
    updateData();
});
