// Copyright 2020 <Copyright Craft of Wari>

#include <Arduino.h>
#include <WiFi.h>
#include <Setting.h>
#include <DataStore.h>

DataStore dataStore3 = DataStore();

void Setting::init() {
  Serial.begin(115200);
  Serial.println("---setup mode---");
  dataStore3.init();

  WiFiServer server(80);
  s = server;

  const char ssid[] = "ARROW-SMART-POST-BOX";
  const char pass[] = "DEVELOPED-AT-2020";

  const IPAddress ip(192, 168, 20, 2);
  const IPAddress subnet(255, 255, 255, 0);

  WiFi.softAP(ssid, pass);
  delay(300);
  WiFi.softAPConfig(ip, ip, subnet);
  IPAddress myIP = WiFi.softAPIP();
  delay(300);
  s.begin();

  Serial.println("---server setup...---");
  Serial.print("SSID: ");
  Serial.println(ssid);
  Serial.print("AP IP address: ");
  Serial.println(myIP);
  Serial.println("---Server start!---");
}

void Setting::task(void) {
  WiFiClient client = s.available();

  if (!client) {
    return;
  }

  Serial.println("---new client!---");
  while (client.connected()) {
    if (!client.available()) {
      continue;
    }
    // これでメソッド名が取れる
    String method = client.readStringUntil(' ');
    // これで/set/ssid/hogehogeとか取れる
    String req = client.readStringUntil(' ');
    // Serial.println(req);
    String reqLowerCase = req;
    reqLowerCase.toLowerCase();
    // /set/ssid/等を文字数で削除
    String dataString = req.substring(10);
    // 最後にnull文字が入るので+1
    char data[dataString.length() +1];
    dataString.toCharArray(data, dataString.length() +1);
    String response = "";
    int statusCode = 200;

    Serial.println(reqLowerCase);
    if (false) {  // method != "POST"){
      statusCode = 403;
    } else if (reqLowerCase.startsWith("/set/ssid/")) {
      dataStore3.write("/ssid.txt", data);
    } else if (reqLowerCase.startsWith("/set/pass/")) {
      dataStore3.write("/pass.txt", data);
    } else if (reqLowerCase.startsWith("/set/uniq/")) {
      dataStore3.write("/uniq.txt", data);
    } else if (reqLowerCase.startsWith("/get/ssid")) {
      response = "ssid: " + dataStore3.read("/ssid.txt");
    // } else if(reqLowerCase.startsWith("/get/pass")) {
    //   response += "pass: " + dataStore3.read("/pass.txt");
    } else if (reqLowerCase.startsWith("/get/uniq")) {
      response = "uniq: " + dataStore3.read("/uniq.txt");
    } else if (reqLowerCase.startsWith("/get/all")) {
      response   = "ssid: " + dataStore3.read("/ssid.txt")
      + "\nuniq: " + dataStore3.read("/uniq.txt");
    } else {
      statusCode = 404;
    }

    if (statusCode == 200) {
      client.println("HTTP/1.1 200 OK");
      if (response == "") {
        response = "success " + reqLowerCase +" : "+ dataString;
      }
    } else if (statusCode == 403) {
      client.println("HTTP/1.1 403 Forbidden");
      response = "please use POST";
    } else {
      client.println("HTTP/1.1 404 Not Found");
      response = "404 Not Found";
    }
    client.println("Content-type:text/html");
    client.println();
    client.println("<body>" + response + "</body>");
    Serial.println(statusCode + " " + response);
    break;
  }
  client.stop();
  Serial.println("---client disonnected---");
}
