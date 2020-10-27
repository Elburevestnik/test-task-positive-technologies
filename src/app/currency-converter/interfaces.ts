export const currencyAcronym = {
  USD: 'dollars',
  EUR: 'euros',
  RUB: 'rubles',
  GBP: 'pounds',
  JPY: 'yens'
};

export type currencyType = keyof ICurrencyPrice;

export interface IProduct {
  price: number;
}

export interface ICurrencyPrice {
  rubles: number;
  euros: number;
  dollars: number;
  pounds: number;
  yens: number;
}

export interface IExchange {
  base: keyof typeof currencyAcronym;
  date: string;
  rates: {
    [prop: string]: number
  };
}

