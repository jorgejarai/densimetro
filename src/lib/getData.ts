import { differenceInDays } from "date-fns";

import redis from "@/lib/redis";

async function getData() {
  const recordDate = await redis.get("record");
  const lastDate = await redis.lrange("dates", -1, -1);

  const record = recordDate
    ? differenceInDays(new Date(), new Date(recordDate))
    : 0;

  if (lastDate.length === 0) {
    return {
      record,
      count: 0,
    };
  }

  const count = differenceInDays(new Date(), new Date(lastDate[0]));

  return {
    record,
    count,
  };
}

export default getData;
