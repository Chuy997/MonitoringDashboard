#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

// Configuración del WiFi
const char* ssid = "WiFiZL-LA (3.0)";
const char* password = "Chuch3r14.12#$";

// Configuración del DHT22
#define DHTPIN 4  // Pin al que está conectado el sensor
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

// Configuración del servidor
const char* serverName = "http://192.168.1.218/MonitoringDashboard/htdocs/php/test_connection.php";

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  // Conexión al WiFi
  Serial.print("Conectando a ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.println("Dirección IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Leer los valores del sensor
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Error al leer del sensor DHT!");
    return;
  }

  // Mostrar los valores en el monitor serial
  Serial.print("Humedad: ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperatura: ");
  Serial.print(t);
  Serial.println(" *C");

  // Enviar los datos al servidor
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = String(serverName);
    http.begin(url.c_str());
    int httpResponseCode = http.GET();

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.print("Error en la conexión: ");
      Serial.println(httpResponseCode);
      Serial.println(http.errorToString(httpResponseCode));  // Línea agregada para obtener más información sobre el error
    }

    http.end();
  } else {
    Serial.println("Error en la conexión WiFi");
  }

  delay(60000); // Esperar 1 minuto antes de la próxima lectura
}
