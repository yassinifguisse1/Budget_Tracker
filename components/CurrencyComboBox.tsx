"use client"

import * as React from "react"
import currencyCodes from "currency-codes"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Currency = {
    value: string
    label: string
  }

// Create a list of currencies
const currencies: Currency[] = currencyCodes.codes().map((code: string) => {
    const currency = currencyCodes.code(code)
    if (currency) {
      return {
        value: code,
        label: `${currency.currency} (${code})`,
      }
    }
    return null
  }).filter((currency): currency is Currency => currency !== null)

export function CurrencyComboBox() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedCurrency, setSelectedCurrency] = React.useState<Currency | null>(null)

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[220px] justify-start">
            {selectedCurrency ? <>{selectedCurrency.label}</> : <>+ Select currency</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <CurrencyList setOpen={setOpen} setSelectedCurrency={setSelectedCurrency} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[220px] justify-start">
          {selectedCurrency ? <>{selectedCurrency.label}</> : <>+ Select currency</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <CurrencyList setOpen={setOpen} setSelectedCurrency={setSelectedCurrency} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
type CurrencyListProps = {
    setOpen: (open: boolean) => void
    setSelectedCurrency: (currency: Currency | null) => void
  }
function CurrencyList({ setOpen, setSelectedCurrency }: CurrencyListProps) {
  return (
    <Command>
      <CommandInput placeholder="Filter currency..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {currencies.map(currency => (
            <CommandItem
              key={currency.value}
              value={currency.value}
              onSelect={value => {
                const selected = currencies.find((currency) => currency.value === value) || null
                setSelectedCurrency(selected)
                setOpen(false)
              }}
            >
              {currency.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
