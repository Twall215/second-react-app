import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';

 const Base_URL = 'https://api.frankfurter.app/latest?from='
 


function CurrencyConverter() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('AUD')
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const[amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if(amountInFromCurrency){
    fromAmount = amount
    toAmount = amount*exchangeRate[toCurrency]
  } else{
    toAmount = amount
    fromAmount = amount/exchangeRate
  }

  useEffect(() => {
    fetch(Base_URL+fromCurrency)
    .then(res => res.json())
    .then(data => {
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setExchangeRate(data.rates)
    })
  }, [fromCurrency])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${Base_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates))
    }
  }, [fromCurrency, toCurrency])
    
  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

    return (
      
      <div className="container">
        <div className="text-center p-3 mb-2">
          <h2 className="mb-2">Currency Converter</h2>
        </div>
        <div className="row text-center">
          <Dropdown
            currencyOptions = {currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={e => setFromCurrency(e.target.value)} //<- supposed to take the target event(currency selection) and change it to that option
            onChangeAmount = {handleFromAmountChange}
            amount = {fromAmount}
            />
          <div className="equals">{fromCurrency} {amount}={amount * exchangeRate[toCurrency]} {toCurrency}</div>
          <Dropdown
          currencyOptions = {currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={e => setToCurrency(e.target.value)} //<- supposed to take the target event(currency selection) and change it to that option
          onChangeAmount = {handleToAmountChange}
          amount = {toAmount}
            />
        </div>
      </div>
    )
}

export default CurrencyConverter;
