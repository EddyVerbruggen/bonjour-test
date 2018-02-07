/*
   Use interface is to enforce that implementing classes match each other
   --> ensure this interface matches the typing file
*/
export interface BonjourProviderInterface {
  knownDevices : Array<any>,
  saveKnownDevices() : void,
  removeDevice(name) : void,
  startDeviceDiscovery() : Promise<void>,
  stopDeviceDiscovery() : void
}