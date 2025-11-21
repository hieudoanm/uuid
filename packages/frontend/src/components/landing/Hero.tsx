import { Glass } from '@uuid/components/shared/Glass';
import { Linear } from '@uuid/components/shared/Linear';
import Link from 'next/link';
import { FC } from 'react';

type HeroProps = {
  headline: string;
  tagline: string;
  action: string;
  href: string;
};

export const Hero: FC<HeroProps> = ({
  headline = '',
  tagline = '',
  action = '',
  href = '',
}) => {
  return (
    <header className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="mb-4 max-w-5xl text-4xl font-extrabold md:text-5xl">
        <Linear.Text>{headline}</Linear.Text>
      </h1>
      <p className="mb-8 max-w-3xl text-neutral-100">{tagline}</p>
      <Link href={href} className="w-full md:w-auto">
        <Glass.Button>{action}</Glass.Button>
      </Link>
    </header>
  );
};
