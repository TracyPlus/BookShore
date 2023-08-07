import { EditableProTable, PageContainer, ProDescriptions} from "@ant-design/pro-components";
import { Avatar, Image } from "antd";
import { UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
// import { request } from "../../services/request";
import logo1 from "../../styles/logo1.jpg";
import UploadImg from "./UploadImg";

export default function UserPage () {
  const data = {
    nickname:"无欲无求鸡蛋糕",
    sign:"一个爱吃鸡蛋糕的人是值得尊敬的"
  }
  return (
    <PageContainer>
      <div><Avatar size={128} src ={logo1} /></div>
      <div style={{marginLeft:"1.3rem", marginTop:"1rem"}}><UploadImg/></div>
      <ProDescriptions
        column={1}
        style={{marginTop:"2rem"}}
        formProps={{
          onValuesChange: (e, f) => console.log(f),
        }}
        editable={{
          onSave: async (rowKey, data) => {
            }
          }}
        columns={[
          {
            title: '昵称',
            dataIndex: 'nickname',
            copyable: true,
            ellipsis: true,
          },
          {
            title: '个性签名',
            dataIndex: 'sign',
            copyable: true,
            ellipsis: true,
          },
        ]}
        dataSource={data}
      >
      </ProDescriptions>
    </PageContainer>
  )
}

