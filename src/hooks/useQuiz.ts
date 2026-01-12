import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {QUESTIONS, RESULTS} from '@/data';
import {Result} from '@/types';

export function useQuiz() {
  const {t, i18n} = useTranslation();
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [sharedIndex, setSharedIndex] = useState<number | null>(null);

  // Detect deep link and language
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lng') || 'en';
    i18n.changeLanguage(lang);

    if (window.location.pathname.startsWith('/r/')) {
      const slug = window.location.pathname.replace('/r/', '');
      const index = RESULTS.findIndex((r) => r.slug === slug);
      if (index !== -1) {
        setSharedIndex(index);
        setStep(QUESTIONS.length);
      }
    }
  }, [i18n]);

  const handleAnswer = (value: string) => {
    setAnswers((prev) => [...prev, value]);
    setStep((prev) => prev + 1);
  };

  const resultIndex = sharedIndex ?? answers.length % RESULTS.length;
  const result = RESULTS[resultIndex];
  const localizedResult: Result = {
    ...result,
    title: t(`results.${result.slug}.title`) || result.title,
    subtitle: t(`results.${result.slug}.subtitle`) || result.subtitle,
    text: t(`results.${result.slug}.text`) || result.text,
  };

  const isComplete = step >= QUESTIONS.length;

  return {
    step,
    answers,
    isComplete,
    localizedResult,
    handleAnswer,
  };
}
