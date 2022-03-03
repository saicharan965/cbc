import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FeatureShellModule } from '@cbc/feature-shell';

import { AppComponent } from './app.component';

const ROUTES: Routes = [
  { path: '', loadChildren: () => import('libs/feature-shell/src/lib/feature-shell.module').then(m=>m.FeatureShellModule) }
]

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FeatureShellModule, RouterModule.forRoot(ROUTES)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
