import { Component, OnInit } from '@angular/core';
import { CsvReaderService } from '../csv-reader.service';
import { Subscription } from 'rxjs';
import { CsvDataRow } from '../model/csv-data';

@Component({
  selector: 'app-charnoff-faces',
  templateUrl: './charnoff-faces.component.html',
  styleUrls: ['./charnoff-faces.component.css'],
})
export class CharnoffFacesComponent implements OnInit {
  dataRowsSubscryption!: Subscription;
  dataRows: CsvDataRow[] = [];
  dataRowByYear: Map<Number, CsvDataRow> = new Map();

  constructor(private csvReader: CsvReaderService) {
    this.dataRowsSubscryption = this.csvReader.dataRows.subscribe((data) => {
      this.dataRows = data;
      this.dataRowByYear = new Map(
        this.dataRows.map((entry) => [entry.year, entry])
      );
    });
    this.csvReader.getCsvData();
  }

  onYearSelected(year: string) {
    console.log(this.dataRowByYear.get(parseInt(year)));
  }

  ngOnInit(): void {}
}
