import { Angle } from '@editor/components/apps/measurement/Angle';
import { Base } from '@editor/components/apps/measurement/Base';
import { Crypto } from '@editor/components/apps/measurement/Crypto';
import { Data } from '@editor/components/apps/measurement/Data';
import { Forex } from '@editor/components/apps/measurement/Forex';
import { Length } from '@editor/components/apps/measurement/Length';
import { Roman } from '@editor/components/apps/measurement/Roman';
import { Temperature } from '@editor/components/apps/measurement/Temperature';
import { Time } from '@editor/components/apps/measurement/Time';
import { Weight } from '@editor/components/apps/measurement/Weight';
import { Divider } from '@editor/components/shared/Divider';
import { Glass } from '@editor/components/shared/Glass';
import { Linear } from '@editor/components/shared/Linear';
import { Navbar } from '@editor/components/shared/Navbar';
import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';

enum Measurement {
  Angle = 'angle',
  Base = 'base',
  Crypto = 'crypto',
  Data = 'data',
  Forex = 'forex',
  Length = 'length',
  Roman = 'roman',
  Temperature = 'temperature',
  Time = 'time',
  Weight = 'weight',
}

const AnglePage: NextPage = () => {
  const [{ measurement }, setState] = useState<{ measurement: Measurement }>({
    measurement: Measurement.Angle,
  });

  return (
    <div className="h-screen w-screen">
      <Linear.Background />
      <div className="relative z-10 flex h-full flex-col">
        <Navbar />
        <Divider />
        <div className="container mx-auto flex grow items-center justify-center p-4 md:p-8">
          <div className="flex flex-col items-center justify-center gap-y-4 md:gap-y-8">
            <Glass.Select
              name="measurement"
              className="w-full"
              value={measurement}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                setState((previous) => ({
                  ...previous,
                  measurement: event.target.value as Measurement,
                }));
              }}>
              <option value={Measurement.Angle}>Angle</option>
              <option value={Measurement.Base}>Base</option>
              <option value={Measurement.Crypto}>Crypto</option>
              <option value={Measurement.Data}>Data</option>
              <option value={Measurement.Forex}>Forex</option>
              <option value={Measurement.Length}>Length</option>
              <option value={Measurement.Roman}>Roman</option>
              <option value={Measurement.Temperature}>Temperature</option>
              <option value={Measurement.Time}>Time</option>
              <option value={Measurement.Weight}>Weight</option>
            </Glass.Select>
            {measurement === Measurement.Angle && <Angle />}
            {measurement === Measurement.Base && <Base />}
            {measurement === Measurement.Crypto && <Crypto />}
            {measurement === Measurement.Data && <Data />}
            {measurement === Measurement.Forex && <Forex />}
            {measurement === Measurement.Length && <Length />}
            {measurement === Measurement.Roman && <Roman />}
            {measurement === Measurement.Temperature && <Temperature />}
            {measurement === Measurement.Time && <Time />}
            {measurement === Measurement.Weight && <Weight />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnglePage;
