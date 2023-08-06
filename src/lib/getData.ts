import { differenceInDays } from "date-fns";

import redis, { REDIS_DATES_KEY } from "@/lib/redis";

// The data is stored in Redis as a list of strings, where each string is a
// comma-separated list of values (with no spaces between the commas), in the
// following order: date, commune, region, URL of a news article.

export async function getCurrentRecordData() {
  const dates = (await redis.lrange(REDIS_DATES_KEY, 0, -1)).map((record) => {
    const [date] = record.split(",");

    return new Date(date);
  });
  dates.reverse();

  if (dates.length === 0) {
    return {
      lastDate: null,
      longestStreak: null,
    };
  }

  let lastDate = dates[dates.length - 1];
  let longestStreak = 0;

  if (dates.length > 1) {
    for (let i = 1; i < dates.length; i++) {
      const difference = differenceInDays(dates[i], dates[i - 1]);

      if (difference > longestStreak) {
        longestStreak = difference;
      }
    }
  }

  return {
    lastDate,
    longestStreak,
  };
}

export async function getHistory() {
  const dates = (await redis.lrange(REDIS_DATES_KEY, 0, -1)).map((record) => {
    const [date, commune, region, url] = record.split(",");

    return {
      date,
      commune,
      region,
      url,
    };
  });

  return dates;
}
