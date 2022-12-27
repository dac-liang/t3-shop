import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { BaseLayout } from "@components";
import { useShoppingCart } from "@context/CartContext";
import { trpc } from "@utils/trpc";
import { formatCurrency } from "@utils/helpers";

const Product: NextPage = () => {
  const router = useRouter();
  const { data: product } = trpc.product.findOne.useQuery({
    id: router.query.id as string,
  });

  const { increase } = useShoppingCart();

  const [price, setPrice] = useState<number | null>(null);
  const [detailId, setDetailId] = useState<number | null>(null);
  const selectEl = useRef(null);
  const handleOnChange = (e: { target: { value: string } }) => {
    if (product) {
      const target = product.productDetail.find(
        (spec) => spec.id === Number(e.target.value)
      );
      setPrice(target?.price ?? null);
      setDetailId(target?.id ?? null);
    }
  };

  useEffect(() => {
    if (product) {
      const target = product.productDetail.find((detail) => detail !== null);
      setPrice(target?.price ?? null);
      setDetailId(target?.id ?? null);
    }
  }, [product]);

  if (!product) return null;

  return (
    <>
      <Head>
        <title>プロテインマーケット</title>
        <meta name="description" content="a dummy e-commerce site" />
        <link rel="icon" href="/images/icons-protein-16.ico" />
      </Head>
      <BaseLayout>
        <section className="body-font overflow-hidden text-gray-600">
          <div className="container mx-auto px-5 py-24">
            <div className="mx-auto flex flex-wrap lg:w-4/5">
              <Image
                src={`${product.productImage[0]?.url}`}
                alt="ecommerce"
                className="h-64 w-full rounded object-cover object-center lg:h-auto lg:w-1/2"
                width={420}
                height={260}
              />
              <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
                <h2 className="title-font text-sm tracking-widest text-gray-500">
                  {product.category.name}
                </h2>
                <h1 className="title-font mb-1 text-3xl font-medium text-gray-900">
                  {product.name}
                </h1>
                <div className="mb-4 flex">
                  <span className="space-x-2s flex py-2">
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">{product.description}</p>
                <div className="mt-6 mb-5 flex items-center border-b-2 border-gray-100 pb-5">
                  <div className="flex items-center">
                    <div className="relative">
                      <select
                        ref={selectEl}
                        onChange={handleOnChange}
                        className="appearance-none rounded border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                      >
                        {product.productDetail &&
                          product.productDetail.length > 0 &&
                          product.productDetail.map((detail, index) => (
                            <option
                              key={index}
                              value={detail.id}
                            >{`${detail.volume} ${detail.unit}`}</option>
                          ))}
                      </select>
                      <span className="pointer-events-none absolute right-0 top-0 flex h-full w-10 items-center justify-center text-center text-gray-600">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {price && (
                    <span className="title-font text-2xl font-medium text-gray-900">
                      {formatCurrency(price)}
                    </span>
                  )}
                  <button
                    onClick={() => {
                      if (detailId !== null && price !== null) {
                        increase({
                          ...product,
                          quantity: 1,
                          price,
                          id: detailId,
                        });
                        router.push("/cart");
                      }
                    }}
                    className="ml-auto flex rounded border-0 bg-yellow-500 py-2 px-6 text-white hover:bg-yellow-600 focus:outline-none"
                  >
                    購入
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </BaseLayout>
    </>
  );
};

export default Product;
