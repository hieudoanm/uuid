import { Divider } from '@editor/components/shared/Divider';
import { Navbar } from '@editor/components/shared/Navbar';
import dynamic from 'next/dynamic';

const Filter = dynamic(() => import('@editor/components/apps/images/Filter'), {
  ssr: false,
});

const ImagesFilterPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Divider />
      <Filter />
    </div>
  );
};

export default ImagesFilterPage;
