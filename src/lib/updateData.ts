import redis from "@/lib/redis";

async function updateData(date: Date) {
  const dateString = date.toISOString().slice(0, 10);

  await redis.rpush("dates", dateString);
}

export default updateData;
