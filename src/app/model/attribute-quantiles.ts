export class AttributeQuantiles {
  quantile1!: number;
  quantile2!: number;
  quantile3!: number;

  constructor(quantile1: number, quantile2: number, quantile3: number) {
    this.quantile1 = quantile1;
    this.quantile2 = quantile2;
    this.quantile3 = quantile3;
  }
}
