import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DataStatisticComponent } from './data-statistic/data-statistic.component';
import { DataTableComponent } from './data-table/data-table.component';
import { CharnoffFacesComponent } from './charnoff-faces/charnoff-faces.component';
import { DataPlotsComponent } from './data-plots/data-plots.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'statistic-data',
        component: DataStatisticComponent,
      },
      {
        path: 'data-table',
        component: DataTableComponent,
      },
      {
        path: 'charnoff-faces',
        component: CharnoffFacesComponent,
      },
      {
        path: 'data-plots',
        component: DataPlotsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
