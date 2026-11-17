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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localTimeStr, setLocalTimeStr] = useState('');

  useEffect(() => {
    // Auto-detect visitor's country on client mount
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

  const setCountry = (newCountry) => {
    setCountryState(newCountry);
    try {
      localStorage.setItem('user_country_code', newCountry.code);
    } catch (e) {}
  };

  const formatPrice = (usdAmount) => {
    return formatCurrencyPrice(usdAmount, country);
  };

  return (
    <LocaleContext.Provider
      value={{
        country,
        setCountry,
        formatPrice,
        isModalOpen,
        setIsModalOpen,
        localTimeStr,
        allCountries: ALL_COUNTRIES,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
