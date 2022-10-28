import { createPlaywrightRouter } from 'crawlee';

import handleList from './routes/list';
import handleDetail from './routes/detail';

const router = createPlaywrightRouter();

export type HandleParams = Parameters<Parameters<typeof router.addHandler>[1]>[0];

router.addHandler('LIST', handleList);
router.addHandler('DETAIL', handleDetail);

export default router;
