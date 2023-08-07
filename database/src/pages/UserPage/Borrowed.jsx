import { EditableProTable, PageContainer} from "@ant-design/pro-components";
import { Button, notification, Popconfirm, Image } from "antd";
import { PlusOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";

export default function Borrowed () {
  const [books, setBooks] = useState( [
    {
      id:2,
      title:"小王子",
      author:"圣埃克苏佩里",
      publisher:"中国友谊出版公司",
      cover_img:"https://img14.360buyimg.com/pop/jfs/t1/131189/29/2168/158608/5ee49511Ef14278fd/1c35f31418b85764.jpg",
      borrow_date:"2023.05.25"
    }
  ]);

  const handleReturn = (value) => {
    console.log(value.target.value);
    setBooks([]);
    notification.success({duration: 1,message:"还书成功！"});
  }
  const columns = [
    {
      title: '书籍名称',
      dataIndex: 'title',
      width: '15%',
    },
    {
      title: '作者',
      dataIndex: 'author',
      width: '15%',
    },
    {
      title: '出版社',
      dataIndex: 'publisher',
      width: '15%',
    },
    {
      title: '封面图片',
      dataIndex: 'cover_img',
      render: (url) => {
        return (
          <Image.PreviewGroup>
            <Image width={20} src={url} />
          </Image.PreviewGroup>
        );
      },
      width: '15%',
    },
    {
      title: '借阅时间',
      dataIndex: 'borrow_date',
      width: '15%',
    },
    {
      title: '操作',
      valueType: 'option',
      width: '20%',
      render: (text, record, _, action) => [
        <Button key="return" onClick={handleReturn}>
          还书
        </Button >
      ],
    },
  ];

  return (
    <PageContainer
      loading={!books}
      header={{
        title: '我的借阅'
      }}
    >
      <EditableProTable
        rowKey="title"
        maxLength={20}
        value={books}
        loading={false}
        columns={columns}
        recordCreatorProps={false}
      />
    </PageContainer>
  )
}

