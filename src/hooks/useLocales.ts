import { useTranslation } from 'react-i18next';
// config
import { I18N } from '../config';

// ----------------------------------------------------------------------

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();

  const langStorage =
    typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : '';

  const currentLang =
    I18N.allLangs.find((_lang) => _lang.value === langStorage) ||
    I18N.defaultLang;

  const handleChangeLanguage = (newlang: string) => {
    i18n.changeLanguage(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text: any, options?: any) => translate(text, options),
    currentLang,
    allLangs: I18N.allLangs,
  };
}
