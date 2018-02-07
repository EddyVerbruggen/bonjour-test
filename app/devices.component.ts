import { Component, OnInit } from "@angular/core";
import { BonjourProvider } from "./providers/bonjour";

@Component({
  template: `
    <StackLayout>
      <StackLayout *ngIf="knownDevices.length">
        <ListView [items]="knownDevices">
          <ng-template let-item="item">
            <Label [text]="item.name" style="text-align:center;"></Label>
          </ng-template>
        </ListView>
      </StackLayout>
    </StackLayout>
  `,
})

export class DevicesComponent implements OnInit {
  public knownDevices:Array<any> = [];

  constructor(
    public bonjour:BonjourProvider
  ) {}

  public ngOnInit() {
    this.bonjour.startDeviceDiscovery();
    setInterval(() => { this.knownDevices = this.bonjour.knownDevices; },1000);
  }
}
