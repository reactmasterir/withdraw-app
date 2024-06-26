"use client";
import GetUser from "@/components/getuser";
import { useGetWithdrawsQuery } from "@/redux/features/user/userApi";
import { TonConnectButton } from "@tonconnect/ui-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet";

export default function Home() {
  const { data, isLoading, refetch } = useGetWithdrawsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  return (
    <main className='flex w-full max-w-[900px] mx-auto flex-col justify-center items-center'>
      <div className='mt-5'>
        <TonConnectButton />
      </div>
      <div className='w-full pb-5 px-7 my-9 flex flex-col gap-4'>
        {data && !isLoading
          ? data.response.map((item: withdrawsType) => (
              <Sheet>
                <SheetTrigger>
                  <div
                    className={`w-full text-black ${
                      item.status === "pending" &&
                      "bg-white"
                    } ${
                      item.status === "paid"
                        ? "bg-green-300"
                        : ""
                    } ${
                      item.status === "suspended" &&
                      "bg-red-300"
                    } ${
                      item.status === "suspicious" &&
                      "bg-red-300"
                    } rounded-lg py-2 px-4 flex justify-between items-center`}>
                    <div>
                      <p className='text-lg font-medium'>
                        {item.amount} TON
                      </p>
                      <p className='text-base opacity-80 text-left'>
                        {item.status}
                      </p>
                    </div>
                    <div>
                      <p className='text-lg'>
                        {new Date(
                          item.created_at
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </p>
                      <p className='text-lg text-right'>
                        Id: {item.id}
                      </p>
                    </div>
                  </div>
                </SheetTrigger>
                <SheetContent side='bottom'>
                  <GetUser
                    user_id={item.user_id}
                    amount={item.amount}
                    wallet={item.wallet}
                    status={item.status}
                    id={item.id}
                    refetch={refetch}
                  />
                </SheetContent>
              </Sheet>
            ))
          : "loading..."}
      </div>
    </main>
  );
}
