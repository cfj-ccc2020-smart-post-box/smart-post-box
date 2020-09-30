#include <Arduino.h>
#include <esp_camera.h>
#include <WiFi.h>
//#include <HTTPClient.h>
#include <WiFiClientSecure.h>

#include "mbedtls/base64.h"
#include "Base64.h"
//
// WARNING!!! Make sure that you have either selected ESP32 Wrover Module,
//            or another board which has PSRAM enabled
//

// Select camera model
//#define CAMERA_MODEL_WROVER_KIT
//#define CAMERA_MODEL_ESP_EYE
#define CAMERA_MODEL_M5STACK_PSRAM
//#define CAMERA_MODEL_M5STACK_WIDE
//#define CAMERA_MODEL_AI_THINKER
//////////////////////////////

#include "camera_pins.h"

const char* ssid = "ssid";
const char* pass = "password";
const int port = 443;

const String host = "host";
String uniqueCode = "uniquecode";

String path = "/api/photos/receiver";
String method = "POST";

void startCameraServer();

void setup() {
  Serial.begin(115200);
  Serial.setDebugOutput(true);
  Serial.println("start");

  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  if(psramFound()){
    config.frame_size = FRAMESIZE_UXGA;
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }

#if defined(CAMERA_MODEL_ESP_EYE)
  pinMode(13, INPUT_PULLUP);
  pinMode(14, INPUT_PULLUP);
#endif

  // camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }

  sensor_t * s = esp_camera_sensor_get();
  if (s->id.PID == OV3660_PID) {
    s->set_vflip(s, 1);  // flip it back
    s->set_brightness(s, 1);  // up the blightness just a bit
    s->set_saturation(s, -2);  // lower the saturation
  }
  // drop down frame size for higher initial frame rate
  s->set_framesize(s, FRAMESIZE_QVGA);

#if defined(CAMERA_MODEL_M5STACK_WIDE)
  s->set_vflip(s, 1);
  s->set_hmirror(s, 1);
#endif

  delay(1000);
  WiFi.begin(ssid, pass);
  Serial.print("WiFi connecting");
  int wifiCnt = 0;
  while (WiFi.status() != WL_CONNECTED) {
    if (wifiCnt == 20) {  // これ公開時は90とかにする
      Serial.print("\nWiFi restarting");
      wifiCnt = 0;
      WiFi.disconnect(true, true);
      delay(500);
      WiFi.begin(ssid, pass);
    } else {
      wifiCnt++;
      Serial.print(".");
      delay(500);
    }
  }
  Serial.println(" connected!!");

  Serial.print("Camera Ready! Use 'http://");
  Serial.print(WiFi.localIP());
  Serial.println("' to connect");

  Serial.println("take a picture");

  camera_fb_t * fb = esp_camera_fb_get();
  if(!fb) {
    Serial.println("camera error");
    return;
  }

  WiFiClientSecure client;
  Serial.print("connecting to ");
  if (!client.connect(host.c_str(), port)) {
    Serial.println("connection failed");
    return;
  }
  Serial.println("------connecting sucsess------");

  String hostStr = String(host);
  method.trim();
  hostStr.trim();
  path.trim();
  uniqueCode.trim();
  Serial.println("requesting URL: " + hostStr + path + "/"+uniqueCode+"/");

  String pic = base64::encode(fb->buf, fb->len).c_str();
  int wordCount = 1800;
  int len = pic.length()/wordCount;
  if (pic.length()%wordCount) len++;
  int cnt = 0;
  while (pic.length()) {
    cnt++;
    String d = pic.substring(0, wordCount);
    pic.remove(0, wordCount);

    String req =
    method + " " + path + "/"+ uniqueCode + "/" + cnt + "/" + len + "/" + d + " HTTP/1.1\r\n" +
    "Host: " + hostStr + "\r\n" +
    "User-Agent: ESP\r\n" +  // "User-Agent: curl/7.47.0\r\n" +
    "Accept: */*\r\n" +
    "Expect: 100-continue \r\n"+
    "\r\n\r\n";

    client.print(req);
    Serial.println(req);
  }
  client.flush();
  Serial.println("request send");

  Serial.println("----------------------------");
  Serial.println("header");
  while (client.connected()) {
    String line = client.readStringUntil('\n');
    Serial.println(line);
    if (line == "\r") {
      Serial.println("headers received");
      Serial.println("----------------------------");
      break;
    }
  }

  Serial.println("==========");
  Serial.println(client.readString());
  Serial.println("==========");
  client.stop();
}

void loop() {
}
