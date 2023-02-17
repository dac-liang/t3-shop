import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { BaseLayout } from "@components";

const Order: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>カート</title>
        <meta name="description" content="a dummy e-commerce site" />
        <link rel="icon" href="/images/icons-protein-16.ico" />
      </Head>
      <BaseLayout>
        <div className="container mx-auto mt-10">
          <div className="my-10 flex shadow-md">
            <div className="w-full bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="text-2xl font-semibold">注文履歴</h1>
              </div>
              <div className="mt-10 mb-5 flex">
                <h3 className="w-1/5 text-xs font-semibold uppercase text-gray-600">
                  オーダーID
                </h3>
                <h3 className="w-1/5 text-xs font-semibold uppercase text-gray-600">
                  商品
                </h3>
                <h3 className="w-1/5 text-center text-xs font-semibold uppercase text-gray-600">
                  数量
                </h3>
                <h3 className="w-1/5 text-center text-xs font-semibold uppercase text-gray-600">
                  金額
                </h3>
                <h3 className="w-1/5 text-center text-xs font-semibold uppercase text-gray-600">
                  合計
                </h3>
              </div>

              <div
                className="mt-10 flex cursor-pointer text-sm font-semibold text-indigo-600"
                onClick={() => {
                  router.push("/");
                }}
              >
                <svg
                  className="mr-2 w-4 fill-current text-indigo-600"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                買い物を続ける
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default Order;
