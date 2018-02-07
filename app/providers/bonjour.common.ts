import { Injectable } from '@angular/core';
import * as appSettings from "application-settings";

@Injectable()
export class BonjourCommonProvider {
  public knownDevices:Array<any>; // array of objects of devices we already know: name, type, host, port, friendlyName

  constructor() {
    this.knownDevices = [{'name':'Dummy Device 1'},{'name':'Dummy Device 2'}];

    this.loadKnownDevices();
  }

  private loadKnownDevices() : void {
    let item = appSettings.getString('knownDevices');
    if (item!==undefined) { this.knownDevices = JSON.parse(item); }
  }

  public saveKnownDevices() : void {
    this.knownDevices = [...this.knownDevices]; // ensure new reference

    let _knownDevices = this.knownDevices.map((device) => { delete device.reachable; return device; }); // remove reachable property
    appSettings.setString('knownDevices',JSON.stringify(_knownDevices));
  }

  public removeDevice(name) : void {
    let deviceIndex = this.knownDevices.findIndex((device) => device.name===name);
    if (deviceIndex > -1) {
      this.knownDevices.splice(deviceIndex, 1); // remove existing known device object from array
    }
    this.saveKnownDevices();
    this.stopDeviceDiscovery();
  }

  public stopDeviceDiscovery(): void {
    // stub so that we can reference it here
    // implemented in BonjourProvider classes for iOS & Android
  }
}