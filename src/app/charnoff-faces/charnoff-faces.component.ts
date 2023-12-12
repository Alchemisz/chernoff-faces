import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CsvReaderService } from '../csv-reader.service';
import { AttributeQuantiles } from '../model/attribute-quantiles';
import { CsvDataRow } from '../model/csv-data';

@Component({
  selector: 'app-charnoff-faces',
  templateUrl: './charnoff-faces.component.html',
  styleUrls: ['./charnoff-faces.component.css'],
})
export class CharnoffFacesComponent implements OnInit, OnDestroy {
  quantileType = QUANTILE_TYPE;
  showFace: boolean = false;

  dataRowsSubscryption!: Subscription;
  dataRows: CsvDataRow[] = [];

  dataAttributeQuantilesSubscryption!: Subscription;
  dataAttributeQuantiles: AttributeQuantiles[] = [];

  avgValuesSubscryption!: Subscription;
  avgValues!: CsvDataRow;

  dataRowByYear: Map<Number, CsvDataRow> = new Map();

  crimesConfirmedQuantileType!: QUANTILE_TYPE;
  percentParticipationOfMinorsQuantileType!: QUANTILE_TYPE;
  totalSuspectsQuantileType!: QUANTILE_TYPE;
  totalSuspectsPercentParticipationOfMinorsQuantileType!: QUANTILE_TYPE;
  totalSuspectsPercentOfManQuantileType!: QUANTILE_TYPE;

  constructor(private csvReader: CsvReaderService) {
    this.dataRowsSubscryption = this.csvReader.dataRows.subscribe((data) => {
      this.dataRows = data;
      this.dataRowByYear = new Map(
        this.dataRows.map((entry) => [entry.year, entry])
      );
    });
    this.dataAttributeQuantilesSubscryption =
      this.csvReader.dataAttributeQuantiles.subscribe(
        (data) => (this.dataAttributeQuantiles = data)
      );
    this.avgValuesSubscryption = this.csvReader.avgValues.subscribe(
      (data) => (this.avgValues = data)
    );
    this.csvReader.getCsvData();
  }
  ngOnDestroy(): void {
    this.dataAttributeQuantilesSubscryption.unsubscribe();
    this.dataRowsSubscryption.unsubscribe();
  }

  onYearSelected(year: string) {
    this.showFace = true;

    if (year === 'Średnia') {
      this.calculateQuantiles(this.avgValues);
      return;
    }
    let dataRow = this.dataRowByYear.get(parseInt(year)) as CsvDataRow;
    this.calculateQuantiles(dataRow);
  }

  ngOnInit(): void {}

  calculateQuantiles(dataRow: CsvDataRow) {
    let crimesConfirmedAttributeQuantiles: AttributeQuantiles =
      this.dataAttributeQuantiles[1];
    let percentParticipationOfMinorsAttributeQuantiles: AttributeQuantiles =
      this.dataAttributeQuantiles[2];
    let totalSuspectsAttributeQuantiles: AttributeQuantiles =
      this.dataAttributeQuantiles[3];
    let totalSuspectsPercentParticipationOfMinorsAttributeQuantiles: AttributeQuantiles =
      this.dataAttributeQuantiles[4];
    let totalSuspectsPercentOfManAttributeQuantiles: AttributeQuantiles =
      this.dataAttributeQuantiles[5];

    this.crimesConfirmedQuantileType = this.calculateQuantile(
      crimesConfirmedAttributeQuantiles,
      dataRow.crimesConfirmed
    );
    this.percentParticipationOfMinorsQuantileType = this.calculateQuantile(
      percentParticipationOfMinorsAttributeQuantiles,
      dataRow.percentParticipationOfMinors
    );
    this.totalSuspectsQuantileType = this.calculateQuantile(
      totalSuspectsAttributeQuantiles,
      dataRow.totalSuspects
    );
    this.totalSuspectsPercentParticipationOfMinorsQuantileType =
      this.calculateQuantile(
        totalSuspectsPercentParticipationOfMinorsAttributeQuantiles,
        dataRow.totalSuspectsPercentParticipationOfMinors
      );
    this.totalSuspectsPercentOfManQuantileType = this.calculateQuantile(
      totalSuspectsPercentOfManAttributeQuantiles,
      dataRow.totalSuspectsPercentOfMan
    );
  }

  calculateQuantile(
    attributeQuartiles: AttributeQuantiles,
    value: number
  ): QUANTILE_TYPE {
    if (value < attributeQuartiles.quantile1) {
      return QUANTILE_TYPE.FIRST;
    }
    if (value < attributeQuartiles.quantile2) {
      return QUANTILE_TYPE.SECOND;
    }
    if (value < attributeQuartiles.quantile3) {
      return QUANTILE_TYPE.THIRD;
    }
    return QUANTILE_TYPE.FOURTH;
  }
}

export enum QUANTILE_TYPE {
  FIRST,
  SECOND,
  THIRD,
  FOURTH,
}
