import {useTranslation} from 'react-i18next';
import Button from './Button';

export default function LanguageSwitcher() {
  const {i18n} = useTranslation();
  const currentLang = i18n.language.split('-')[0];
  const languages = ['en', 'bg', 'es'];

  return (
    <div className='flex justify-end gap-2 mb-4'>
      {languages.map((lng) => (
        <Button
          key={lng}
          variant='language'
          size='sm'
          isActive={currentLang === lng}
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lng.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
