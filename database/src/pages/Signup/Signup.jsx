import React from "react";
import SignupCard from "./SignupCard";
import { wrapper, card } from "./Signup.module.css"
import { message, Space, Tabs } from 'antd';

export default function Signup() {
  return (
    <div className={wrapper}>
      <SignupCard/>
    </div>
  );
}
