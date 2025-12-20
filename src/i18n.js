import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      questions: [
        'What do you choose?',
        'Where do you feel better?',
        'How do you live?',
        'Do you prefer to work?',
      ],
      options: [
        ['Coffee', 'Tea'],
        ['Sea', 'Mountain'],
        ['Order', 'Chaos'],
        ['Alone', 'Team'],
      ],
      share: 'Share',
      tryAgain: 'Try Again',
      footer: 'smallchoices.app',
    },
  },
  bg: {
    translation: {
      questions: [
        'Кое избираш?',
        'Къде се чувстваш по-добре?',
        'Как живееш?',
        'Предпочиташ да работиш?',
      ],
      options: [
        ['Кафе', 'Чай'],
        ['Море', 'Планина'],
        ['Ред', 'Хаос'],
        ['Сам', 'В екип'],
      ],
      share: 'Сподели',
      tryAgain: 'Опитай пак',
      footer: 'smallchoices.app',
    },
  },
  es: {
    translation: {
      questions: [
        '¿Qué eliges?',
        '¿Dónde te sientes mejor?',
        '¿Cómo vives?',
        '¿Prefieres trabajar?',
      ],
      options: [
        ['Café', 'Té'],
        ['Mar', 'Montaña'],
        ['Orden', 'Caos'],
        ['Solo', 'Equipo'],
      ],
      share: 'Compartir',
      tryAgain: 'Intentar de nuevo',
      footer: 'smallchoices.app',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({resources, fallbackLng: 'en', interpolation: {escapeValue: false}});

export default i18n;
