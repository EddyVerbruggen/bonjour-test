/*
   Ensure Typescript will not complain when it cannot find bonjour.ts since NS will only later rename either bonjour.(android|ios).ts
   --> ensure this typing matches the interface file
*/
export class BonjourProvider {
  public knownDevices : Array<any>;
  public saveKnownDevices() : void;
  public removeDevice(name) : void;
  public startDeviceDiscovery() : Promise<void>;
  public stopDeviceDiscovery() : void;
}