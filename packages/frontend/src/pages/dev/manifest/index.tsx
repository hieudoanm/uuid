/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from '@editor/components/shared/Divider';
import { Glass } from '@editor/components/shared/Glass';
import { Navbar } from '@editor/components/shared/Navbar';
import {
  INITIAL_MANIFEST_EXTENSION,
  INITIAL_MANIFEST_PWA,
} from '@editor/constants/initial';
import { json, jsonParse } from '@editor/utils/json/json';
import { ChangeEvent, useState } from 'react';

const EditorPage = () => {
  const [{ manifest = '', type = '' }, setState] = useState<{
    manifest: string;
    type: 'extension' | 'pwa';
  }>({
    manifest: json(INITIAL_MANIFEST_EXTENSION).format().beautify(),
    type: 'extension',
  });

  return (
    <div className="flex h-screen w-screen flex-col">
      <Navbar />
      <Divider />
      <main className="container mx-auto grow p-4 md:p-8">
        <div className="flex h-full flex-col gap-y-4 md:gap-y-8">
          <div className="grid grid-cols-3 gap-x-4 md:gap-x-8">
            <Glass.Button
              type="button"
              onClick={() => {
                const newManifest = json(jsonParse(manifest, []))
                  .format()
                  .beautify();
                setState((previous) => ({
                  ...previous,
                  manifest: newManifest,
                }));
              }}>
              Beautify
            </Glass.Button>
            <Glass.Button
              type="button"
              onClick={() => {
                const newManifest = json(jsonParse(manifest, []))
                  .format()
                  .minify();
                setState((previous) => ({
                  ...previous,
                  manifest: newManifest,
                }));
              }}>
              Minify
            </Glass.Button>
            <Glass.Button
              type="button"
              onClick={() => {
                const newManifest = json(jsonParse(manifest, []))
                  .format()
                  .sort();
                setState((previous) => ({
                  ...previous,
                  manifest: newManifest,
                }));
              }}>
              Sort
            </Glass.Button>
          </div>
          <Glass.Select
            id="file-format"
            name="file-format"
            className="appearance-none px-4 py-2"
            value={type}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setState((previous) => {
                const type = event.target.value as 'extension' | 'pwa';
                const newManifest =
                  type === 'extension'
                    ? json(INITIAL_MANIFEST_EXTENSION, {} as any)
                        .format()
                        .beautify()
                    : json(INITIAL_MANIFEST_PWA, {} as any)
                        .format()
                        .beautify();
                return { ...previous, type, manifest: newManifest };
              })
            }>
            <option value="extension">Extension</option>
            <option value="pwa">PWA</option>
          </Glass.Select>
          <Glass.TextArea
            id="manifest.json"
            name="manifest.json"
            placeholder="manifest.json"
            className="scrollbar-none h-full w-full resize-none p-4 whitespace-nowrap"
            value={manifest}
            onChange={(event) => {
              const newManifest: string = event.target.value;
              setState((previous) => {
                return { ...previous, manifest: newManifest };
              });
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default EditorPage;
