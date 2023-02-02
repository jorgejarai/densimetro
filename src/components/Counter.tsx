import clsx from "clsx";
import { FC } from "react";

interface CounterProps {
  count: number;
  length?: number;
  small?: boolean;
}

const Counter: FC<CounterProps> = ({ count, length = 3, small = false }) => {
  const digits = count.toString().split("");
  const digitCount = digits.length;

  const paddingCount = length - digitCount;

  return (
    <div className="flex gap-2">
      {paddingCount > 0 &&
        new Array(paddingCount)
          .fill(0)
          .map((_, idx) => <Digit key={idx} value="0" small={small} />)}
      {digits.map((digit, idx) => (
        <Digit key={idx} value={digit} small={small} />
      ))}
    </div>
  );
};

interface DigitProps {
  value: string;
  small?: boolean;
}

const Digit: FC<DigitProps> = ({ value, small = false }) => {
  return (
    <div
      className={clsx(
        "rounded border bg-gradient-to-b from-yellow-50 to-yellow-100 shadow-md text-center select-none flex items-center justify-center",
        small
          ? "px-2 py-1 w-10 h-14 text-4xl"
          : "px-4 py-2 w-14 h-20 text-6xl md:w-24 md:h-32 md:text-8xl"
      )}
    >
      {value}
    </div>
  );
};

export default Counter;
