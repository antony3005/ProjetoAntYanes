#include <WiFi.h>
#include <HTTPClient.h>

#define WIFI_SSID "Wokwi-GUEST"
#define WIFI_PASSWORD ""

String firebaseURLstatus = "https://projetoantyanes-default-rtdb.firebaseio.com/Dispositivo/Sensor/Status.json";
String firebaseURLdistancia = "https://projetoantyanes-default-rtdb.firebaseio.com/Dispositivo/Sensor/Distancia.json";

int led = 4;
int trig = 5;
int echo = 2;

void setup() {
  pinMode(led, OUTPUT);
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);

  Serial.begin(115200);
  Serial.println("Hello, ESP32-S2!");

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.println("Conectando!");

  while(WiFi.status() != WL_CONNECTED){
    Serial.println(".");
    delay(500);

  }
  Serial.println("Conectado!");
}

void loop() {

  digitalWrite(trig, LOW);
  delayMicroseconds(2);

  digitalWrite(trig, HIGH);
  delayMicroseconds(10);

  digitalWrite(trig, LOW);

  long duracao = pulseIn(echo, HIGH);
  float distancia = duracao * 0.034 / 2;

  Serial.print("Distancia: ");
  Serial.print(distancia);
  Serial.println(" cm");

  if(distancia > 100){
  digitalWrite(led, HIGH);
  delay(500);

  enviarStatusFirebase("true");
  enviarDistanciaFirebase(distancia);

  }else{
  digitalWrite(led, LOW);
  delay(500);

  enviarStatusFirebase("false");
  enviarDistanciaFirebase(distancia);

  }
}

void enviarStatusFirebase(String status){
  HTTPClient http;
  http.begin(firebaseURLstatus);

  http.addHeader("Content-Type", "application/json");
  int httpCode = http.PUT(status);

  if(httpCode > 0){
    Serial.print("Firebase atualizado");
    Serial.print(httpCode);

  } else {
    Serial.print("Erro na atualização: ");
    Serial.println(http.errorToString(httpCode).c_str());

  }
  http.end();

}

void enviarDistanciaFirebase(float distancia){

  HTTPClient http;
  http.begin(firebaseURLdistancia);
  http.addHeader("Content-Type", "application/json");

  String payload = String(distancia, 2);
  int httpCode = http.PUT(payload);

  if(httpCode > 0){
    Serial.print("Firebase atualizado");
    Serial.print(httpCode);
  } else {
    Serial.print("Erro na atualização: ");
    Serial.println(http.errorToString(httpCode).c_str());
  }

  http.end();
}
