export class CsvData {
  year: number;
  crimesConfirmed: number;
  percentParticipationOfMinors: number;
  totalSuspects: number;
  totalSuspectsPercentParticipationOfMinors: number;

  constructor(
    year: number,
    crimesConfirmed: number,
    percentParticipationOfMinors: number,
    totalSuspects: number,
    totalSuspectsPercentParticipationOfMinors: number
  ) {
    this.year = year;
    this.crimesConfirmed = crimesConfirmed;
    this.percentParticipationOfMinors = percentParticipationOfMinors;
    this.totalSuspects = totalSuspects;
    this.totalSuspectsPercentParticipationOfMinors =
      totalSuspectsPercentParticipationOfMinors;
  }
}
