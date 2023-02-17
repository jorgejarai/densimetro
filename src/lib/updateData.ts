import redis, { REDIS_DATES_KEY } from "@/lib/redis";

async function updateData(date: Date) {
  const dateString = date.toISOString().slice(0, 10);

  await redis.rpush(REDIS_DATES_KEY, dateString);
}

export default updateData;
