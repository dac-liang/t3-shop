import { type NextPage } from "next";
import Head from "next/head";
import { BaseLayout, Products } from "@components";
// import { trpc } from "@utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  // console.log(hello);
  return (
    <>
      <Head>
        <title>プロテインマーケット</title>
        <meta name="description" content="a dummy e-commerce site" />
        <link rel="icon" href="/images/icons-protein-16.ico" />
      </Head>
      <BaseLayout>
        <main className="flex min-h-screen flex-col items-center ">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <Products />
          </div>
        </main>
      </BaseLayout>
    </>
  );
};

export default Home;
