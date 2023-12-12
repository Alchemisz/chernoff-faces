import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AttributeQuantiles } from '../model/attribute-quantiles';
import { CsvReaderService } from '../csv-reader.service';
import { CsvDataRow } from '../model/csv-data';

@Component({
  selector: 'app-data-statistic',
  templateUrl: './data-statistic.component.html',
  styleUrls: ['./data-statistic.component.css'],
})
export class DataStatisticComponent implements OnInit {
  dataAttributeQuantilesSubscryption!: Subscription;
  dataAttributeQuantiles: AttributeQuantiles[] = [];

  avgValuesSubscryption!: Subscription;
  avgValues!: CsvDataRow;

  constructor(private csvReader: CsvReaderService) {
    this.dataAttributeQuantilesSubscryption =
      this.csvReader.dataAttributeQuantiles.subscribe(
        (data) => (this.dataAttributeQuantiles = data)
      );
    this.avgValuesSubscryption = this.csvReader.avgValues.subscribe(
      (data) => (this.avgValues = data)
    );
    this.csvReader.getCsvData();
  }

  ngOnInit(): void {}
}
