"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const HomeHeader = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-purple-500 flex flex-1 py-4 justify-between px-[10%]">
      <a href="" className="text-white font-semibold">
        Ecommerce
      </a>
      <div className="flex gap-5 place-items-center">
        <Link href="/" className="text-white font-semibold">
          Home
        </Link>
        <Link href="/admin" className="text-white font-semibold">
          Dashboard
        </Link>
        {!session ? (
          <>
            <Link href="/auth/login" className="text-white font-semibold">
              Login
            </Link>
            <Link href="/auth/register" className="text-white font-semibold">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="bg-cyan-700 px-4 py-2 text-white rounded-full flex place-items-center font-bold">
              {session?.user?.email}
            </span>
            <li>
              <button
                onClick={() => {
                  signOut();
                }}
                className="p-2 px-5 rounded-full text-white bg-orange-600"
              >
                logout
              </button>
            </li>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
