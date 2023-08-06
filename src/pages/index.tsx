import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

import Confetti from "@/components/Confetti";
import Stats from "@/components/Stats";

import { getCurrentRecordData } from "@/lib/getData";

export default function Home({
  lastDate,
  longestStreak,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const lastDateDate = new Date(lastDate?.substring(0, 10) ?? new Date());
  // Add the timezone offset to the date, so the difference it's not affected by
  // the timezone
  lastDateDate.setMinutes(
    lastDateDate.getMinutes() + lastDateDate.getTimezoneOffset(),
  );
  const todayDate = new Date();

  const isLastDateToday =
    lastDateDate.toDateString() === todayDate.toDateString();

  return (
    <>
      <Head>
        <title>¿Ya se robaron otro denísmetro nuclear?</title>
        <meta
          property="og:title"
          content="¿Ya se robaron otro densímetro nuclear?"
        />
        <meta
          name="description"
          content="¿Cuántos días han pasado desde el último robo de un densímetro nuclear en Chile?"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-yellow-300 w-screen min-h-screen md:p-16 flex flex-col items-center">
        <Stats lastDate={lastDateDate} longestStreak={longestStreak ?? 0} />
        <Confetti show={isLastDateToday} />
        <Link
          href="/history"
          className="bg-yellow-100 hover:bg-yellow-200 transition-colors px-4 py-2 rounded shadow"
        >
          Historial
        </Link>
        <div className="my-5">
          <a
            href="https://github.com/jorgejarai/densimetro"
            className="text-4xl"
          >
            <FaGithub />
          </a>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  lastDate: string | null;
  longestStreak: number | null;
}> = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-max-age=1, stale-while-revalidate=59",
  );

  const data = await getCurrentRecordData();

  return {
    props: {
      ...data,
      lastDate: data.lastDate ? data.lastDate.toISOString() : null,
    },
  };
};
