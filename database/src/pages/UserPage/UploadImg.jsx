import { Button, Modal } from 'antd';
import { useState } from 'react';
import { ProFormUploadDragger } from '@ant-design/pro-components';
const UploadImg = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        编辑头像
      </Button>
      <Modal
        title="上传新头像"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <ProFormUploadDragger 
            name="picture" 
            width="md"
            title="拖拽或点击上传"
            description="支持png、jpg、jpeg文件, 单个文件不可大于10M"
            />
      </Modal>
    </>
  );
};
export default UploadImg;