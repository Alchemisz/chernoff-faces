export class CsvDataRow {
  year: number;
  crimesConfirmed: number;
  percentParticipationOfMinors: number;
  totalSuspects: number;
  totalSuspectsPercentParticipationOfMinors: number;
  totalSuspectsPercentOfMan!: number;

  constructor(
    year: number,
    crimesConfirmed: number,
    percentParticipationOfMinors: number,
    totalSuspects: number,
    totalSuspectsPercentParticipationOfMinors: number,
    totalSuspectsPercentOfMan: number
  ) {
    this.year = year;
    this.crimesConfirmed = crimesConfirmed;
    this.percentParticipationOfMinors = percentParticipationOfMinors;
    this.totalSuspects = totalSuspects;
    this.totalSuspectsPercentParticipationOfMinors =
      totalSuspectsPercentParticipationOfMinors;
    this.totalSuspectsPercentOfMan = totalSuspectsPercentOfMan;
  }
}
