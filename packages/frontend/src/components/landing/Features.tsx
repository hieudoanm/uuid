import { Glass } from '@uuid/components/shared/Glass';
import Link from 'next/link';
import { FC, useState, useMemo, ChangeEvent } from 'react';

type Feature = { id: string; href: string; title: string; description: string };

export const Features: FC<{
  title: string;
  subtitle: string;
  features: Feature[];
}> = ({ title = '', subtitle = '', features = [] }) => {
  const [query, setQuery] = useState('');

  const filteredFeatures = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    return features.filter(
      ({ id, title, description }) =>
        id.toLowerCase().includes(lowerQuery) ||
        title.toLowerCase().includes(lowerQuery) ||
        description.toLowerCase().includes(lowerQuery),
    );
  }, [features, query]);

  return (
    <section className="container mx-auto px-8 py-16">
      <h2 className="mb-4 text-center text-2xl font-semibold md:text-3xl">
        {title}
      </h2>
      <p className="mx-auto mb-6 max-w-3xl text-center text-neutral-300">
        {subtitle}
      </p>
      <Glass.Input
        type="text"
        value={query}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setQuery(event.target.value)
        }
        placeholder="Filter features..."
        className="mb-8 w-full"
      />
      <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
        {filteredFeatures.map(({ id, href, title, description }) => (
          <Link key={id} href={href}>
            <Glass.Card>
              <h3 className="truncate overflow-hidden text-xl font-semibold whitespace-nowrap">
                {title}
              </h3>
              <p className="mt-2 line-clamp-2 text-neutral-400">
                {description}
              </p>
            </Glass.Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
