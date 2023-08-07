import { EditableProTable, PageContainer} from "@ant-design/pro-components";
import { Button, notification, Popconfirm } from "antd";
import { PlusOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
// import { request } from "../../services/request";

export default function BorrowList () {
  // const [borrows, setborrows] = useState("");
  const [addborrowVisible, setAddborrowVisible] = useState(false);
  const [editableKeys, setEditableRowKeys] = useState([]);
  
//   const fetchData = () => {
//     request('ladder/borrow', 'POST', {}, 'list_all')
//       .then(res => setborrows(res.res));
//   }
  const borrows = [
    {
      id:1,
      title:"aaa",
      author:"bbb",
      upload_date:"20030315",
      remain_number:"3"
    }
  ]
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      ellipsis: true,
      readonly: true,
      sorter: (a, b) => a._id > b._id ? 1 : -1,
      tooltip: '唯一标识，不可更改',
      width: '20%',
    },
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
      title: '上传时间',
      dataIndex: 'upload_date',
      // editable: false,
      width: '20%',
    },
    {
      title: '数量',
      dataIndex: 'remain_number',
      width: '20%',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <NavLink key="manage" to={`/borrow/${record.id}`}>
          修改书籍信息
        </NavLink>,
        <div></div>,
        <Popconfirm
          key='delete'
          title='确认删除？'
          onConfirm={() => {
            console.log("delete");
            // request('ladder/borrow', 'POST', { _id: record._id }, 'delete')
            //   .then(() => notification.success({message: '删除成功'}))
            //   .then(fetchData);
          }}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

//   useEffect(() => {
//     fetchData();
//   }, [])

  return (
    <PageContainer
      // loading={!borrows}
      header={{
        title: '书籍管理'
      }}
    >
      <EditableProTable
        rowKey="_id"
        maxLength={20}
        value={borrows}
        loading={false}
        columns={columns}
        // onChange={setborrows}
        editable={{
          type: 'single',
          editableKeys,
          onChange: setEditableRowKeys,
          onSave: async (rowKey, borrows) => {
            console.log(borrows._id);
            console.log(borrows);
            // request('ladder/borrow', 'POST', {
            //   _id: borrows._id,
            //   title: borrows.title,
            //   displayName: borrows.displayName,
            //   img: borrows.img,
            //   desc: borrows.desc,
            //   levels: borrows.levels.map(u=>{return u._id})
            // }, 'edit')
            // .then(() => notification.success({message: '编辑成功'}))
            // .then(fetchData);
          }
        }}
        recordCreatorProps={false}
        toolBarRender={() => [
          <Button key='create' icon={<PlusOutlined />} type='primary' onClick={() => setAddborrowVisible(true)}>
            添加
          </Button>,
        ]}
      />
      {/* <borrowAdd visible={addborrowVisible} setVisible={setAddborrowVisible} refresh={fetchData} /> */}
    </PageContainer>
  )
}

