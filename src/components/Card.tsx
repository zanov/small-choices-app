import {Result} from '@/types';

interface CardProps {
  result: Result;
}

export default function Card({result}: CardProps) {
  return (
    <div
      id='share-card'
      className={`rounded-3xl p-8 w-[360px] h-[640px] mx-auto mb-6 flex flex-col justify-between bg-gradient-to-br ${result.theme}`}
    >
      <div>
        <h2 className='text-3xl font-bold mb-2'>{result.title}</h2>
        <div className='italic opacity-80 mb-6'>{result.subtitle}</div>
        <p className='text-xl'>{result.text}</p>
      </div>
      <div className='text-sm opacity-60'>SmallChoices.app</div>
    </div>
  );
}
