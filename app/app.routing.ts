import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { DevicesComponent } from "./devices.component";

const routes: Routes = [
    { path: "", redirectTo: "/devices", pathMatch: "full" },
    { path: "devices", component: DevicesComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }