import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { CartProvier } from "@context/CartContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <CartProvier>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </CartProvier>
  );
};

export default trpc.withTRPC(MyApp);
