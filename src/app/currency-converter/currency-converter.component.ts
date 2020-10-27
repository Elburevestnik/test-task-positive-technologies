import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CurrencyConverterService} from './currency-converter.service';
import {SELECTED_CART} from './custom-cart';
import {currencyType, ICurrencyPrice, IProduct} from './interfaces';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
  providers: [CurrencyConverterService]
})
export class CurrencyConverterComponent implements OnInit {
  totalCartPrice: ICurrencyPrice = null;
  currentCurrency: currencyType = 'dollars';
  selectedCart: IProduct[] = SELECTED_CART;

  get sumPrice() {
    return this.selectedCart.reduce((acc, value) => acc += value.price, 0);
  }

  get availableCurrencies() {
    return this.converter.currencies;
  }

  constructor(public converter: CurrencyConverterService) {}

  ngOnInit(): void {
    this.converter.getExchange().subscribe(res => {
      this.totalCartPrice = this.converter.getExchangeForValue(this.sumPrice, this.currentCurrency) as ICurrencyPrice;
    });
  }
}
