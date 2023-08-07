import { Form, Input, notification, Button } from 'antd';
import { ModalForm, ProFormSelect, ProFormText } from "@ant-design/pro-components"

import React from 'react';
import UploadImg from './UploadImg';
import axios from 'axios';

const BookAdd = ({ visible, setVisible, refresh }) => {

  return (
    <ModalForm
      title="添加书籍"
      open={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      destroyOnClose={true}
      footer={null}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={(values) => {
        axios.post("/book",{
            "operation": "insert_one_book",
            "title": values.title,
            "author": values.author,
            "publisher": values.publisher,
            "cover_img": "http://dummyimage.com/400x400",
            "tot_number": Number(values.tot_number),
            "remain_number": Number(values.tot_number),
            "token": localStorage.getItem("token")
        })      
          .then(notification.success({message: '添加成功'}))
          .then(refresh)
          .then(setVisible(false));
      }}
    >
        <ProFormText
          label="书籍名称"
          name="title"
          rules={[
            { required: true, message: '请填写书籍名称!', type: 'string' },
          ]}
        />
        <ProFormText
          label="作者"
          name="author"
          rules={[
            { required: true, message: '请填写书籍作者!', type: 'string' },
          ]}
        />
        <ProFormText
          label="出版社"
          name="publisher"
          rules={[
            { required: true, message: '请填写书籍出版社!', type: 'string' },
          ]}
        />
        <ProFormText
          label="书籍封面"
          name="img"
          rules={[
            // { required: true, message: '请上传书籍图片!', type: 'string' },
          ]}
        >
          <UploadImg />
        </ProFormText>
        <ProFormText
          label="数量"
          name="tot_number"
          rules={[
            { required: true, message: '请填写书籍数量!', type: 'string' },
          ]}
        />
    </ModalForm>
  );
};

export default BookAdd;
