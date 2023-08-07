import { ProLayout } from "@ant-design/pro-components"
import React from "react"
import { NavLink, Outlet, useLocation } from "react-router-dom"

import {
  HomeOutlined,
  SolutionOutlined,
  BookOutlined,
  MessageOutlined,
} from '@ant-design/icons';

const route = {
  path: '/',
  routes: [
    {
      path: '/userpage',
      name: '个人资料',
      icon: <SolutionOutlined />,
    },
    {
      path: '/borrowed',
      name: '我的借阅',
      icon: <BookOutlined />,
    },
    {
      path: '/contactus',
      name: '联系我们',
      icon: <MessageOutlined />,
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
      title='个人中心'
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