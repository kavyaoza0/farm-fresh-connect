import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, TranslationKeys, languages } from '@/i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
  showLanguageSelector: boolean;
  setShowLanguageSelector: (show: boolean) => void;
  isFirstVisit: boolean;
  setFirstVisitComplete: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'mandi_fresh_language';
const FIRST_VISIT_KEY = 'mandi_fresh_first_visit';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Load saved language
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
    if (savedLanguage && languages.some(l => l.code === savedLanguage)) {
      setLanguageState(savedLanguage);
    }

    // Check if first visit
    const hasVisited = localStorage.getItem(FIRST_VISIT_KEY);
    if (!hasVisited) {
      setIsFirstVisit(true);
      setShowLanguageSelector(true);
    } else {
      setIsFirstVisit(false);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const setFirstVisitComplete = () => {
    localStorage.setItem(FIRST_VISIT_KEY, 'true');
    setIsFirstVisit(false);
    setShowLanguageSelector(false);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      showLanguageSelector,
      setShowLanguageSelector,
      isFirstVisit,
      setFirstVisitComplete,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
