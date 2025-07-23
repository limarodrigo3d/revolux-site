// components/ui/CustomButton.tsx
'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  href: string;
};

export default function CustomButton({ children, href }: Props) {
  return (
    <Link
      href={href}
      className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
    >
      {children}
    </Link>
  );
}
