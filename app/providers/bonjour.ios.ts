import { Injectable } from '@angular/core';
import { BonjourCommonProvider } from "./bonjour.common";

/* Define NSNetServiceBrowserDelegate implementation class */

// class MyNSNetServiceBrowserDelegate extends NSObject implements NSNetServiceBrowserDelegate {
class MyNSNetServiceBrowserDelegate extends NSObject implements NSNetServiceBrowserDelegate {
  public static ObjCProtocols = [NSNetServiceBrowserDelegate];

  static new(): MyNSNetServiceBrowserDelegate {
    return <MyNSNetServiceBrowserDelegate>super.new();
  }

  private _callback: (result: string) => void;

  public initWithCallback(callback: (result: string) => void): MyNSNetServiceBrowserDelegate {
    this._callback = callback;
    return this;
  }

  public netServiceBrowserDidFindDomainMoreComing(browser: NSNetServiceBrowser, domainString: string, moreComing: boolean) {
    console.log(`netServiceBrowserDidFindDomainMoreComing: ${domainString}`);
    console.log(`moreComing: ${moreComing}`);
    this._callback(domainString);
  }

  public netServiceBrowserWillSearch(browser:NSNetServiceBrowser) {
    console.log(`netServiceBrowserWillSearch`);
  }

  public netServiceBrowserDidStopSearch(browser:NSNetServiceBrowser) {
    console.log(`netServiceBrowserDidStopSearch`);
  }

  public netServiceBrowserDidFindServiceMoreComing(browser:NSNetServiceBrowser, service:NSNetService, moreComing:boolean) {
    console.log(`netServiceBrowserDidFindServiceMoreComing, found service ${service.name}`);
    console.log(`moreComing: ${moreComing}`);
  }
}

@Injectable()
export class BonjourProvider extends BonjourCommonProvider {
  private netServiceBrowser:NSNetServiceBrowser;

  constructor() {
    super();

    this.netServiceBrowser = NSNetServiceBrowser.new();
  }

  public startDeviceDiscovery() {
    return new Promise((resolve, reject) => {

      this.netServiceBrowser.delegate = MyNSNetServiceBrowserDelegate.new().initWithCallback(result => console.log(result));
      // this.netServiceBrowser.searchForRegistrationDomains();
      this.netServiceBrowser.searchForServicesOfTypeInDomain('_http._tcp', '');


      setTimeout(() => {
        this.netServiceBrowser.stop(); // trigger stop callback after 30 seconds for test
      },30000);
    });
  }
}