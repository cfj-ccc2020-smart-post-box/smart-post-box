// Copyright 2020 <Copyright Craft of Wari>

#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <Http.h>
#include <DataStore.h>

DataStore dataStore2 = DataStore();

void Http::init() {
  dataStore2.init();
  host = "tmp.cow.kit-victims.org";
  port = 443;
  uniqueCode = dataStore2.read("/uniq.txt");
  cronMs = dataStore2.read("/cronMs.txt").toInt();
  takePhoto = dataStore2.read("/takePhoto.txt").toInt();
  modelId = "modelId";

  String strSsid = dataStore2.read("/ssid.txt");
  char ssid[strSsid.length()];
  strSsid.toCharArray(ssid, strSsid.length());

  String strPass = dataStore2.read("/pass.txt");
  char pass[strPass.length()];
  strPass.toCharArray(pass, strPass.length());

  delay(1000);
  WiFi.begin(ssid, pass);
  Serial.print("WiFi connecting");
  int wifiCnt = 0;
  while (WiFi.status() != WL_CONNECTED) {
    // これ公開時は60とかにする うちのはrestartさっさとしてほしいけど
    // ルータによって時間かかったりするとかはありそう
    if (wifiCnt == 20) {
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
  Serial.print("connected!! ");
  Serial.println(ssid);
}

String Http::serverAccess(String path, String data, String method) {
  WiFiClientSecure client;
  client.connect(host.c_str(), port);

  method.trim();
  path.trim();
  uniqueCode.trim();
  data.trim();
  String req =
    method + " " + path +  "/" + uniqueCode + "/" + data + " HTTP/1.1\r\n" +
    "Host: " + host + "\r\n" +
    "User-Agent: ESP32\r\n" +
    "Content-Type: application/json\r\n" +
    "Content-Length: "+ String(data.length()) +"\r\n\r\n" +
    data+"\r\n\r\n";
  client.print(req);
  // Serial.println(req);

  String header = "";
  while (true) {
    String line = client.readStringUntil('\n');
    header += line;
    if (line == "\r") {
      break;
    }
  }

  String body = client.readString();
  client.stop();
  return body;
}

String Http::getLastImgName() {
  return serverAccess("/api/photos/last-title", "", "GET");
}

void Http::postPostBoxReceiver() {
  serverAccess("/api/post-box/receiver", "", "GET");
  return;
}

void Http::test() {
  Serial.println(serverAccess("/api/users", "", "GET"));
  return;
}

void Http::postMachinesSetting() {
  String res = "1,60"; /*serverAccess(
    "/api/machines/setting",
    ", model_id: " + modelId + ", is_camera: false",
    "GET"  // POST
  );*/
  res.trim();
  Serial.println(res + "------");
  //resの形式があってればあとは問題ないでしょう、trimとかしてね

  cronMs = res.substring(2,res.length()).toInt();
  takePhoto = String(res[0]).toInt();
  if(dataStore2.read("/cronMs.txt").toInt() != cronMs) {
    dataStore2.write("/cronMs.txt", String(cronMs));
  }
  if(dataStore2.read("/takePhoto.txt").toInt() != takePhoto) {
    dataStore2.write("/takePhoto.txt", String(takePhoto));
  }

  return;  // voidでよき?
}
