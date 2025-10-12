import { Divider } from '@editor/components/shared/Divider';
import { Glass } from '@editor/components/shared/Glass';
import { Linear } from '@editor/components/shared/Linear';
import { Navbar } from '@editor/components/shared/Navbar';
import { download } from '@editor/utils/download';
import { toDataURL } from 'qrcode';
import { FC, useState } from 'react';

const QRCode: FC = () => {
  const [{ dataURL = '', url = 'https://google.com' }, setState] = useState<{
    dataURL: string;
    url: string;
  }>({
    dataURL: '',
    url: 'https://google.com',
  });

  const generate = async () => {
    const dataURL = await toDataURL(url, {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      width: 512,
      margin: 1,
      color: {
        dark: '#F5F5F5', // QR code dots (white)
        light: '#171717', // Background (black)
      },
    });
    setState((previous) => ({ ...previous, dataURL }));
  };

  return (
    <div className="h-screen">
      <Linear.Background />
      <div className="relative z-10 flex h-full flex-col">
        <Navbar />
        <Divider />
        <div className="container mx-auto flex w-full grow flex-col items-center justify-center gap-y-8 p-8">
          <div className="flex w-full flex-col justify-center gap-4 md:flex-row md:gap-8">
            <Glass.Input
              id="url"
              name="url"
              placeholder="URL"
              className="grow"
              value={url}
            />
            <Glass.Button
              type="button"
              className="w-full md:w-auto"
              onClick={() => {
                generate();
              }}>
              Generate
            </Glass.Button>
            {dataURL && (
              <Glass.Button
                type="button"
                className="w-full md:w-auto"
                onClick={() => {
                  download({
                    content: dataURL,
                    format: 'jpg',
                    filename: 'qrcode',
                  }).image();
                }}>
                Download
              </Glass.Button>
            )}
          </div>
          {dataURL && (
            <div className="w-full">
              <div
                className="mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-neutral-800 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${dataURL})` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCode;
