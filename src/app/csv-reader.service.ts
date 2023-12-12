import { HttpClient } from '@angular/common/http';
import { Attribute, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CsvDataRow } from './model/csv-data';
import { AttributeQuantiles } from './model/attribute-quantiles';

@Injectable({
  providedIn: 'root',
})
export class CsvReaderService {
  dataRows = new Subject<CsvDataRow[]>();
  avgValues = new Subject<CsvDataRow>();
  dataAttributeQuantiles = new Subject<AttributeQuantiles[]>();

  constructor(private http: HttpClient) {}

  getCsvData() {
    this.http.get('assets/statystyka.csv', { responseType: 'text' }).subscribe(
      (data) => {
        let csvToRowArray = data.split('\n');
        this.readData(csvToRowArray);
        this.calculateAttributeQuantiles(csvToRowArray);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  calculateAttributeQuantiles(csvToRowArray: string[]) {
    var quantile = require('compute-quantile');
    let dataSet: number[][] = [];

    for (let i = 0; i < 6; i++) {
      dataSet[i] = [];
    }

    for (let index = 1; index < csvToRowArray.length - 1; index++) {
      let row = csvToRowArray[index].split(',');
      dataSet[0].push(parseInt(row[0]));
      dataSet[1].push(parseInt(row[1]));
      dataSet[2].push(parseInt(row[2]));
      dataSet[3].push(parseInt(row[4]));
      dataSet[4].push(parseInt(row[5]));
      dataSet[5].push(parseFloat(row[7]));
    }

    const calculateAverage = (arr: number[]): number =>
      arr.reduce((acc, val) => acc + val, 0) / arr.length;
    const roundNum = (num: number) => Math.round(num * 100) / 100;
    let avgValues = new CsvDataRow(
      -1,
      roundNum(calculateAverage(dataSet[1])),
      roundNum(calculateAverage(dataSet[2])),
      roundNum(calculateAverage(dataSet[3])),
      roundNum(calculateAverage(dataSet[4])),
      roundNum(calculateAverage(dataSet[5]))
    );
    this.avgValues.next(avgValues);

    let calculatedDataAttributeQuantiles: AttributeQuantiles[] = [];

    for (let i = 0; i < 6; i++) {
      calculatedDataAttributeQuantiles.push(
        new AttributeQuantiles(
          quantile(dataSet[i], 0.25),
          quantile(dataSet[i], 0.5),
          quantile(dataSet[i], 0.75)
        )
      );
    }
    console.log(calculatedDataAttributeQuantiles);
    this.dataAttributeQuantiles.next(calculatedDataAttributeQuantiles);
  }

  private readData(csvToRowArray: string[]) {
    let csvData = [];
    for (let index = 1; index < csvToRowArray.length - 1; index++) {
      let row = csvToRowArray[index].split(',');
      csvData.push(
        new CsvDataRow(
          parseInt(row[0], 10),
          parseInt(row[1], 10),
          parseInt(row[2], 10),
          parseInt(row[4], 10),
          parseInt(row[5], 10),
          parseFloat(row[7])
        )
      );
    }
    this.dataRows.next(csvData);
  }
}
