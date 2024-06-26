"use client";
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
        children
      ) : (
        <div className='h-screen w-full flex justify-center items-center'>
          <TonConnectButton />
        </div>
      )}
    </>
  );
}
