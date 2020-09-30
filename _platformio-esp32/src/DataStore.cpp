// Copyright 2020 <Copyright arrow>
#include <Arduino.h>
#include <SPIFFS.h>
#include <DataStore.h>

void DataStore::init() {
  SPIFFS.begin();
}

String DataStore::read(String path) {
  File file = SPIFFS.open(String(path).c_str(), "r");
  String strFile = file.readStringUntil('\n');
  file.close();
  return strFile;
}

void DataStore::write(String path, String data) {
  Serial.println(path);
  Serial.println(data);
  File file = SPIFFS.open(String(path).c_str(), "w");
  file.println(data);
  file.close();
}
