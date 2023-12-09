import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CsvDataRow } from './model/csv-data';

@Injectable({
  providedIn: 'root',
})
export class CsvReaderService {
  dataRows = new Subject<CsvDataRow[]>();

  constructor(private http: HttpClient) {}

  getCsvData() {
    this.http.get('assets/statystyka.csv', { responseType: 'text' }).subscribe(
      (data) => {
        let csvToRowArray = data.split('\n');
        let csvData = [];
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(',');
          csvData.push(
            new CsvDataRow(
              parseInt(row[0], 10),
              parseInt(row[1], 10),
              parseInt(row[2], 10),
              parseInt(row[4], 10),
              parseInt(row[5], 10)
            )
          );
        }
        console.log(csvData);
        this.dataRows.next(csvData);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
