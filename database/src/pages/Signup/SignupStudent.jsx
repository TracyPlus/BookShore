import {
  ProCard,
  ProFormSelect,
  ProFormText,
  StepsForm,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import {  message, Button } from "antd";
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cardwrapper, wrapper2, textwrapper,signup, logo } from "./Signup.module.css"
import theLogo from '../../styles/logo0light.jpg'

export default function SignupStudent() {
  let navigate = useNavigate();
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [realname, setRealname] = useState("");
  const [sid, setSid] = useState("");
  const [depname, setDepname] = useState("");

  const handleSubmit = () => {
    axios.post("/register",{
      "username": uname,
      "password": password,
      "realname": realname,
      "sid": sid,
      "dept_name": depname,
      "identity": "student"
    })
  }
  return (
    <>
    <div style={{display:"flex",  justifyContent:"center"}}>
      <img className={logo} src={theLogo} />
    </div>
    <div style={{display:"flex",  justifyContent:"center"}}>
    <ProCard className={wrapper2}>
      <StepsForm
        onFinish={async (values) => {
          console.log(values);
          // await waitTime(1000);
          message.success('提交成功');
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
        submitter={{
          render: (props) => {
            if (props.step === 0) {
              return (
                <Button 
                  type="primary"                   
                  style={{marginLeft:"13.5rem"}}
                  onClick={() => {
                    props.onSubmit?.();
                  }}
                >
                  下一步
                </Button>
              );
            }

            if (props.step === 1) {
              return [
                <Button 
                  key="pre" 
                  style={{marginLeft:"9.5rem"}}
                  onClick={() => props.onPre?.()}
                >
                  返回上一步
                </Button>,
                <Button
                  type="primary"
                  key="goToTwo"
                  style={{marginLeft:"2rem"}}
                  onClick={() => {
                    handleSubmit();
                    props.onSubmit?.()
                  }}
                >
                  提交
                </Button>,
              ];
            }

            return (
              <Button
                type="primary"
                key="goToThree"
                style={{marginLeft:"13.5rem"}}
                onClick={() => {navigate("/bookshore")}}
              >
                返回主页
              </Button>
            );
          },
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="基本信息"
          className={cardwrapper}
          onFinish={async () => {
            return true;
          }}
        >
          <ProFormText
            name="username"
            label="用户名"
            value={uname}
            onChange={(value) => {setUname(value.target.value)}}
            width="md"
            rules={[{ required: true }]}
          />
          <ProFormText.Password
            name="password"
            label="密码"
            value={password}
            onChange={(value) => {setPassword(value.target.value)}}
            width="md"
            placeholder="请输入您的密码"
            rules={[{ required: true }]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="real"
          title="学生认证"
          className={cardwrapper}
          onFinish={async () => {
            return true;
          }}
        >
          <ProFormText
            name="name"
            label="真实姓名"
            onChange={(value) => {setRealname(value.target.value)}}
            width="md"
            placeholder="请输入真实姓名"
            rules={[{ required: true }]}
          />
          <ProFormText
            name="id"
            label="学号"
            onChange={(value) => {setSid(value.target.value)}}
            width="md"
            placeholder="请输入您的学/工号"
            rules={[{ required: true }]}
          />
          <ProFormSelect
            name="department"
            label="院系"
            onChange={(value) => {setDepname(value)}}
            width="md"
            showSearch
            debounceTime={300}
            options={[
                {
                  value: '计算机科学技术学院',
                  label: '计算机科学技术学院',
                },
                {
                  value: '中国汉语言文学院',
                  label: '中国汉语言文学院',
                },
              ]}
            rules={[{ required: true, message: '请选择院系!' }]}
          />
          <ProFormUploadDragger 
            name="picture" 
            width="md"
            title="请上传学生证或校园卡正面图片"
            description="支持png、jpg、jpeg文件,单个文件不可大于10M"
            />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          style={{marginLeft:"11rem"}}
          name="time"
          title="管理员审核"
        >
          <div style={{height:"3rem"}} >提交成功！等待管理员审核</div>
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
    </div>
    </>
  );
}; 