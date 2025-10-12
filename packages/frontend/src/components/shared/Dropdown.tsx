import Link from 'next/link';
import { FC } from 'react';

export const Dropdown: FC<{
  title: string;
  options: { id: string; href: string; label: string }[];
}> = ({ title = '', options = [] }) => {
  return (
    <div className="group relative inline-block text-left">
      <button
        type="button"
        className="inline-flex items-center justify-center gap-1 rounded-md">
        <span>{title}</span>
        <span className="text-xs">▾</span>
      </button>
      <div className="invisible absolute right-0 z-50 mt-2 origin-top-right scale-95 transform rounded-md border border-neutral-200 bg-white p-1 text-sm opacity-0 shadow-lg transition-all group-hover:visible group-hover:scale-100 group-hover:opacity-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100">
        {options.map(({ id, href, label }) => {
          return (
            <Link
              key={id}
              href={href}
              className="block rounded px-3 py-2 whitespace-nowrap hover:bg-neutral-100 dark:hover:bg-neutral-800">
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
