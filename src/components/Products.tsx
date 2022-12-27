import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { trpc } from "@utils/trpc";
import { formatCurrency } from "@utils/helpers";

const Products: FC = () => {
  const { data: productsData } = trpc.product.findAll.useQuery();

  return (
    <section className="body-font text-gray-600">
      <div className="container mx-auto px-5 py-24">
        <div className="-m-4 flex flex-wrap">
          {productsData &&
            productsData.length > 0 &&
            productsData.map((product, index) => (
              <div key={index} className="w-full p-4 md:w-1/2 lg:w-1/4">
                <Link
                  className="relative block h-48 overflow-hidden rounded"
                  href={`/product/${product.id}`}
                >
                  <Image
                    src={`${product.productImage[0]?.url}`}
                    alt="ecommerce"
                    className="block h-full w-full object-cover object-center"
                    width={420}
                    height={260}
                  />
                </Link>
                <div className="mt-4">
                  <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">
                    {product.category.name}
                  </h3>
                  <h2 className="title-font text-lg font-medium text-gray-900">
                    {product.name}
                  </h2>
                </div>
                <div className="mx-auto flex flex-wrap">
                  {product.productDetail[0] && (
                    <>
                      <p>{formatCurrency(product.productDetail[0].price)}/</p>
                      <p>{`${product.productDetail[0].volume}${product.productDetail[0].unit}~`}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
