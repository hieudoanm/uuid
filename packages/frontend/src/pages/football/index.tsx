import { Divider } from '@editor/components/shared/Divider';
import { Glass } from '@editor/components/shared/Glass';
import { Navbar } from '@editor/components/shared/Navbar';
import { useState } from 'react';

const formations: Record<string, string[][]> = {
  '3-5-2': [['ST', 'ST'], ['LM', 'CM', 'CM', 'CM', 'RM'], ['LCB', 'CB', 'RCB'], ['GK']],
  '4-3-3': [['LW', 'ST', 'RW'], ['AM', 'DM', 'CM'], ['LB', 'LCB', 'RCB', 'RB'], ['GK']],
  '4-2-3-1': [['ST'], ['LW', 'AM', 'RW'], ['DM', 'DM'], ['LB', 'LCB', 'RCB', 'RB'], ['GK']],
  '4-1-2-1-2': [['ST', 'ST'], ['AM'], ['CM', 'CM'], ['DM'], ['LB', 'LCB', 'RCB', 'RB'], ['GK']],
  '5-4-1': [['ST'], ['LM', 'CM', 'CM', 'RM'], ['LWB', 'LCB', 'CB', 'RCB', 'RWB'], ['GK']],
  '5-3-2': [['ST', 'ST'], ['CM', 'CM', 'CM'], ['LWB', 'LCB', 'CB', 'RCB', 'RWB'], ['GK']],
};

const players: Record<string, string[]> = {
  GK: ['1. Alisson Becker', '25. Giorgi Mamardashvili'],
  RB: ['12. Conor Bradley', '30. Jeremie Frimpong'],
  RCB: ['5. Ibrahima Konaté', '2. Joe Gomez'],
  LCB: ['4. Virgil van Dijk', '15. Giovanni Leoni'],
  LB: ['6. Milos Kerkez', '26. Andrew Robertson'],
  DM: ['38. Ryan Gravenberch', '3. Wataru Endo'],
  CM: ['8. Dominik Szoboszlai', '10. Alexis Mac Allister'],
  AM: ['7. Florian Wirtz', '17. Curtis Jones'],
  RW: ['11. Mohamed Salah'],
  ST: ['9. Alexander Isak', '22. Hugo Ekitike'],
  LW: ['18. Cody Gakpo', '14. Federico Chiesa'],
};

const FootballPage = () => {
  const [{ key = '', formation = [] }, setFormation] = useState<{ key: string; formation: string[][] }>({
    key: '4-3-3',
    formation: formations['4-3-3'],
  });

  return (
    <div className="flex min-h-screen w-screen flex-col">
      <Navbar />
      <Divider />
      <main className="container mx-auto grow p-4 md:p-8">
        <div className="flex flex-col items-center justify-between gap-y-4 md:gap-y-8">
          {/* Formation Selector */}
          <Glass.Select
            value={key}
            onChange={(event) => {
              const newKey = event.target.value;
              const newFormation = JSON.parse(JSON.stringify(formations[newKey]));
              setFormation({ key: newKey, formation: newFormation });
            }}
            className="w-full">
            {Object.keys(formations).map((formation) => (
              <option key={formation} value={formation}>
                {formation}
              </option>
            ))}
          </Glass.Select>
          {/* Pitch */}
          <Glass.Card className="aspect-[2/3] w-full overflow-auto">
            <div className={`grid h-full grid-rows-${formation.length}`}>
              {formation.map((rows: string[], index: number) => {
                return (
                  <div key={`${key}-${index}`} className="row-span-1">
                    <div className="flex h-full w-full items-center justify-between gap-16">
                      {rows.map((position: string, number: number) => (
                        <div
                          key={`player-${position}-${number}`}
                          className="flex h-full w-full flex-col items-center justify-center gap-y-4">
                          <Glass.Card className="flex h-12 w-12 items-center justify-center rounded-full">
                            {position}
                          </Glass.Card>
                          <div className="flex flex-col items-center justify-center gap-y-2 text-xs">
                            {(players[position] ?? []).map((player: string) => (
                              <div key={player} title={player} className="w-36 truncate text-center">
                                {player}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Glass.Card>
        </div>
      </main>
    </div>
  );
};

export default FootballPage;
