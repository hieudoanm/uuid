import { Divider } from '@editor/components/shared/Divider';
import { Glass } from '@editor/components/shared/Glass';
import { Navbar } from '@editor/components/shared/Navbar';
import { copy } from '@editor/utils/copy';
import { csv, csv2json, csv2sql, Format } from '@editor/utils/csv/csv';
import { NextPage } from 'next';
import { ChangeEvent, FC, useState } from 'react';

const DELIMITER = ',';

export const INITIAL_CSV: string = `header1,header2,header3,header4
value1,value2,value3,value4
value1,value2,value3,value4
value1,value2,value3,value4
value1,value2,value3,value4`;

const Table: FC<{ csv: string }> = ({ csv = '' }) => {
  const data: Record<string, string>[] = csv2json(csv, { delimiter: DELIMITER });

  return (
    <div className="flex flex-col gap-y-4 md:gap-y-8">
      <div className="w-full overflow-auto rounded border border-neutral-800">
        <table id="csv-html-table" className="w-full">
          {data[0] ? (
            <thead>
              <tr>
                {Object.keys(data[0]).map((key: string) => {
                  return (
                    <th key={key} align="left">
                      <p className="truncate p-2" title={key}>
                        {key}
                      </p>
                    </th>
                  );
                })}
              </tr>
            </thead>
          ) : (
            <></>
          )}
          <tbody>
            {data.map((item: Record<string, string>) => {
              return (
                <tr key={`row-${JSON.stringify(item)}`} className="border-t border-neutral-800">
                  {Object.values(item).map((value: string) => {
                    return (
                      <td key={value}>
                        <p className="truncate p-2" title={value}>
                          {value}
                        </p>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="cursor-pointer rounded-lg bg-neutral-100 px-4 py-2 text-neutral-900"
        onClick={() => {
          const csvHtmlTable: string = document.getElementById('csv-html-table')?.outerHTML ?? '';
          copy(csvHtmlTable);
        }}>
        Copy
      </button>
    </div>
  );
};

const CSVPage: NextPage = () => {
  const [{ from = INITIAL_CSV, to = '', format = 'html' }, setState] = useState<{
    from: string;
    to: string;
    format: Format;
  }>({
    from: INITIAL_CSV,
    to: csv2sql(INITIAL_CSV),
    format: Format.SQL,
  });

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <Navbar />
      <Divider />
      <main className="container mx-auto grow p-4 md:p-8">
        <div className="flex h-full flex-col gap-y-4 md:gap-y-8">
          <Glass.Select
            id="file-format"
            name="file-format"
            className="appearance-none rounded-full border border-neutral-800 px-4 py-2"
            value={format}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setState((previous) => {
                const newFormat = event.target.value as Format;
                const to = csv(from).format(newFormat);
                return { ...previous, format: newFormat, to };
              })
            }>
            <option value="html">HTML</option>
            <option value="json">JSON</option>
            <option value="md">Markdown</option>
            <option value="sql">SQL</option>
          </Glass.Select>
          <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            <div className="col-span-1">
              <Glass.TextArea
                id="from"
                name="from"
                placeholder="From"
                className="h-full w-full resize-none p-4 whitespace-nowrap"
                value={from}
                onChange={(event) => {
                  setState((previous) => {
                    const to = csv(from).format(format as Format);
                    return { ...previous, from: event.target.value, to };
                  });
                }}
              />
            </div>
            <div className="col-span-1">
              {format === 'html' ? (
                <Table csv={from} />
              ) : (
                <Glass.TextArea
                  id="to"
                  name="to"
                  placeholder="To"
                  className="h-full w-full resize-none p-4 whitespace-nowrap"
                  value={to}
                  readOnly
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CSVPage;
