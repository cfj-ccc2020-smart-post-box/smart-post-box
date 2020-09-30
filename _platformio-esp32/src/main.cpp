// Copyright 2020 <Copyright Craft of Wari>

#include <Arduino.h>
#include <WiFi.h>
#include <Setting.h>
#include <Receiver.h>

Setting setting = Setting();
Receiver receiver = Receiver();

boolean settingFlag = false;

void setup() {
  pinMode(4 , INPUT_PULLDOWN);  // setupタクトスイッチ
  settingFlag = !!digitalRead(4);

  if (settingFlag) {
    setting.init();
  } else {
    receiver.init();
  }
}

void loop() {
  if (settingFlag) {
    setting.task();
  } else {
    receiver.task();
  }
}

/*
  ソフトウェア初回書き込み時はこの辺を動かしておいてください
  dataStore2.write("/ssid.txt","defaltssid");
  dataStore2.write("/pass.txt","defaltpass");
  dataStore2.write("/uniq.txt","defaltuniqueid");
  dataStore2.write("/cronMs.txt","30");
  dataStore2.write("/takePhoto.txt","1");
*/
