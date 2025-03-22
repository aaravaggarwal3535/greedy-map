import React, { createContext, useState, useContext, useEffect } from 'react';

const PremiumContext = createContext(null);

export const usePremium = () => useContext(PremiumContext);

export const PremiumProvider = ({ children }) => {
  const [hasPremium, setHasPremium] = useState(false);
  
  useEffect(() => {
    // Check localStorage to see if user has premium access
    const premiumStatus = localStorage.getItem('hasPremium') === 'true';
    setHasPremium(premiumStatus);
  }, []);
  
  const unlockPremium = () => {
    localStorage.setItem('hasPremium', 'true');
    setHasPremium(true);
  };
  
  const removePremium = () => {
    localStorage.setItem('hasPremium', 'false');
    setHasPremium(false);
  };
  
  return (
    <PremiumContext.Provider value={{ hasPremium, unlockPremium, removePremium }}>
      {children}
    </PremiumContext.Provider>
  );
};
