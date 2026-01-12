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
      results: {
        'tihiqt-dalbok': {
          title: 'The Quiet Deep',
          subtitle: 'Calm is not escape, it is a choice.',
          text: 'You seek silence to hear yourself.',
        },
        'budniqt-nabliudatel': {
          title: 'The Wakeful Observer',
          subtitle: 'You see more than you say.',
          text: 'While others rush, you understand.',
        },
      },
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
      results: {
        'tihiqt-dalbok': {
          title: 'Тихият дълбок',
          subtitle: 'Спокойствието не е бягство, а избор.',
          text: 'Ти търсиш тишината, за да чуеш себе си.',
        },
        'budniqt-nabliudatel': {
          title: 'Будният наблюдател',
          subtitle: 'Виждаш повече, отколкото казваш.',
          text: 'Докато другите бързат, ти разбираш.',
        },
      },
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
      results: {
        'tihiqt-dalbok': {
          title: 'El Silencioso Profundo',
          subtitle: 'La calma no es fuga, es elección.',
          text: 'Buscas el silencio para escucharte.',
        },
        'budniqt-nabliudatel': {
          title: 'El Observador Despierto',
          subtitle: 'Ves más de lo que dices.',
          text: 'Mientras otros corren, tú comprendes.',
        },
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({resources, fallbackLng: 'en', interpolation: {escapeValue: false}});

export default i18n;
