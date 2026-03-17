import { useState, useEffect } from 'react';

const DEFAULT_LOGO = "https://img.freepik.com/premium-photo/neon-deer-head-with-antlers-cyberpunk-style-generative-ai_958192-343.jpg";

export const useLogo = () => {
  const [logo, setLogo] = useState<string>(() => {
    return localStorage.getItem('app-logo') || DEFAULT_LOGO;
  });

  const updateLogo = (newLogo: string) => {
    setLogo(newLogo);
    localStorage.setItem('app-logo', newLogo);
  };

  const resetLogo = () => {
    setLogo(DEFAULT_LOGO);
    localStorage.removeItem('app-logo');
  };

  return { logo, updateLogo, resetLogo };
};
