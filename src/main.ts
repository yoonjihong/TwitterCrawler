import { Dataset, PlaywrightCrawler } from 'crawlee';
import dayjs from 'dayjs';

import router from './router/index';

const crawler = new PlaywrightCrawler({
  requestHandler: router,
  headless: true,
  maxRequestsPerMinute: 10,
});

(async () => {
  await crawler.run([
    { url: 'https://twitter.com/search?q=마블&src=typed_query&f=live', label: 'LIST' },
  ]);

  const data = await Dataset.getData();
  data.items.sort((a, b) => (a.created_at > b.created_at ? 1 : -1));

  data.items = data.items.filter(v => {
    const created_at = dayjs(v.created_at).format('YYYY-MM-DD');
    return '2022-10-27' < created_at && created_at <= '2022-10-28';
  });

  console.log('총 개수 : ', data.items.length);
})();
