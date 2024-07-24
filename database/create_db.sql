CREATE DATABASE sensor_data;

USE sensor_data;

CREATE TABLE measurements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    humidity FLOAT,
    temperature FLOAT
);
