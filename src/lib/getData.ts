import { differenceInDays } from "date-fns";

import redis, { REDIS_DATES_KEY } from "@/lib/redis";

async function getData() {
  const dates = (await redis.lrange(REDIS_DATES_KEY, 0, -1)).map(
    (date) => new Date(date)
  );

  if (dates.length === 0) {
    return {
      lastDate: null,
      record: null,
    };
  }

  let record = 0;
  let lastDate = dates[dates.length - 1];

  if (dates.length > 1) {
    for (let i = 1; i < dates.length; i++) {
      const difference = differenceInDays(dates[i], dates[i - 1]);
      if (difference > record) {
        record = difference;
        lastDate = dates[i];
      }
    }
  }

  return {
    lastDate,
    record,
  };
}
export default getData;
