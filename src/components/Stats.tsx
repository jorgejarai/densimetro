import { differenceInCalendarDays } from "date-fns";
import { FC } from "react";

import Counter from "@/components/Counter";

interface StatsProps {
  lastDate: Date;
  longestStreak: number;
}

const Stats: FC<StatsProps> = ({ lastDate, longestStreak }) => {
  const dayDifference = differenceInCalendarDays(new Date(), lastDate);

  return (
    <div className="w-screen md:m-2/3 flex flex-col items-center p-4">
      <h1 className="text-5xl pt-6 md:pt-0 md:text-6xl font-bold mb-10 text-center select-none">
        {dayDifference === 0
          ? "¡Se robaron un densímetro!"
          : "¿Ya se robaron otro densímetro nuclear?"}
      </h1>
      <h2 className="text-3xl md:text-4xl text-center select-none">
        Ha{dayDifference !== 1 && "n"} pasado
      </h2>
      <div className="my-10 flex gap-4 items-center">
        <Counter count={dayDifference} />
        <h2 className="text-5xl select-none">
          día{dayDifference !== 1 && "s"}
        </h2>
      </div>
      <h2 className="text-3xl md:text-4xl text-center select-none">
        desde el último robo de un densímetro nuclear en Chile.
      </h2>
      <div className="mt-10 flex justify-center gap-4 items-center flex-wrap md:flex-nowrap">
        <h3 className="text-2xl select-none">El récord es de </h3>
        <Counter count={longestStreak} small />
        <h2 className="text-2xl select-none">
          día{longestStreak !== 1 && "s"}.
        </h2>
      </div>
    </div>
  );
};

export default Stats;
