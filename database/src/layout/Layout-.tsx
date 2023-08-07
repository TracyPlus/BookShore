import { ProLayout } from "@ant-design/pro-components"
import React from "react"
import { NavLink, Outlet, useLocation } from "react-router-dom"

import {
  FileDoneOutlined,
  HomeOutlined,
  BookOutlined,
  UserOutlined
} from '@ant-design/icons';

const route = {
  path: '/',
  routes: [    
    {
      path: '/book',
      name: '书籍管理',
      icon: <BookOutlined />,
    },
    {
      path: '/user',
      name: '用户管理',
      icon: <UserOutlined />,
    },
    {
      path: '/check',
      name: '认证申请',
      icon: <FileDoneOutlined />,
    },
    {
      path: '/bookshore',
      name: '返回主页',
      icon: <HomeOutlined />,
    },
  ],
}

export default () => {
  const location = useLocation();

  return (
    <ProLayout
      title='超管后台'
      route={route}
      location={location}
      headerRender={false}
      menuItemRender={(item, dom) => 
        <NavLink to={item.path || '/'}>{dom}</NavLink>
      }
    >
      <Outlet />
    </ProLayout>
  )
}