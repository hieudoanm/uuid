import { GitHubLanguages } from '@editor/components/apps/github/GitHubLanguages';
import { Divider } from '@editor/components/shared/Divider';
import { Glass } from '@editor/components/shared/Glass';
import { Navbar } from '@editor/components/shared/Navbar';
import { NextPage } from 'next';
import { ChangeEvent, useRef, useState } from 'react';

const LanguagesPage: NextPage = () => {
  const [{ repository = 'hieudoanm/hieudoanm' }, setState] = useState<{
    repository: string;
  }>({
    repository: 'hieudoanm/hieudoanm',
  });
  const divRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Divider />
      <div className="container mx-auto p-8">
        <div className="mx-auto flex max-w-md flex-col gap-y-8">
          <Glass.Input
            id="repository"
            name="repository"
            placeholder="GitHub Repository"
            value={repository}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setState((previous) => ({
                ...previous,
                repository: event.target.value,
              }));
            }}
          />
          <GitHubLanguages ref={divRef} repository={repository} />
        </div>
      </div>
    </div>
  );
};

export default LanguagesPage;
