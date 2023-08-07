import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Form, Button, Input, Tabs, Alert, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { textwrapper, logo, login } from "./Login.module.css"
import theLogo from '../../styles/logo0light.jpg'

export function LoginCard() {
  const [loginType, setLoginType] = useState('student');
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { mutate, reset, isLoading, isError } = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/login",{
        "username": uname,
        "password": password,
        "identity": loginType
      })
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      notification.success({duration: 1,message:"登录成功"})
      navigate("/bookshore");
    },
  });

  const handleSignup =() => {
    notification.info({duration: 1,message:"正在跳转..."})
    navigate("/signup")
  }
  console.log(localStorage.getItem("token"));
  return (
    <>
    <div style={{display:"flex",  justifyContent:"center"}}>
      <img className={logo} src={theLogo} />
    </div>
    <div style={{display:"flex",  justifyContent:"center"}}>
    <Form
      className={textwrapper}
      initialValues={{ remember: true }}
      onFinish={mutate}
      autoComplete="off"
    >
      <Tabs
        centered
        activeKey={loginType}
        onChange={(activeKey) => setLoginType(activeKey)}
      >
        <Tabs.TabPane key={'guest'} tab={'游客登录'} />
        <Tabs.TabPane key={'student'} tab={'学生登录'} />
      </Tabs>
      {isError && (
        <Alert
          message="用户名或密码错误!"
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
      <Form.Item>
        <div style={{display:"flex",  justifyContent:"center"}}>没有账号？<a style={{color:"#929cf7"}} onClick={handleSignup}>去注册一个</a></div> 
      </Form.Item>
      <Form.Item style={{display:"flex",  justifyContent:"center"}}>
        <Button
          className={login}
          loading={isLoading}
          type="primary"
          size="large"
          shape="round"
          // htmlType="submit"
          onClick={mutate}
        >
          登录
        </Button>
      </Form.Item>
    </Form>
    </div>
    </>
  );
}
