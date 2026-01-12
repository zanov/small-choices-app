import {useTranslation} from 'react-i18next';
import Button from './Button';

interface ResultActionsProps {
  onShare: () => Promise<void>;
  onDownload: () => Promise<void>;
  onTryAgain: () => void;
}

export default function ResultActions({onShare, onDownload, onTryAgain}: ResultActionsProps) {
  const {t} = useTranslation();

  return (
    <div className='flex justify-center gap-4'>
      <Button variant='primary' size='md' onClick={onShare} className='rounded-xl'>
        {t('share')}
      </Button>
      <Button variant='secondary' size='md' onClick={onDownload} className='rounded-xl'>
        {t('download')}
      </Button>
      <Button variant='secondary' size='md' onClick={onTryAgain} className='rounded-xl'>
        {t('tryAgain')}
      </Button>
    </div>
  );
}
