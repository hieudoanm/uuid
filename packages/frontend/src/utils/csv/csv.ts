type Options = {
  delimiter?: string;
  quote?: string;
};

const defaultOptions: Required<Options> = {
  delimiter: ',',
  quote: '"',
};

/**
 * Converts a CSV string into an array of objects.
 */
export const csv2json = <T extends Record<string, string>>(
  input: string,
  options: Options = defaultOptions,
): T[] => {
  const { delimiter, quote } = { ...defaultOptions, ...options };

  // Split into lines and trim trailing newlines
  const lines = input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return [];

  // Extract header row
  const rawHeader = lines[0];
  const headers = rawHeader
    .split(delimiter)
    .map((h) => h.replace(new RegExp(quote, 'g'), '').trim());

  // Parse each row into an object
  return lines.slice(1).map((row) => {
    const cells = row.split(delimiter);
    const record = {} as Record<string, string>;

    headers.forEach((header, idx) => {
      const rawValue = cells[idx] ?? '';
      const cleaned = rawValue.replace(new RegExp(quote, 'g'), '').trim();
      record[header] = cleaned;
    });

    return record as T;
  });
};

/**
 * Converts CSV to Markdown table format.
 */
export const csv2md = (csv: string): string => {
  const data = csv2json(csv);
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);

  // Calculate column widths based on max header/value length
  const columnWidths = headers.map((header) =>
    Math.max(header.length, ...data.map((row) => (row[header] ?? '').length)),
  );

  const formatRow = (values: string[]) =>
    `| ${values.map((val, i) => val.padEnd(columnWidths[i], ' ')).join(' | ')} |`;

  const headerRow = formatRow(headers);
  const dividerRow = `| ${columnWidths.map((len) => '-'.repeat(len)).join(' | ')} |`;
  const bodyRows = data.map((row) =>
    formatRow(headers.map((h) => row[h] ?? '')),
  );

  return [headerRow, dividerRow, ...bodyRows].join('\n');
};

/**
 * Converts CSV to SQL insert statements.
 */
export const csv2sql = (csv: string, table = 'schema.table'): string => {
  const data = csv2json(csv);
  if (data.length === 0) return '';

  return data
    .map((row) => {
      const columns = Object.keys(row)
        .map((col) => `"${col}"`)
        .join(', ');

      const values = Object.values(row)
        .map((val) => `"${val}"`)
        .join(', ');

      return `INSERT INTO ${table} (${columns}) VALUES (${values});`;
    })
    .join('\n');
};

export enum Format {
  JSON = 'json',
  Markdown = 'md',
  SQL = 'sql',
}

/**
 * High-level API: format CSV into various formats.
 */
export const csv = (input: string) => ({
  format: (format: Format): string => {
    switch (format) {
      case Format.JSON:
        return JSON.stringify(csv2json(input), null, 2);
      case Format.Markdown:
        return csv2md(input);
      case Format.SQL:
        return csv2sql(input);
      default:
        return input;
    }
  },
});
