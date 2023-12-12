import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTableComponent } from './data-table/data-table.component';
import { DataStatisticComponent } from './data-statistic/data-statistic.component';
import { DataPlotsComponent } from './data-plots/data-plots.component';
import { CharnoffFacesComponent } from './charnoff-faces/charnoff-faces.component';
import { HomeComponent } from './home/home.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    DataStatisticComponent,
    DataPlotsComponent,
    CharnoffFacesComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
