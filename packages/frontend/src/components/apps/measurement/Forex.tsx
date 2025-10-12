import { Glass } from '@editor/components/shared/Glass';
import frankfurter from '@editor/json/finance/frankfurter.json';
import { formatCurrency } from '@editor/utils/number/format';
import { FC } from 'react';

export const Forex: FC = () => {
  const {
    amount = 1,
    base = '',
    rates = {} as Record<string, number>,
  } = frankfurter ?? { amount: 1, base: '', rates: {} };

  return (
    <Glass.Card className="h-full">
      <div className="scrollbar-none h-full divide-y divide-white/10 overflow-auto">
        {Object.entries(rates).map(([key, value]) => {
          return (
            <div
              key={key}
              className="flex items-center justify-between gap-2 py-2">
              <span className="">
                {amount} {base} to {key}
              </span>
              <span className="font-bold whitespace-nowrap">
                {formatCurrency(value, key)}
              </span>
            </div>
          );
        })}
      </div>
    </Glass.Card>
  );
};
