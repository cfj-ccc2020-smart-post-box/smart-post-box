#ifndef Receiver_h
#define Receiver_h

class Receiver{
public:
  void init();
  void task();
private:
  String getServer();
  String getNewPictureName();
  String newPictureName;
  int baseClock;
  int clock;
  int clockM;
  int lastTimeIr;
  //int pinStatusLED;
  int pinIRLed;
  int pinRoter;
  int pinCamera;
  int pinSorenoid;
};

#endif