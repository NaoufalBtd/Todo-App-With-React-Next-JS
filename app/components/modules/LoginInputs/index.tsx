import { signIn } from "next-auth/react";

import { LoginInputsView } from "./LoginInputsView";

export default function LoginInputs({ onError }: IProps) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await signIn("credentials", {
        email: data.get("email"),
        password: data.get("password"),
        callbackUrl: "/",
      });
    } catch (error) {
      onError({ msg: "Cannot login" });
    }
  }
  return <LoginInputsView handleSubmit={handleSubmit} />;
}

interface IProps {
  onError: (err: { msg: string; data?: any }) => void;
}
