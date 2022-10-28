import { KeyValueStore } from 'crawlee';
import { HandleParams } from '../index';

const handleDetail = async ({ request, page }: HandleParams) => {
  const buffer = await page
    .locator('article')
    .last()
    .screenshot({ path: `screenshots/${request.userData.id}.jpg` });

  await KeyValueStore.setValue(request.userData.id, buffer);
};

export default handleDetail;
