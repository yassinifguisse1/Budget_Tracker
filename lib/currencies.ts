// src/utils/currencyToCountryCodeMapping.ts
export const Currencies = [
  { value: "USD",  label: "$ Dollar", locale: "en-US" },
  { value: "EUR",  label: "€ Euro", locale: "de-DE" },
  { value: "GBP",  label: "£ Pound", locale: "en-GB" },
  { value: "JPY",  label: "¥ Yen", locale: "ja-JP" },
  { value: "AUD",  label: "$ Australian Dollar", locale: "en-AU" },
  { value: "CAD",  label: "$ Canadian Dollar", locale: "en-CA" },
  { value: "PLN",  label: "zł Polish Zloty", locale: "pl-PL" },
  { value: "MAD",  label: "د.م. Moroccan Dirham", locale: "ar-MA" }
];


export type Currency = (typeof Currencies)[0];
