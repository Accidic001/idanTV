// 'use client';

// import { useRouter } from 'next/navigation';
// import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// interface BackButtonProps {
//   className?: string;
//   text?: string;
// }

// export default function BackButton({ className = '', text = 'Back' }: BackButtonProps) {
//   const router = useRouter();

//   const handleClick = () => {
//     router.back();
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className={`flex items-center gap-2 text-black hover:text-blue-600 transition-colors ${className}`}
//       aria-label="Go back"
//     >
//       <ArrowLeftIcon className="h-5 w-5" />
//       {text}
//     </button>
//   );
// }


// components/BackButton.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
      Back
    </button>
  );
}