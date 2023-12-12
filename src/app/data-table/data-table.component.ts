import { Component, OnDestroy, OnInit } from '@angular/core';
import { CsvDataRow } from '../model/csv-data';
import { CsvReaderService } from '../csv-reader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit, OnDestroy {
  dataRowsSubscryption!: Subscription;
  dataRows: CsvDataRow[] = [];
  avgValuesSubscryption!: Subscription;
  avgValues!: CsvDataRow;

  constructor(private csvReader: CsvReaderService) {
    this.dataRowsSubscryption = this.csvReader.dataRows.subscribe(
      (data) => (this.dataRows = data)
    );
    this.avgValuesSubscryption = this.csvReader.avgValues.subscribe(
      (data) => (this.avgValues = data)
    );
    this.csvReader.getCsvData();
  }

  ngOnDestroy(): void {
    this.dataRowsSubscryption.unsubscribe();
    this.avgValuesSubscryption.unsubscribe();
  }

  ngOnInit(): void {}
}
