import {Ratelimit} from '@upstash/ratelimit';
import {Redis} from '@upstash/redis';

import dotevn from 'dotenv';

dotevn.config();

// create a rateLimiter that allows 100 requests per 60 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter:Ratelimit.slidingWindow(30, '20 s'),
})

export default ratelimit