// components/ui/CustomButton.tsx
import { ReactNode } from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  children: ReactNode;
};

export default function CustomButton({ href, children }: Props) {
  return (
    <Link
      href={href}
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-base md:text-lg font-medium transition-colors duration-200 shadow-md"
    >
      {children}
    </Link>
  );
}
