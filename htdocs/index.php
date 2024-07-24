<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard de Monitoreo</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="js/script.js" defer></script>
</head>
<body>
    <div class="container">
        <h1>Dashboard de Monitoreo de Humedad y Temperatura</h1>
        <div class="values">
            <div class="value-box">
                <h2>Humedad</h2>
                <p id="humidity">Cargando...</p>
            </div>
            <div class="value-box">
                <h2>Temperatura</h2>
                <p id="temperature">Cargando...</p>
            </div>
        </div>
        <div class="charts">
            <canvas id="humidityChart"></canvas>
            <canvas id="temperatureChart"></canvas>
        </div>
    </div>
</body>
</html>
