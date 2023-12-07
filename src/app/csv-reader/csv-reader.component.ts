import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CsvData } from './csv-data';

@Component({
  selector: 'app-csv-reader',
  templateUrl: './csv-reader.component.html',
  styleUrls: ['./csv-reader.component.css'],
})
export class CsvReaderComponent implements OnInit {
  public csvData: CsvData[] = [];

  constructor(private http: HttpClient) {
    this.http.get('assets/statystyka.csv', { responseType: 'text' }).subscribe(
      (data) => {
        let csvToRowArray = data.split('\n');
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(',');
          this.csvData.push(
            new CsvData(
              parseInt(row[0], 10),
              parseInt(row[1], 10),
              parseInt(row[2], 10),
              parseInt(row[3], 10),
              parseInt(row[4], 10)
            )
          );
        }
        console.log(this.csvData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}
}
