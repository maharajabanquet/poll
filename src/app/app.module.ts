import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { VoteChartComponent } from './vote-chart/vote-chart.component';
import { PusherService } from './pusher.service';

@NgModule({
  declarations: [AppComponent, VoteChartComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ChartsModule],
  providers: [PusherService],
  bootstrap: [AppComponent],
})
export class AppModule {}
