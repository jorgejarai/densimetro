import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";

const redis = new Redis(redisUrl);

export const REDIS_DATES_KEY =
  process.env.REDIS_DATES_KEY ?? "densimetro:dates";

export default redis;
