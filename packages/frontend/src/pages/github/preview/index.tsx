import { GitHubSocialPreview } from '@editor/components/apps/github/GitHubSocialPreview';
import { Divider } from '@editor/components/shared/Divider';
import { Glass } from '@editor/components/shared/Glass';
import { Navbar } from '@editor/components/shared/Navbar';
import { NextPage } from 'next';
import { useState } from 'react';

const PreviewPage: NextPage = () => {
  const [
    {
      name = 'Hieu Doan',
      description = 'GitHub Profile',
      repository = 'hieudoanm/hieudoanm',
    },
    setState,
  ] = useState<{
    name: string;
    description: string;
    repository: string;
  }>({
    name: 'Hieu Doan',
    description: 'GitHub Profile',
    repository: 'hieudoanm/hieudoanm',
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <Divider />
      <div className="container mx-auto p-8">
        <div className="flex flex-col space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Glass.Input
              id="name"
              name="Name"
              placeholder="Name"
              value={name}
              onChange={(event) => {
                setState((previous) => ({
                  ...previous,
                  name: event.target.value,
                }));
              }}
            />
            <Glass.Input
              id="description"
              name="Description"
              placeholder="description"
              value={description}
              onChange={(event) => {
                setState((previous) => ({
                  ...previous,
                  description: event.target.value,
                }));
              }}
            />
            <Glass.Input
              id="repository"
              name="Repository"
              placeholder="repository"
              value={repository}
              onChange={(event) => {
                setState((previous) => ({
                  ...previous,
                  repository: event.target.value,
                }));
              }}
            />
          </div>
          <GitHubSocialPreview
            name={name}
            repository={repository}
            description={description}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
