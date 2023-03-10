import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { BaseLayout } from "@components";
import { useShoppingCart } from "@context/CartContext";
import { formatCurrency } from "@utils/helpers";
import { trpc } from "@utils/trpc";

const Cart: NextPage = () => {
  const router = useRouter();
  const {
    getItemQuantity,
    decrease,
    increase,
    removeAllFromCart,
    cartItems,
    cartQuantity,
    cartSum,
  } = useShoppingCart();
  const shippingFee = 500;
  const mutation = trpc.auth.createOrder.useMutation();
  const handleOrder = async () => {
    mutation.mutate(
      {
        cartItems: cartItems,
        cartSum: cartSum,
        shippingFee: shippingFee,
      },
      { onSuccess: () => removeAllFromCart() }
    );
  };

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
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="text-2xl font-semibold">ショッピングカート</h1>
                <h2 className="text-2xl font-semibold">{cartQuantity} 点</h2>
              </div>
              <div className="mt-10 mb-5 flex">
                <h3 className="w-2/5 text-xs font-semibold uppercase text-gray-600">
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
              {cartItems &&
                cartItems.length > 0 &&
                cartItems.map((product, index) => (
                  <div
                    className="-mx-8 flex items-center px-6 py-5 hover:bg-gray-100"
                    key={index}
                  >
                    <div className="flex w-2/5">
                      <div className="w-20">
                        <Image
                          src={`/images/72x96-soy_protein.png`}
                          alt="ecommerce"
                          className="h-24"
                          width={72}
                          height={96}
                        />
                      </div>
                      <div className="ml-4 flex flex-grow flex-col justify-between">
                        <span className="text-sm font-bold">
                          {product.name}
                        </span>
                        <span className="text-xs text-red-500">
                          {product.category.name}
                        </span>
                        <div
                          className="cursor-pointer text-xs font-semibold text-gray-500 hover:text-red-500"
                          onClick={() => {
                            decrease(product.id);
                          }}
                        >
                          削除
                        </div>
                      </div>
                    </div>
                    <div className="flex w-1/5 justify-center">
                      <svg
                        className="w-3 fill-current text-gray-600"
                        viewBox="0 0 448 512"
                        onClick={() => {
                          decrease(product.id);
                        }}
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>

                      <input
                        className="mx-2 w-8 border text-center"
                        type="text"
                        value={getItemQuantity(product.id)}
                        onChange={() => {
                          console.log("change");
                        }}
                      />

                      <svg
                        className="w-3 fill-current text-gray-600"
                        viewBox="0 0 448 512"
                        onClick={() => {
                          increase(product);
                        }}
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </div>
                    <span className="w-1/5 text-center text-sm font-semibold">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="w-1/5 text-center text-sm font-semibold">
                      {formatCurrency(product.price * product.quantity)}
                    </span>
                  </div>
                ))}

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

            <div id="summary" className="w-1/4 px-8 py-10">
              <h1 className="border-b pb-8 text-2xl font-semibold">購入情報</h1>
              <div className="mt-10 mb-5 flex justify-between">
                <span className="text-sm font-semibold uppercase">
                  {cartQuantity} 点
                </span>
                <span className="text-sm font-semibold">
                  {formatCurrency(cartSum)}
                </span>
              </div>
              <div>
                <label className="mb-3 inline-block text-sm font-medium uppercase">
                  送料
                </label>
                <select className="block w-full p-2 text-sm text-gray-600">
                  <option>宅配便 - {formatCurrency(shippingFee)}</option>
                </select>
              </div>
              <div className="mt-8 border-t">
                <div className="flex justify-between py-6 text-sm font-semibold uppercase">
                  <span>合計</span>
                  <span>{formatCurrency(cartSum + shippingFee)}</span>
                </div>
                <button
                  className="w-full bg-indigo-500 py-3 text-sm font-semibold uppercase text-white hover:bg-indigo-600 disabled:opacity-25"
                  onClick={handleOrder}
                  disabled={cartQuantity < 1 || mutation.isLoading}
                >
                  決済
                </button>
                {mutation.error && (
                  <p>Something went wrong! {mutation.error.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default Cart;
