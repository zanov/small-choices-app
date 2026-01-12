import Card from '@/components/Card';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import QuestionCard from '@/components/QuestionCard';
import ResultActions from '@/components/ResultActions';
import {useQuiz} from '@/hooks/useQuiz';
import {useShareImage} from '@/hooks/useShareImage';

export default function App() {
  const {step, isComplete, localizedResult, handleAnswer} = useQuiz();
  const {shareImage, downloadImage} = useShareImage();

  const handleShare = async () => {
    await shareImage(localizedResult);
  };

  const handleDownload = async () => {
    await downloadImage(localizedResult);
  };

  const handleTryAgain = () => {
    window.location.replace('/');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-950 text-white p-4'>
      <div className='w-full max-w-md text-center'>
        <LanguageSwitcher />

        {isComplete ? (
          <div className='space-y-6'>
            <Card result={localizedResult} />
            <ResultActions
              onShare={handleShare}
              onDownload={handleDownload}
              onTryAgain={handleTryAgain}
            />
          </div>
        ) : (
          <QuestionCard step={step} onAnswer={handleAnswer} />
        )}
      </div>
    </div>
  );
}
