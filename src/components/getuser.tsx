import {
  useSetStatusMutation,
  useSubmitMutation,
  useUserDataQuery,
} from "@/redux/features/user/userApi";
import { useTonConnectUI } from "@tonconnect/ui-react";
import React, { useEffect } from "react";
import { beginCell } from "@ton/ton";

type getUserType = {
  user_id: number;
  id: number;
  amount: number;
  wallet: string;
  status:
    | "pending"
    | "proccessing"
    | "paid"
    | "suspicious"
    | "suspended";
  refetch: any;
};

const GetUser = ({
  user_id,
  id,
  amount,
  wallet,
  status,
  refetch,
}: getUserType) => {
  const [
    setStatus,
    { data: statusData, isSuccess: statusSuccess },
  ] = useSetStatusMutation();
  const [
    submit,
    {
      isLoading: submitLoading,
      data: submitData,
      isSuccess,
    },
  ] = useSubmitMutation();
  const { data, isLoading } = useUserDataQuery({
    id: user_id,
  });

  useEffect(() => {
    if (isSuccess) {
      alert(submitData.msg);
      refetch();
    }
  }, [submitData, isSuccess, refetch]);
  const [tonConnectUI] = useTonConnectUI();

  const handleSubmit = async (boc: string) => {
    await submit({ id, tx: boc });
  };

  const body = beginCell()
    .storeUint(0, 32)
    .storeStringTail("TONIX")
    .endCell();
  const handleSendTransaction = async () => {
    try {
      const amountInNanoTon = amount * 1000000000;
      const myTransaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600,

        messages: [
          {
            address: wallet,
            amount: amountInNanoTon.toString(),
            payload: body.toBoc().toString("base64"),
          },
        ],
      };

      const txResult = await tonConnectUI.sendTransaction(
        myTransaction
      );
      console.log("Transaction Result:", txResult);

      if (txResult && txResult.boc) {
        await handleSubmit(txResult.boc);
      } else {
        throw new Error(
          "Transaction failed or BOC not received"
        );
      }
    } catch (error) {
      console.error("Transaction Error:", error);
      alert("Transaction failed. try again!");
    }
  };

  const handleSetStatus = async (
    id: number,
    status: string
  ) => {
    await setStatus({ id, status });
  };
  return (
    <div>
      {isLoading && !data ? (
        "loading..."
      ) : (
        <div className='py-2 px-3'>
          <div className='flex flex-col'>
            <span>name: {data.response.userInfo.name}</span>
            <span>Id: {id}</span>
            <span>wallet: {wallet}</span>
            <span>
              user id : {data.response.userInfo.id}
            </span>
            <span> nid : {data.response.userInfo.nid}</span>
            <span>
              {data.response.userInfo.uid &&
                `uid: ${data.response.userInfo.uid}`}
            </span>
            <span>
              {" "}
              balance :{" "}
              {data.response.userInfo.balance.toLocaleString()}
            </span>
            <span>
              tasks: {data.response.userInfo.tasks}
            </span>
            <span>
              commission:{" "}
              {data.response.userInfo.commission.toLocaleString()}
            </span>
            <span>
              totalRef:{" "}
              {data.response.totalRef.toLocaleString()}
            </span>
            <span>
              activeRef:{" "}
              {data.response.activeRef.toLocaleString()}
            </span>
            <span>
              {" "}
              activeTnx:{" "}
              {data.response.userInfo.activeTnx.toLocaleString()}
            </span>
            <span>withdraw amount: {amount} TON</span>

            {status === "paid" ? (
              <p className='text-green-500 text-2xl mt-3'>
                {" "}
                this withdraw has been paid
              </p>
            ) : (
              <>
                {status === "suspended" ? (
                  "this withdraw is suspended"
                ) : status === "suspicious" ? (
                  "this withdraw is suspicious"
                ) : (
                  <>
                    <button
                      className='w-full py-2 px-5 mt-5 bg-red-600 rounded-lg text-white'
                      onClick={() =>
                        handleSetStatus(id, "suspended")
                      }>
                      mark as suspended
                    </button>
                    <button
                      className='w-full py-2 px-5 mt-5 bg-red-600 rounded-lg text-white'
                      onClick={() =>
                        handleSetStatus(id, "suspicious")
                      }>
                      mark as suspicious
                    </button>
                  </>
                )}
                <button
                  className='w-full py-2 px-5 mt-5 bg-green-600 rounded-lg text-white'
                  onClick={() => handleSendTransaction()}>
                  Approve
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GetUser;
