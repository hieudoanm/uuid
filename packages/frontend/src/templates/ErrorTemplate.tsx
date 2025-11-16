import { Glass } from '@editor/components/shared/Glass';
import { Linear } from '@editor/components/shared/Linear';
import Link from 'next/link';
import { FC } from 'react';

export const ErrorTemplate: FC<{
  code: string;
  message: string;
  action: string;
}> = ({ code = '', message = '', action = '' }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 px-4 text-neutral-100">
      <Linear.Background />
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <h1 className="text-6xl font-bold">{code}</h1>
        <p className="max-w-sm text-xl text-neutral-400">{message}</p>
        <Link href="/">
          <Glass.Button>{action}</Glass.Button>
        </Link>
      </div>
    </main>
  );
};
