import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';

 const Base_URL = 'https://api.frankfurter.app/latest'
 


function CurrencyConverter() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  
  useEffect(() => {
    fetch(Base_URL)
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0]
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
    })
  })
    

    return (
      
      <div className="container">
        <div className="text-center p-3 mb-2">
          <h2 className="mb-2">Currency Converter</h2>
        </div>
        <div className="row text-center">
          <div><Dropdown
            currencyOptions = {currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={e => setFromCurrency(e.target.value)} //<- supposed to take the target event(currency selection) and change it to that event
            /></div>
          <div className="equals">=</div>
          <div ><Dropdown
          currencyOptions = {currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={e => setToCurrency(e.target.value)} //<- supposed to take the target event(currency selection) and change it to that event
          />
          </div>
        </div>
      </div>
    )
}

export default CurrencyConverter;
