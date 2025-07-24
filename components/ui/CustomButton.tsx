// components/ui/CustomButton.tsx
import { ReactNode } from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  children: ReactNode;
};

export default function CustomButton({ href, children }: Props) {
  return (
    <Link href={href}>
      <div className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg transition text-center inline-block">
        {children}
      </div>
    </Link>
  );
}
