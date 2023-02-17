import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <p className="text-center text-sm text-emerald-700">
        {sessionData && <span>{sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <Link className="hover:text-gray-900" href="/order">
        Order
      </Link>
      <Link className="hover:text-gray-900" href="/cart">
        Cart
      </Link>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-emerald-700 no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "ログアウト" : "ログイン"}
      </button>
    </div>
  );
};

export default AuthShowcase;
