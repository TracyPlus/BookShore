import { useState } from "react"
import { useParams } from "react-router"
import { Button, Modal } from 'antd';
import { useNavigate } from "react-router-dom"
import theLogo from '../../styles/logo0dark2.jpg'
import {
  CommentOutlined,
  ReadOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  levels,
  header,
  logo,
  toolbarWrapper,
  toolbar,
  divider,
  sidebar
} from "./Header.module.css"

export default function Header () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/contactus")
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let navigate = useNavigate();
  const logout=()=>{
    localStorage.setItem("token", "");
    navigate("/bookshore");
  }

  return (
    <>
      <div className={header}>
        <img className={logo} src={theLogo} />
        <div className={levels}>
          <Button className={sidebar} onClick={() => {navigate("/bookshore")}}>
            书城<ReadOutlined/>
          </Button> 
          <Button className={sidebar} onClick={() => {navigate("/userpage")}}>
            个人中心<UserOutlined/>
            </Button>
          <Button className={sidebar} onClick={showModal}>
            联系我们<CommentOutlined/>
          </Button>
          <Modal 
            title="您可以通过以下方式联系我们" 
            open={isModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel}
            cancelText="知道了"
            okText="去写邮件"
            >
              <p>微信：abcde12345</p>
              <p>邮箱：21307130403@m.fudan.edu.cn</p>
              <p>电话：12345678910</p>
          </Modal>
        </div>
        { (localStorage.getItem("token") !== "") ? 
          (<div className={toolbarWrapper}>
            <Button className={toolbar} onClick={logout}>登出</Button>
            <div style={{marginTop:"2rem",height:"2rem",color:"white"}}>|</div>
            <Button className={toolbar} onClick={() => {navigate("/logina")}}>超管</Button>
          </div>)
          :
          (<div className={toolbarWrapper}>
            <Button className={toolbar} onClick={() => {navigate("/login")}}>登录</Button>
            <div style={{marginTop:"2rem",height:"2rem",color:"white"}}>|</div>
            <Button className={toolbar} onClick={() => {navigate("/signup")}}>注册</Button>
          </div>)
        }        
      </div>
      <div className={divider}></div>
    </>
  )
}
