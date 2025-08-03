import { Divider } from '@editor/components/shared/Divider';
import { Glass } from '@editor/components/shared/Glass';
import { Linear } from '@editor/components/shared/Linear';
import { Navbar } from '@editor/components/shared/Navbar';
import { NextPage } from 'next';
import Link from 'next/link';

enum Category {
  CLI = 'cli',
  Extension = 'extension',
}

const CommandLineInterfacePage: NextPage = () => {
  const downloads: { id: string; link: string; emoji: string; label: string; category: Category }[] = [
    {
      id: 'bash',
      link: 'https://github.com/hieudoanm/mark/tree/master/packages/cli/bash/dist',
      emoji: '🐚',
      label: 'Bash',
      category: Category.CLI,
    },
    {
      id: 'gh',
      link: 'https://github.com/hieudoanm/mark/tree/master/packages/cli/go.dev/gh/bin',
      emoji: '🐙',
      label: 'GitHub',
      category: Category.CLI,
    },
    {
      id: 'micro',
      link: 'https://github.com/hieudoanm/mark/tree/master/packages/cli/go.dev/micro/bin',
      emoji: '🐍',
      label: 'Micro',
      category: Category.CLI,
    },
    {
      id: 'ytts',
      link: 'https://github.com/hieudoanm/mark/tree/master/packages/cli/python.org/ytts/bin',
      emoji: '🎥',
      label: 'YTTS',
      category: Category.CLI,
    },
    {
      id: 'chess',
      link: 'https://github.com/hieudoanm/mark/tree/master/packages/extensions/chess/download',
      emoji: '♟️',
      label: 'Chess',
      category: Category.Extension,
    },
    {
      id: 'focus',
      link: 'https://github.com/hieudoanm/mark/tree/master/packages/extensions/focus/download',
      emoji: '🎯',
      label: 'Focus',
      category: Category.Extension,
    },
    {
      id: 'github',
      link: 'https://github.com/hieudoanm/mark/tree/master/packages/extensions/github/download',
      emoji: '🔗',
      label: 'GitHub',
      category: Category.Extension,
    },
  ];

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Linear.Background />
      <div className="relative z-10 flex h-full flex-col">
        <Navbar />
        <Divider />
        <div className="container mx-auto grow p-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            {downloads.map(({ id, link, emoji, label, category }) => (
              <div key={`${id}-${category}`} className="flex flex-col gap-y-2 md:gap-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-center text-lg md:text-xl">
                    {emoji} {label}
                  </h4>
                  <Glass.Badge>{category}</Glass.Badge>
                </div>
                <Link href={link} target="_blank">
                  <Glass.Button className="w-full">Download</Glass.Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandLineInterfacePage;
