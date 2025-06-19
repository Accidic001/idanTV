'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface BackButtonProps {
  className?: string;
  text?: string;
}

export default function BackButton({ className = '', text = 'Back' }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 text-gray-900 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors ${className}`}
      aria-label="Go back"
    >
      <ArrowLeftIcon className="h-5 w-5" />
      {text}
    </button>
  );
}