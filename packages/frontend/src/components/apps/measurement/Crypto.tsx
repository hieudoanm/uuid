import { Glass } from '@editor/components/shared/Glass';
import coinRanking from '@editor/json/finance/coinranking.json';

type CoinRanking = {
  data: {
    coins: {
      uuid: string;
      name: string;
      symbol: string;
      color: string;
      iconUrl: string;
      marketCap: string;
      price: string;
      rank: number;
      sparkline: string[];
      lowVolume: boolean;
    }[];
  };
};

export const Crypto = () => {
  const { data: responseData } = (coinRanking as CoinRanking) ?? {
    data: { coins: [] },
  };
  const { coins = [] } = responseData ?? { coins: [] };

  return (
    <Glass.Card className="h-full">
      <div className="scrollbar-none h-full divide-y divide-white/10 overflow-auto">
        {coins.map((coin) => {
          const {
            rank = 0,
            uuid = '',
            name = '',
            symbol = '',
            marketCap = '0',
            price = '0',
          } = coin;

          return (
            <div
              key={uuid}
              className="flex items-center justify-between gap-2 py-2">
              <div>
                <p className="text-xs">
                  {rank}. {symbol}
                </p>
                <h3
                  title={name}
                  className="w-32 truncate font-bold whitespace-nowrap">
                  {name}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-xs">
                  ${parseFloat(marketCap).toLocaleString('en-US')}
                </p>
                <p title={price} className="font-bold whitespace-nowrap">
                  ${parseFloat(price).toLocaleString('en-US')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Glass.Card>
  );
};
