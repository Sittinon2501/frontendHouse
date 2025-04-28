import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HouseComponent } from './house/house.component';

@NgModule({
  declarations: [AppComponent, HouseComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [provideClientHydration(withEventReplay())],
  bootstrap: [AppComponent],
})
export class AppModule {}
