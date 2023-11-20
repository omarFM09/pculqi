import Redis from 'ioredis';
import config from './redisConfig';

const redisClient = new Redis({
  host: config.host,
  port: config.port,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

export default redisClient;