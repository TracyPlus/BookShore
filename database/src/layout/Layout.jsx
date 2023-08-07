import { Outlet } from "react-router"
import Header from "./Header/Header"
import { MenuOutlined } from "@ant-design/icons"
import { main } from "./Layout.module.css"
import { useEffect, useState } from "react"
import { PageHeader } from '@ant-design/pro-components';

export default function Layout(props){
  const [showSidebar, setShowSidebar] = useState(false);
  console.log(showSidebar);
  console.log((showSidebar||(window.innerWidth > 768)));
  useEffect(() => {}, [showSidebar,(window.innerWidth > 820)])
  return (
    <>
    <PageHeader/>
      <Header />
      <div className={main}>
      {props.main}
      </div>
    </>
  )
}