import axios from "axios";
import { useState } from "react";
import zxcvbn from "zxcvbn";

import SignupView, { TPwdBarColor } from "./SignupView";

export default function SignUpInputs({ onSignUp, onError }: IProps) {
  const [password, setPassword] = useState<string>("");
  const [pwdBarColor, setPwdBarColor] = useState<TPwdBarColor>("primary");
  const pwdInfo = zxcvbn(password);

  // change the bar color depending on the password strength
  if (
    pwdInfo.score === 0 &&
    pwdBarColor !== "primary" &&
    password.length === 0
  ) {
    setPwdBarColor("primary");
  } else if (
    pwdInfo.score < 2 &&
    pwdInfo.score >= 0 &&
    pwdBarColor !== "error" &&
    password.length !== 0
  ) {
    setPwdBarColor("error");
  } else if (pwdInfo.score === 3 && pwdBarColor !== "warning") {
    setPwdBarColor("warning");
  } else if (pwdInfo.score === 4 && pwdBarColor !== "success") {
    setPwdBarColor("success");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await axios.post("/api/create-user", {
        fullName: `${formData.get("firstName")} ${formData.get("lastName")}`,
        email: formData.get("email"),
        password: formData.get("password"),
      });
      onSignUp();
    } catch (err) {
      console.log(err);
      onError({ msg: "cannot create user" });
    }
  };

  return (
    <SignupView
      handleSubmit={handleSubmit}
      pwdBarColor={pwdBarColor}
      pwdScore={pwdInfo.score}
      setPassword={setPassword}
    />
  );
}

interface IProps {
  onSignUp: () => void;
  onError: (err: { msg: string; data?: any }) => void;
}
