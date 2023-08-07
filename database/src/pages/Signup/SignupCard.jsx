import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Form, Button, Input, Checkbox, Alert, notification } from "antd";
import axios from "axios";
import { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { wrapper, textwrapper, signup, logo, login } from "./Signup.module.css"
import { PageContainer } from "@ant-design/pro-components";
import theLogo from '../../styles/logo0light.jpg'

export default function SignupCard() {
  const navigate = useNavigate();
  const [same, setSame] = useState(true);
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, reset, isLoading, isError } = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/register",{
        "username": uname,
        "password": password,
        "identity": "guest"
      })
      return res.data;
    },
    onSuccess: (data) => {
      notification.success({duration: 1,message:"注册成功"})
      navigate("/login");
    },
  });

  const handleCheck =(e) => {
    console.log(e.target.value);
    if((e.target.value) !== password) setSame(false);
    if((e.target.value) === password) setSame(true);
  }
  const handleSignupStudent =() => {
    notification.info({duration: 1,message:"正在跳转..."})
    navigate("/signups")
  }
  return (
    <>
    <div style={{display:"flex",  justifyContent:"center"}}>
      <img className={logo} src={theLogo} />
    </div>
    <div style={{display:"flex",  justifyContent:"center"}}>
    <Form
      className={textwrapper}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={mutate}
      autoComplete="off"
    >
      {isError && (
        <Alert
          message="该账号已被注册!"
          style={{marginBottom:"2rem"}}
          type="error"
          closable
          onClose={reset}
        />
      )}
      <Form.Item
        label="账号"
        name="uname"
        value={uname}
        onChange={(value) => {setUname(value.target.value)}}
        width="2rem"
        rules={[{ required: true, message: "请输入用户名!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        sytle={{color:"white"}}
        label="密码"
        name="password"
        value={password}
        onChange={(value) => {setPassword(value.target.value)}}
        rules={[{ required: true, message: "请输入密码!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        sytle={{color:"white"}}
        label="确认密码"
        name="password2"
        onChange={handleCheck}
        rules={[{ required: true, message: "请确认密码!" }]}
      >
        <Input.Password />
      </Form.Item>
      {!same && (
        <Alert
          message="请输入相同密码!"
          type="error"
          closable
          onClose={reset}
        />
      )}
      <Form.Item style={{marginTop:"2rem",display:"flex",  justifyContent:"center"}}>
        <Button
          className={login}
          loading={isLoading}
          type="primary"
          size="large"
          shape="round"
          // htmlType="submit"
          onClick={mutate}
        >
          游客注册
        </Button>
        <Button
          className={signup}
          loading={isLoading}
          type="primary"
          size="large"
          shape="round"
          // htmlType="submit"
          onClick={handleSignupStudent}
        >
          学生认证
        </Button>
      </Form.Item>
    </Form>
    </div>
    </>
  );
}
