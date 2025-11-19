import { APP_NAME } from '@micro/constants/app';
import Link from 'next/link';
import { FC } from 'react';
import { Dropdown } from './Dropdown';

const links = [
  {
    id: 'apps',
    title: 'Apps',
    options: [
      { id: 'pomodoro', href: '/apps/pomodoro', label: 'Pomodoro' },
      {
        id: 'uuid',
        href: '/apps/uuid',
        label: 'Universally Unique Identifier (UUID)',
      },
    ],
  },
];

export const Navbar: FC = () => {
  return (
    <nav className="container mx-auto px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link href="/">{APP_NAME}</Link>
        </div>
        <div className="hidden space-x-4 lg:flex">
          {links.map(({ id, title, options }) => {
            return <Dropdown key={id} title={title} options={options} />;
          })}
        </div>
      </div>
    </nav>
  );
};
