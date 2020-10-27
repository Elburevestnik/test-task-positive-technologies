import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {currencyAcronym, currencyType, ICurrencyPrice, IExchange} from './interfaces';
import {HttpClient} from '@angular/common/http';
import {map, takeUntil, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable()
export class CurrencyConverterService implements OnDestroy {
  exchange: ICurrencyPrice = null;

  destroy$ = new Subject();

  get currencies() {
    return Object.values(currencyAcronym);
  }

  constructor(
    public httpClient: HttpClient
  ) {}


  convert(exchange: IExchange, value: number, type: currencyType) {
    return Math.round(value * exchange[type]);
  }

  getExchangeForValue(value: number, type: currencyType) {
    const convert = this.curry(this.convert)(this.exchange, value);
    return this.currencies.reduce((acc, currency) => ({...acc, [currency]: convert(currency)}), {});
  }

  curry(func) {
    return function curried(...args) {
      if (args.length >= func.length) {
        return func.call(this, ...args);
      } else {
        return function(...argsNext) {
          return curried.call(this, ...[...args, ...argsNext]);
        };
      }
    };
  }

  getExchange() {
    return this.httpClient.get<IExchange>('https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,GBP,EUR,RUB,JPY')
      .pipe(
        map(res => res.rates),
        tap(res => {
          this.exchange = Object.entries(currencyAcronym)
            .reduce((acc, [acronym, fullName]) => ({...acc, [fullName]: res[acronym]}), {}) as ICurrencyPrice;
        }),
        takeUntil(this.destroy$)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
