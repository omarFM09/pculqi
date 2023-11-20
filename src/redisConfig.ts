import Redis from 'ioredis';

const redisConfig = {
  host: 'localhost',
  port: 6379,
};

const redisClient = new Redis(redisConfig);

export default redisClient;