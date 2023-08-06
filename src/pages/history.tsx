import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import { getHistory } from "@/lib/getData";
import Link from "next/link";

export default function Home({
  history,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // Fix hydration issues
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageLoaded(true);
    }
  }, []);

  const records = history.map((record) => {
    const { date, commune, region, url } = record;

    // Add the timezone offset to the date, so the difference it's not affected by
    // the timezone
    const localDate = new Date(date);
    localDate.setMinutes(
      localDate.getMinutes() + localDate.getTimezoneOffset(),
    );

    return {
      date: localDate,
      commune,
      region,
      url,
    };
  });

  return (
    <>
      <Head>
        <title>Historial de robos de densímetros nucleares</title>
        <meta
          property="og:title"
          content="Historial de robos de densímetros nucleares"
        />
        <meta
          name="description"
          content="Un historial de robos de densímetros nucleares en Chile."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-yellow-300 w-screen min-h-screen md:p-16 flex flex-col items-center">
        <h1 className="text-5xl pt-6 md:pt-0 md:text-6xl font-bold mb-10 text-center select-none">
          Historial de robos
        </h1>
        {pageLoaded && (
          <div className="mx-4 mb-4">
            <table className="bg-yellow-100 mx-4 mb-4">
              <thead className="bg-yellow-200">
                <th className="px-2 py-1">Fecha</th>
                <th className="px-2 py-1">Comuna</th>
                <th className="px-2 py-1">Región</th>
                <th className="px-2 py-1">Noticia</th>
              </thead>
              <tbody>
                {records.map(({ date, commune, region, url }, idx) => (
                  <tr className="even:bg-yellow-100" key={idx}>
                    <td className="text-center p-1">
                      {date.toLocaleString("es-CL", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </td>
                    <td className="text-center p-1">{commune}</td>
                    <td className="text-center p-1">{region}</td>
                    <td className="text-center p-1">
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-blue-700"
                      >
                        Visitar
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Link
          href="/"
          className="bg-yellow-100 hover:bg-yellow-200 transition-colors px-4 py-2 rounded shadow"
        >
          Volver al inicio
        </Link>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  history: {
    date: string;
    commune: string;
    region: string;
    url: string;
  }[];
}> = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-max-age=1, stale-while-revalidate=59",
  );

  const history = await getHistory();

  return {
    props: {
      history,
    },
  };
};
