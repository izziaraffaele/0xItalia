import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { setDefaultOptions } from 'date-fns';
import itDateFnsLocales from 'date-fns/locale/it';
// config
import { I18N } from '../config';
//
import itLocales from './it';

// ----------------------------------------------------------------------

let lng = I18N.defaultLang.value;

if (typeof window !== 'undefined') {
  lng = localStorage.getItem('i18nextLng') || I18N.defaultLang.value;
}

setDefaultOptions({ locale: itDateFnsLocales });

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      it: { translations: itLocales },
    },
    lng,
    fallbackLng: I18N.defaultLang.value,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
