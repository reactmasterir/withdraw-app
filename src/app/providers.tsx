"use client";
import Login from "@/components/login";
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectModal,
} from "@tonconnect/ui-react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  const userFriendlyAddress = useTonAddress();
  const { state, open, close } = useTonConnectModal();
  return (
    <>
      {userFriendlyAddress ? (
        <div>
          {userFriendlyAddress ===
          "UQCJ-z52pGhbV9gXQEXjgMcO7_SYl_104JYmDGZqe00d1KLQ" ? (
            children
          ) : (
            <Login />
          )}
        </div>
      ) : (
        <div className='h-screen w-full flex justify-center items-center'>
          <TonConnectButton />
        </div>
      )}
    </>
  );
}
