import { Divider } from '@micro/components/shared/Divider';
import { Glass } from '@micro/components/shared/Glass';
import { Navbar } from '@micro/components/shared/Navbar';
import { useState } from 'react';
import { v1, v4, v7 } from 'uuid';

const UUIDPage = () => {
  const [{ uuidV1 = v1(), uuidV4 = v4(), uuidV7 = v7() }, setState] = useState<{
    uuidV1: string;
    uuidV4: string;
    uuidV7: string;
  }>({
    uuidV1: v1(),
    uuidV4: v4(),
    uuidV7: v7(),
  });

  return (
    <div className="flex h-screen w-screen flex-col">
      <Navbar />
      <Divider />
      <div className="container mx-auto flex flex-col gap-y-4 p-4 md:gap-y-8 md:p-8">
        {[
          { version: 'uuidV1', label: 'uuid.v1', value: uuidV1 },
          { version: 'uuidV4', label: 'uuid.v4', value: uuidV4 },
          { version: 'uuidV7', label: 'uuid.v7', value: uuidV7 },
        ].map(({ version, label, value }) => {
          return (
            <>
              <div
                key={version}
                className="flex flex-col items-center gap-4 md:flex-row">
                <Glass.Input
                  id="v4"
                  name="v4"
                  placeholder="V4"
                  className="grow text-center text-sm md:text-base"
                  defaultValue={value}
                />
                <Glass.Button
                  type="button"
                  className="w-full text-sm md:w-auto md:text-base"
                  onClick={() => {
                    let newUUID = '';
                    if (version === 'uuidV1') newUUID = v1();
                    if (version === 'uuidV4') newUUID = v4();
                    if (version === 'uuidV7') newUUID = v7();
                    setState((previous) => ({
                      ...previous,
                      [version]: newUUID,
                    }));
                  }}>
                  {label}
                </Glass.Button>
              </div>
              <Divider />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default UUIDPage;
