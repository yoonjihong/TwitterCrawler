import { Page } from 'playwright';
import { Dataset } from 'crawlee';
import dayjs from 'dayjs';
import { HandleParams } from '../index';
import { collectionPeriod } from '../../main';

const getData = async (page: Page): Promise<Record<any, any>> => {
  let finish = false;
  let datas: Record<any, any> = {};

  return new Promise(res => {
    let check = false;

    page.on('response', async response => {
      if (response.url().includes('adaptive')) {
        const json = await response.json();
        const tweets = json.globalObjects.tweets;
        const users = json.globalObjects.users;

        const excludes: any[] = [];

        Object.values(tweets).forEach((tweet: any) => {
          if (tweet.is_quote_status) {
            excludes.push(tweet.quoted_status_id);
          }
        });

        Object.values(tweets)
          .filter((v: any) => !excludes.includes(v.id))
          .forEach((tweet: any) => {
            const created_at = dayjs(tweet.created_at).format('YYYY-MM-DD');

            if (!(collectionPeriod[0] < created_at && created_at <= collectionPeriod[1])) {
              check = true;
            }

            tweet.user = users[tweet.user_id_str];
          });

        datas = { ...datas, ...tweets };

        if (check) {
          finish = true;
          res(datas);
        }
      }
    });
  });
};

const handleList = async ({ page, crawler }: HandleParams) => {
  await page.evaluate(() => {
    setInterval(() => {
      let delta = document.body.scrollHeight === 0 ? 10000 : document.body.scrollHeight;
      window.scrollBy(0, delta);
    }, 50);
  }, []);

  const datas = await getData(page);

  for await (let [key, value] of Object.entries(datas)) {
    if (!value?.user?.screen_name) {
      continue;
    }

    await Dataset.pushData(value);

    // crawler.addRequests([
    //   {
    //     url: `https://twitter.com/${value.user.screen_name}/status/${value.id_str}`,
    //     label: 'DETAIL',
    //     userData: {
    //       id: value.id_str,
    //     },
    //   },
    // ]);
  }
};

export default handleList;
