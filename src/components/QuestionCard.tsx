import {useTranslation} from 'react-i18next';
import Button from './Button';

interface QuestionCardProps {
  step: number;
  onAnswer: (value: string) => void;
}

export default function QuestionCard({step, onAnswer}: QuestionCardProps) {
  const {t} = useTranslation();
  const options = t(`options.${step}`, {returnObjects: true}) as string[];

  return (
    <div key={step} className='space-y-6'>
      <h2 className='text-xl'>{t(`questions.${step}`)}</h2>
      <div className='grid gap-4'>
        {options.map((option) => (
          <Button key={option} variant='option' size='md' onClick={() => onAnswer(option)} className='py-4'>
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}
