import { APP_NAME } from '@editor/constants/app';
import Link from 'next/link';
import { FC } from 'react';
import { Dropdown } from './Dropdown';

const links = [
  {
    id: 'chess',
    title: 'Chess',
    options: [
      { id: 'chessboard', href: '/chess/board', label: 'Board' },
      { id: 'chess-elo', href: '/chess/elo', label: 'ELO' },
    ],
  },
  {
    id: 'clock',
    title: 'Clock',
    options: [
      { id: 'pomodoro', href: '/clock/pomodoro', label: 'Pomodoro' },
      { id: 'timezones', href: '/clock/timezones', label: 'Timezones' },
    ],
  },
  {
    id: 'converter',
    title: 'Converter',
    options: [
      { id: 'colors', href: '/converter/colors', label: 'Colors' },
      { id: 'csv', href: '/converter/csv', label: 'CSV' },
      { id: 'json', href: '/converter/json', label: 'JSON' },
      { id: 'strings', href: '/converter/strings', label: 'Strings' },
    ],
  },
  {
    id: 'dev',
    title: 'Dev',
    options: [
      { id: 'downloads', href: '/dev/downloads', label: 'Downloads' },
      { id: 'openapi2postmanv2', href: '/dev/openapi/postmanv2', label: 'OpenAPI to PostmanV2' },
      { id: 'reverse-proxy', href: '/dev/reverse/proxy', label: 'Reverse Proxy' },
      { id: 'uuid', href: '/dev/uuid', label: 'Universally Unique Identifier (UUID)' },
    ],
  },
  {
    id: 'editor',
    title: 'Editor',
    options: [
      { id: 'manifest', href: '/editor/manifest', label: 'Manifest' },
      { id: 'redact', href: '/editor/redact', label: 'Redact' },
    ],
  },
  {
    id: 'github',
    title: 'GitHub',
    options: [
      { id: 'languages', href: '/github/languages', label: 'Languages' },
      { id: 'social-preview', href: '/github/preview', label: 'Social Preview' },
    ],
  },
  {
    id: 'images',
    title: 'Images',
    options: [
      { id: 'filter', href: '/images/filter', label: 'Filter' },
      { id: 'ocr', href: '/images/ocr', label: 'OCR' },
      { id: 'qrcode', href: '/images/qrcode', label: 'QRCode' },
    ],
  },
  {
    id: 'other',
    title: 'Other',
    options: [
      { id: 'calculator', href: '/other/calculator', label: 'Calculator' },
      { id: 'chat', href: '/other/chat', label: 'Chat' },
      { id: 'doi', href: '/other/doi', label: 'DOI' },
      { id: 'status', href: '/other/status', label: 'Status' },
      { id: 'periodic-table', href: '/other/periodic-table', label: 'Periodic Table' },
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
