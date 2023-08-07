import React from "react";
import { Form, Button, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import {textwrapper } from "./BookCard.module.css"

export default function Contact() {
  const navigate = useNavigate();
  const { TextArea } = Input;

  const handleOK =() => {
    notification.success({duration: 1,message:"提交成功"})
    navigate("/bookshore");
  }
  return (
    <Form
      className={textwrapper}
      name="basic"
    >
      <Form.Item
      sytle={{color:"white"}}
      label="请输入您的电子邮件"
      name="email"
      rules={[{ required: true, message: "请输入您的电子邮件地址!" }]}>
        <Input />
      </Form.Item>
      <Form.Item
        style={{marginTop:"2rem"}}
        name="content"
        rules={[{ required: true, message: "请输入您的问题或建议!" }]}
      >
        <TextArea rows={4} placeholder="请在此输入您的问题或建议" />
      </Form.Item>
      <Form.Item>
        <div>提交后请关注您的邮箱，我们会在收到问题的第一时间回复您！</div>
      </Form.Item>
      <Form.Item style={{display:"flex", justifyContent:"center"}}>
        <Button
          style={{backgroundColor:"#929cf7"}}
          type="primary"
          size="large"
          shape="round"
          onClick={handleOK}
        >
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}
