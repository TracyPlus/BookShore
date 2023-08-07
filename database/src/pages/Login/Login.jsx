import React from "react";
import { LoginCard } from "./LoginCard";
import { wrapper, card } from "./Login.module.css"

export default function Login() {
  return (
    <div className={wrapper}>
      <LoginCard/>
    </div>
  );
}
