import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Textarea,
} from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import cookies from "js-cookie";

export default function Login() {
  const [key, setKey] = useState("");

  const handleLogin = (key: string) => {
    if (process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN === key) {
      cookies.set("key", key);
      alert("logged in successfuly");
    } else {
      alert("wrong!");
    }
  };

  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <div className='w-full max-w-lg px-4'>
        <Fieldset className='space-y-6 rounded-xl bg-white/5 p-6 sm:p-10'>
          <Field>
            <Label className='text-sm/6 font-medium text-white'>
              Enter key
            </Label>
            <Input
              type='text'
              onChange={(e) => setKey(e.target.value)}
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
            <Button
              onClick={() => handleLogin(key)}
              className='mt-2 w-full bg-blue-600 text-white rounded-lg py-3'>
              Login
            </Button>
          </Field>
        </Fieldset>
      </div>
    </div>
  );
}
