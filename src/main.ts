import { Dataset, PlaywrightCrawler } from 'crawlee';
import dayjs from 'dayjs';

import router from './router/index';

const crawler = new PlaywrightCrawler({
  requestHandler: router,
  headless: true,
});

const keyword = '마블';
export const collectionPeriod = ['2022-10-28', '2022-10-30'];

(async () => {
  await crawler.run([
    { url: `https://twitter.com/search?q=${keyword}&src=typed_query&f=live`, label: 'LIST' },
  ]);

  const data = await Dataset.getData();
  data.items.sort((a, b) => (a.created_at > b.created_at ? 1 : -1));

  data.items = data.items.filter(v => {
    const created_at = dayjs(v.created_at).format('YYYY-MM-DD');
    return collectionPeriod[0] < created_at && created_at <= collectionPeriod[1];
  });

  console.log('총 개수 : ', data.items.length);
})();
