import axios from 'axios';
import { useEffect, useState } from 'react';

function Dropdown (){
    const [currencies, setCurrencies] = useState({});
    useEffect(() => {
        axios.get('https://api.frankfurter.app/currencies')
        .then((currenciesRes) => {
            setCurrencies(currenciesRes.data);
        });
    }, []);
    return (
        <div className = "dropdown">
            <div className = "dropdown-btn">Choose One</div>
            <div className = "dropdown-content">
                {Object.keys(currencies).map((currencySymbol) => (
                    <div className = "dropdown-item">
                        {currencySymbol}
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default Dropdown