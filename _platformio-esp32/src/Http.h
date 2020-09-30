#ifndef Http_h
#define Http_h

class Http{
public:
  void init();
  String getLastImgName();
  void postPostBoxReceiver();
  void postMachinesSetting();
  void test();
  int cronMs;
  int takePhoto;
private:
  String host;
  int port;
  String uniqueCode;
  String modelId;
  String serverAccess(String, String, String);
};

#endif