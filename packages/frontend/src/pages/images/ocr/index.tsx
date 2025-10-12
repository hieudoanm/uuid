import { Divider } from '@editor/components/shared/Divider';
import { Navbar } from '@editor/components/shared/Navbar';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const OCR = dynamic(() => import('@editor/components/apps/images/OCR'), {
  ssr: false,
});

const ImagesOCRPage: NextPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Divider />
      <OCR />
    </div>
  );
};

export default ImagesOCRPage;
