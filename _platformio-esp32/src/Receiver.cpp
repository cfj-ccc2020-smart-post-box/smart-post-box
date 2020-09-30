// Copyright 2020 <Copyright arrow>

#include <Arduino.h>
#include <Receiver.h>
#include <Http.h>
#include <DataStore.h>

Http http = Http();
DataStore dataStore = DataStore();

void Receiver::init() {
  Serial.begin(115200);
  Serial.println("---Receiver mode---");
  http.init();
  dataStore.init();

  // 節電したいなら1000とかでもいいかも、ただclock%(10000/baseClock)が0になる事ないと動作できないので適宜
  baseClock = 50;
  clock = 0;
  clockM = 0;
  lastTimeIr = 0;

  //  pinStatusLED  = 2;
  pinIRLed = 16;
  pinRoter = 17;
  pinCamera = 21;
  pinSorenoid = 22;

  // pinMode(pinStatusLED , OUTPUT); // LED(未実装たぶんつけない)
  pinMode(pinIRLed, INPUT);  // LEDセンサ
  pinMode(pinRoter, OUTPUT);  // 右下 左USB
  pinMode(pinCamera, OUTPUT);  // 左下 右USB
  pinMode(pinSorenoid, OUTPUT);  // 左上 ソレノイド

  http.postMachinesSetting();
}

boolean cameraStatus = false;

void Receiver::task(void) {
  // digitalWrite(pinSorenoid,digitalRead(pinIRLed));
  // ソレノイド付けるまではIRLEDの動作試験に使えるよ
  clock++;

  // IRLED検出
  int nowIr = digitalRead(pinIRLed);
  if (nowIr) {
    if (lastTimeIr == nowIr) {
      // ピン感明あるけど変化なし
    } else {
      Serial.println("IR");
      http.postPostBoxReceiver();
      if (http.takePhoto && !cameraStatus) {
        newPictureName = http.getLastImgName();
        Serial.println(newPictureName);
        digitalWrite(pinCamera, 1);
        cameraStatus = true;
      }
    }
  }
  lastTimeIr = nowIr;

  if ( clock % (10000/baseClock) == 0 ) {
    // 10000msに1度回る
    // カメラ遮断があるのでこれは時間もハードコーディングのがよいかと
    if (cameraStatus) {
      if (newPictureName != http.getLastImgName()) {
        // http叩くと遅いので&&ではだめ
        digitalWrite(pinCamera, 0);
        cameraStatus = false;
      }
    }

    if ( (60000 / baseClock) < clock ) {  // 1分
      clockM++;
      Serial.println(clockM);
      clock = 0;
      if (http.cronMs < clockM) {
        clockM = 0;
        http.postMachinesSetting();
      }
    }
  }
  delay(baseClock);
}
