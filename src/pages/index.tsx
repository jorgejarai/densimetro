import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

import Confetti from "@/components/Confetti";
import Counter from "@/components/Counter";

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
      <main className="bg-yellow-300 w-screen h-screen md:p-16 flex items-center">
        <div className="w-screen md:m-2/3 flex flex-col items-center p-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-10 text-center">
            {count === 0
              ? "¡Se robaron un densímetro!"
              : "¿Ya se robaron otro densímetro nuclear?"}
          </h1>
          <h2 className="text-4xl md:text-4xl text-center select-none">
            Ha{count !== 1 && "n"} pasado
          </h2>
          <div className="my-10 flex gap-4 items-center">
            <Counter count={count} />
            <h2 className="text-5xl select-none">día{count !== 1 && "s"}</h2>
          </div>
          <h2 className="text-4xl md:text-4xl text-center select-none">
            desde el último robo de un densímetro nuclear en Chile.
          </h2>
          <div className="my-10 flex justify-center gap-4 items-center flex-wrap md:flex-nowrap">
            <h3 className="text-2xl select-none">El récord es de </h3>
            <Counter count={record} small />
            <h2 className="text-2xl select-none">día{record !== 1 && "s"}.</h2>
          </div>
        </div>
      </main>
      <Confetti show={count === 0} />
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
