import { differenceInDays } from "date-fns";

import redis from "@/lib/redis";

async function getData() {
  const dates = (await redis.lrange("dates", 0, -1)).map(
    (date) => new Date(date)
  );

  if (dates.length === 0) {
    return {
      record: 0,
      count: 0,
    };
  }

  let record = 0;

  if (dates.length === 1) {
    record = differenceInDays(new Date(), dates[0]);
  } else {
    record = dates.reduce((record, date, index) => {
      if (index === 0) {
        return record;
      }

      const distance = differenceInDays(date, dates[index - 1]);

      return Math.max(record, distance);
    }, 0);
  }

  const lastDate = dates[dates.length - 1];
  const count = differenceInDays(new Date(), lastDate);

  return {
    record,
    count,
  };
}

export default getData;
