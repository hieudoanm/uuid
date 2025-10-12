import dynamic from 'next/dynamic';

const Redact = dynamic(() => import('@editor/components/apps/Redact'), {
  ssr: false,
});

const RedactPage = () => {
  return <Redact />;
};

export default RedactPage;
