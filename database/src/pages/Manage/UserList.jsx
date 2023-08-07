import { EditableProTable, PageContainer} from "@ant-design/pro-components";
import { Button, notification, Popconfirm } from "antd";
import React, { useEffect, useState } from "react"
import axios from "axios";

export default function UserList () {
  const [students, setStudents] = useState([]);
  const [guests, setGuests] = useState([]);
  
  const fetchAllStudent = async () => {
    const res = await axios.post("/admin",{
      "operation": "get_all_students",
      "token": localStorage.getItem("token")
    })
    console.log(res.data.students);
    setStudents(res.data.students);
  }
  const fetchAllGuest = async () => {
    const res = await axios.post("/admin",{
      "operation": "get_all_guests",
      "token": localStorage.getItem("token")
    })
    console.log(res.data.guests);
    setGuests(res.data.guests);
  }

  useEffect(() => {
    fetchAllGuest();
    fetchAllStudent();
  }, [])

  const columns1 = [
    {
      title: '账号',
      dataIndex: 'username',
      ellipsis: true,
      readonly: true,
      sorter: (a, b) => a._id > b._id ? 1 : -1,
      width: '15%',
    },
    {
      title: '姓名',
      dataIndex: 'realname',
      width: '15%',
    },
    {
      title: '学号',
      dataIndex: 'sid',
      width: '15%',
    },
    {
      title: '院系',
      dataIndex: 'dept_name',
      width: '15%',
    },
    {
      title: '操作',
      valueType: 'option',
      width: "20%",
      render: (text, record, _, action) => [
        <Popconfirm
          key='delete1'
          title='确认删除？'
          onConfirm={() => {
            axios.post("/admin",{
              "operation": "delete_student",
              "username": record.username,
              "token": localStorage.getItem("token")
            })
            .then(() => notification.success({message: '删除成功'}))
            .then(fetchAllStudent);
          }}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];
  const columns2 = [
    {
      title: '账号',
      dataIndex: 'username',
      ellipsis: true,
      readonly: true,
      sorter: (a, b) => a._id > b._id ? 1 : -1,
      width: '15%',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      width: '15%',
    },
    {
      title: '操作',
      valueType: 'option',
      width: "20%",
      render: (text, record, _, action) => [
        <Popconfirm
          key='delete2'
          title='确认删除？'
          onConfirm={() => {
            console.log("delete");
            console.log(record.id);
            axios.post("/admin",{
              "operation": "delete_guest",
              "username": record.username,
              "token": localStorage.getItem("token")
            })
            .then(() => notification.success({message: '删除成功'}))
            .then(fetchAllGuest);
          }}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer
      header={{
        title: '用户管理'
      }}
    >
      <h3>所有学生</h3>
      <EditableProTable
        rowKey="username"
        maxLength={20}
        value={students}
        loading={false}
        columns={columns1}
        recordCreatorProps={false}
      />
      <h3>所有游客</h3>
      <EditableProTable
        rowKey="username"
        maxLength={20}
        value={guests}
        loading={false}
        columns={columns2}
        recordCreatorProps={false}
      />
    </PageContainer>
  )
}

