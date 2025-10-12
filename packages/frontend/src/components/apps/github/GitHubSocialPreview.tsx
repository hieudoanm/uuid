import { FC, useRef } from 'react';

export const GitHubSocialPreview: FC<{
  name: string;
  description: string;
  repository: string;
}> = ({ name = '', description = '', repository = '' }) => {
  const divRef = useRef(null);

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-neutral-800">
      <div className="h-[640px] w-[1280px]">
        <div
          ref={divRef}
          className="flex h-full w-full items-center justify-center bg-neutral-900">
          <div className="flex flex-col gap-y-8">
            {name && (
              <p className="text-center text-3xl leading-none">
                {(name ?? '').trim()}
              </p>
            )}
            {repository && (
              <p className="text-center text-6xl leading-none">
                {(repository ?? '').trim()}{' '}
              </p>
            )}
            {description && (
              <p className="text-center text-base leading-none md:text-lg lg:text-xl xl:text-2xl">
                {(description ?? '').trim()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
