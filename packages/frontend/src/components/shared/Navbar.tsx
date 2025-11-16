import { APP_NAME } from '@editor/constants/app';
import Link from 'next/link';
import { FC } from 'react';
import { Dropdown } from './Dropdown';

const links = [
  {
    id: 'clock',
    title: 'Clock',
    options: [
      { id: 'pomodoro', href: '/clock/pomodoro', label: 'Pomodoro' },
      { id: 'timezones', href: '/clock/timezones', label: 'Timezones' },
    ],
  },
  {
    id: 'dev',
    title: 'Dev',
    options: [
      { id: 'manifest', href: '/dev/manifest', label: 'Manifest' },
      {
        id: 'uuid',
        href: '/dev/uuid',
        label: 'Universally Unique Identifier (UUID)',
      },
    ],
  },
  {
    id: 'other',
    title: 'Other',
    options: [
      { id: 'doi', href: '/other/doi', label: 'DOI' },
      { id: 'football', href: '/other/football', label: 'Football' },
      { id: 'status', href: '/other/status', label: 'Status' },
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
