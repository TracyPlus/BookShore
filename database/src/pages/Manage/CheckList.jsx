import { EditableProTable, PageContainer} from "@ant-design/pro-components";
import { Button, notification, Popconfirm } from "antd";
import React, { useEffect, useState } from "react"
import axios from "axios";

export default function CheckList () {
  const [requires, setRequires] = useState([]);
  const [status, setStatus] = useState(false);
  
  const fetchAll = async () => {
    const res = await axios.post("/admin",{
      "operation": "get_all_requests",
      "token": localStorage.getItem("token")
    })
    console.log(res.data.requires);
    setRequires(res.data.requires);
  }

  useEffect(() => {
    fetchAll();
  }, [])
  let requires1 = [];
  let requires2 = [];
  for (let i=0; i<requires?.length; i++){
    if(requires[i].status === "未处理") requires1.push (requires[i]);
    else requires2.push (requires[i]);
  }

  const columns1 = [
    {
      title: '申请序号',
      dataIndex: 'id',
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
      title: '学生证图片',
      dataIndex: 'picture',
      render: (url) => {return (<img src={url} style={{height:"2rem", width:"2rem"}}/>)},
      width: '15%',
    },
    {
      title: '申请状态',
      dataIndex: 'status',
      width: '15%',
    },
    {
      title: '操作',
      valueType: 'option',
      width: "200",
      render: (text, record, _, action) => [
        <Popconfirm
          key='delete'
          title='确认执行操作？'
          onConfirm={() => {
            axios.post("/admin",{
              "operation": "pass_request",
              "token": localStorage.getItem("token"),
              "id": record.id
            })
            .then(() => notification.success({message: '通过成功'}))
            .then(fetchAll);
          }}
        >
          <a>通过</a>
        </Popconfirm>,
          <Popconfirm
          key='delete'
          title='确认执行操作？'
          onConfirm={() => {
            axios.post("/admin",{
              "operation": "reject_request",
              "token": localStorage.getItem("token"),
              "id": record.id
            })
            .then(() => notification.success({message: '驳回成功'}))
            .then(fetchAll);
          }}
        >
          <a>驳回</a>
        </Popconfirm>
      ],
    },
  ];

  const columns2 = [
    {
      title: '申请序号',
      dataIndex: 'id',
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
      title: '学生证图片',
      dataIndex: 'picture',
      render: (url) => {return (<img src={url} style={{height:"2rem", width:"2rem"}}/>)},
      width: '15%',
    },
    {
      title: '申请状态',
      dataIndex: 'status',
      width: '15%',
    }
  ];


  return (
    <PageContainer
      // loading={!requires}
      header={{
        title: '认证申请处理'
      }}
    >
      <h3>未处理申请</h3>
      <EditableProTable
        rowKey="username"
        maxLength={20}
        value={requires1}
        loading={false}
        columns={columns1}
        recordCreatorProps={false}
      />
      <h3>已处理申请</h3>
      <EditableProTable
        rowKey="username"
        maxLength={20}
        value={requires2}
        loading={false}
        columns={columns2}
        recordCreatorProps={false}
      />
      {/* <userAdd visible={adduserVisible} setVisible={setAdduserVisible} refresh={fetchData} /> */}
    </PageContainer>
  )
}

