import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

import Confetti from "@/components/Confetti";
import Stats from "@/components/Stats";

import getData from "@/lib/getData";

export default function Home({
  count,
  record,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
      <main className="bg-yellow-300 w-screen h-screen md:p-16 flex flex-col items-center">
        <Stats count={count} record={record} />
        <Confetti show={count === 0} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  count: number;
  record: number;
}> = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-max-age=1, stale-while-revalidate=59"
  );

  const data = await getData();

  return {
    props: {
      ...data,
    },
  };
};
