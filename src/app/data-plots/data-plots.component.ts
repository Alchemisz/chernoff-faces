import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { CsvReaderService } from '../csv-reader.service';

@Component({
  selector: 'app-data-plots',
  templateUrl: './data-plots.component.html',
  styleUrls: ['./data-plots.component.css'],
})
export class DataPlotsComponent implements OnInit, OnDestroy {
  percentSub: Subscription = new Subscription();
  yearsSub: Subscription = new Subscription();

  years: number[] = [];
  values: number[] = [];

  salesData: ChartData<'bar'> = {
    labels: this.years,
    datasets: [
      { label: 'Podejrzani ogółem - procent mężczyzn', data: this.values },
    ],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Podejrzani ogółem - procent mężczyzn na przestrzeni lat',
      },
    },
    scales: {
      y: {
        max: 100,
      },
    },
  };

  constructor(private csvReader: CsvReaderService) {
    this.percentSub = csvReader.totalSuspectsPercentOfMan.subscribe((data) => {
      this.values = data.reverse();
      this.updateChartData();
    });
    this.yearsSub = csvReader.years.subscribe((data) => {
      this.years = data.reverse();
      console.log(this.years + 'LATA');
      this.updateChartData();
    });
    this.csvReader.getCsvData();
  }

  ngOnDestroy(): void {
    this.yearsSub.unsubscribe();
    this.percentSub.unsubscribe();
  }

  private updateChartData(): void {
    this.salesData = {
      labels: this.years,
      datasets: [
        { label: 'Podejrzani ogółem - procent mężczyzn', data: this.values },
      ],
    };
  }

  ngOnInit(): void {
    this.updateChartData();
  }
}
