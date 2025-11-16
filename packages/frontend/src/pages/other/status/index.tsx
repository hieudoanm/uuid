import { Status } from '@editor/components/apps/Status';
import { Divider } from '@editor/components/shared/Divider';
import { Linear } from '@editor/components/shared/Linear';
import { Navbar } from '@editor/components/shared/Navbar';

const StatusPage = () => {
  return (
    <div className="min-h-screen">
      <Linear.Background />
      <div className="relative z-10 flex flex-col">
        <Navbar />
        <Divider />
        <div className="container mx-auto grow overflow-auto p-4 md:p-8">
          <Status />
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
