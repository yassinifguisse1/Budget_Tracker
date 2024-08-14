import { Currencies } from "./currencies"

export function DateToUTCDate(date: Date){
    return new Date(
        Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds()
        )

    )
}
export function GetFormmatterForCurrency(currency:string){
    const locale = Currencies.find((c)=> c.value === currency)?.locale;
    return new Intl.NumberFormat(locale,{
        style:'currency',
        currency,
    })
}