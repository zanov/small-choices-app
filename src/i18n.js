import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '@/i18n/en';
import bg from '@/i18n/bg';
import es from '@/i18n/es';

const resources = {
  en,
  bg,
  es,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({resources, fallbackLng: 'en', interpolation: {escapeValue: false}});

export default i18n;

