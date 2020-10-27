import {Injectable, OnDestroy} from '@angular/core';
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
  ) {
  }

  /**
   * Инициализация курса валют относительно базового USD
   * @param rates
   */
  setExchange(rates) {
    this.exchange = Object.entries(currencyAcronym)
      .reduce((acc, [acronym, fullName]) => ({...acc, [fullName]: rates[acronym]}), {}) as ICurrencyPrice;
  }

  /**
   * Конвертация значения по заданному курсу
   * @param exchange
   * @param value
   * @param type
   */
  convert(exchange: IExchange, value: number, type: currencyType) {
    return Math.round(value * exchange[type]);
  }

  /**
   * Получение списка сконвертированнных сумм для доступных валют
   * @param value
   * @param type
   */
  getExchangeForValue(value: number, type: currencyType) {
    const convert = this.curry(this.convert)(this.exchange, value);
    return this.currencies.reduce((acc, currency) => ({...acc, [currency]: convert(currency)}), {});
  }

  /**
   * Функция каррирования
   * @param func
   */
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

  /**
   * Запрос на получение актуальных курсов валют
   */
  getExchange() {
    return this.httpClient.get<IExchange>('https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,GBP,EUR,RUB,JPY')
      .pipe(
        map(res => res.rates),
        tap(rates => this.setExchange(rates)),
        takeUntil(this.destroy$)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
