import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Card from '@/components/Card';
import {QUESTIONS, RESULTS} from '@/data';

export default function App() {
  const {t, i18n} = useTranslation();
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [sharedIndex, setSharedIndex] = useState<number | null>(null);
  const currentLang = i18n.language.split('-')[0];

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
  }, []);

  const handleAnswer = (value: string) => {
    setAnswers((prev) => [...prev, value]);
    setStep((prev) => prev + 1);
  };

  const resultIndex = sharedIndex ?? answers.length % RESULTS.length;
  const result = RESULTS[resultIndex];

  const shareImage = async (): Promise<void> => {
    const el = document.getElementById('share-card');
    if (!el) return;

    const {default: html2canvas} = await import('html2canvas');
    const canvas = await html2canvas(el, {scale: 3});
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'my-result.png';
    a.click();

    const url = new URL(window.location.href);
    url.pathname = `/r/${result.slug}`;
    url.searchParams.set('lng', i18n.language);
    window.history.replaceState({}, '', url.toString());

    try {
      await fetch(`/api/share?slug=${result.slug}&lng=${i18n.language}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-950 text-white p-4'>
      <div className='w-full max-w-md text-center'>
        <div className='flex justify-end gap-2 mb-4'>
          {['en', 'bg', 'es'].map((lng) => (
            <button
              key={lng}
              onClick={() => i18n.changeLanguage(lng)}
              className={`px-2 py-1 rounded text-xs border ${
                currentLang === lng
                  ? 'bg-white text-black border-white'
                  : 'border-neutral-700 text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              {lng.toUpperCase()}
            </button>
          ))}
        </div>

        {step < QUESTIONS.length ? (
          <div key={step} className='space-y-6'>
            <h2 className='text-xl'>{t(`questions.${step}`)}</h2>
            <div className='grid gap-4'>
              {(t(`options.${step}`, {returnObjects: true}) as string[]).map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className='border border-neutral-700 rounded-xl py-4 hover:bg-neutral-800 transition-colors'
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className='space-y-6'>
            <Card result={result} />
            <div className='flex justify-center gap-4'>
              <button onClick={shareImage} className='bg-white text-black px-4 py-2 rounded-xl'>
                {t('share')}
              </button>
              <button
                onClick={() => window.location.replace('/')}
                className='border border-neutral-700 px-4 py-2 rounded-xl'
              >
                {t('tryAgain')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
