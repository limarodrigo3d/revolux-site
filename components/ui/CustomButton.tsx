'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

type CustomButtonProps = {
  href: string;
  children: ReactNode;
};

export default function CustomButton({ href, children }: CustomButtonProps) {
  return (
    <Link
      href={href}
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg transition"
    >
      {children}
    </Link>
  );
}
