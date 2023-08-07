import { EditableProTable, PageContainer} from "@ant-design/pro-components";
import { Button, notification, Popconfirm, Image } from "antd";
import { PlusOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from "react"
import BookAdd from "./BookAdd";
import axios from "axios";

export default function BookList () {
  const [books, setBooks] = useState([]);
  const [addbookVisible, setAddbookVisible] = useState(false);
  const [editableKeys, setEditableRowKeys] = useState([]);
  
  const fetchAll = async () => {
    const res = await axios.post("/book",{
      "operation": "get_all_books",
      "token": localStorage.getItem("token")
    })
    console.log(res.data.books);
    setBooks(res.data.books);
  }

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      ellipsis: true,
      readonly: true,
      sorter: (a, b) => a._id > b._id ? 1 : -1,
      width: '8%',
    },
    {
      title: '书籍名称',
      dataIndex: 'title',
      width: '20%',
    },
    {
      title: '作者',
      dataIndex: 'author',
      width: '15%',
    },
    {
      title: '出版社',
      dataIndex: 'publisher',
      width: '18%',
    },
    {
      title: '封面图片',
      dataIndex: 'cover_img',
      render: (url) => {return (<Image width={20} src= {url} />)},
      width: '10%',
    },
    {
      title: '总数',
      dataIndex: 'tot_number',
      width: '10%',
    },
    {
      title: '剩余数量',
      dataIndex: 'remain_number',
      width: '10%',
    },
    {
      title: '操作',
      valueType: 'option',
      width: '20%',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <div></div>,
        <Popconfirm
          key='delete'
          title='确认删除？'
          onConfirm={() => {
            console.log("delete");
            console.log(record.id);
            axios.post("/book",{
              "operation": "delete_one_book",
              "id": record.id,
              "token": localStorage.getItem("token")
            })
            .then(() => notification.success({message: '删除成功'}))
            .then(fetchAll);
          }}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  useEffect(() => {
    fetchAll();
  }, [])

  return (
    <PageContainer
      header={{
        title: '书籍管理'
      }}
    >
      <EditableProTable
        rowKey="id"
        maxLength={20}
        value={books}
        loading={false}
        columns={columns}
        editable={{
          type: 'single',
          editableKeys,
          onChange: setEditableRowKeys,
          onSave: async (rowKey, books) => {
            console.log(books);
            axios.post("/book",{
              ...books,
              "operation": "update_one_book",              
              "tot_number": Number(books.tot_number),
              "remain_number": Number(books.remain_number),
              "token": localStorage.getItem("token")
          })      
            .then(notification.success({message: '编辑成功'}))
            .then(fetchAll)
          }
        }}
        recordCreatorProps={false}
        toolBarRender={() => [
          <Button key='create' icon={<PlusOutlined />} type='primary' onClick={() => setAddbookVisible(true)}>
            添加
          </Button>,
        ]}
      />
      <BookAdd visible={addbookVisible} setVisible={setAddbookVisible} refresh={fetchAll} />
    </PageContainer>
  )
}

