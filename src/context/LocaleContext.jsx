'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ALL_COUNTRIES, DEFAULT_COUNTRY, detectUserCountry, formatCurrencyPrice } from '@/data/countries';

const LocaleContext = createContext({
  country: DEFAULT_COUNTRY,
  setCountry: () => {},
  formatPrice: (val) => `$${val}`,
  isModalOpen: false,
  setIsModalOpen: () => {},
  localTimeStr: '',
  allCountries: ALL_COUNTRIES,
});

export function LocaleProvider({ children }) {
  const [country, setCountryState] = useState(DEFAULT_COUNTRY);
  const [localTimeStr, setLocalTimeStr] = useState('');

  useEffect(() => {
    // 100% automatic visitor country detection
    const detected = detectUserCountry();
    setCountryState(detected);
  }, []);

  // Maintain live local time for the selected country
  useEffect(() => {
    function updateClock() {
      try {
        const now = new Date();
        const timeFormatted = new Intl.DateTimeFormat('en-US', {
          timeZone: country.primaryTz === 'UTC' ? undefined : country.primaryTz,
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).format(now);
        setLocalTimeStr(timeFormatted);
      } catch (e) {
        setLocalTimeStr('');
      }
    }

    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, [country]);

  const formatPrice = (usdAmount) => {
    return formatCurrencyPrice(usdAmount, country);
  };

  return (
    <LocaleContext.Provider
      value={{
        country,
        formatPrice,
        localTimeStr,
        allCountries: ALL_COUNTRIES,
        isModalOpen: false,
        setIsModalOpen: () => {},
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
