import useNotice from '#/hooks/useNotice';
import { AlertResult } from '#/utils/contacts';
import { useTRState } from '#/utils/trHooks';
import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import Config from './config';
const business = (props) => {
  const { onPress } = props;
  const [form] = Form.useForm();
  const [notice, NoticeContext] = useNotice();
  const [state, setState] = useTRState({
    open: true,
  });

  const onClose = (obj) => {
    setState({ open: false });
    onPress({ ...obj });
  };

  const onOk = async () => {
    const values = await form.validateFields();
    onClose({ index: AlertResult.SUCCESS, values });
  };

  const onOpen = async () => {
    const res = await notice.show(Config);
    // console.log(res, '---res---');
  };

  return (
    <Modal
      title="公告"
      width={600}
      onCancel={onClose}
      onOk={onOk}
      centered={true}
      destroyOnClose={true}
      open={state.open}
    >
      <div>
        <Form form={form}>
          <Form.Item
            label="收件人"
            name="recipient"
            rules={[
              {
                required: true,
                message: '请输入收件人!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="公告标题"
            name="placardTitle"
            rules={[
              {
                required: true,
                message: '请输入公告标题!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="公告类型"
            name="placardType"
            rules={[
              {
                required: true,
                message: '请选择公告类型!',
              },
            ]}
          >
            <Select>
              <Select.Option value="通知公告">通知公告</Select.Option>
              <Select.Option value="重要公告">重要公告</Select.Option>
            </Select>
          </Form.Item>
        </Form>
        <Button onClick={onOpen}>抽屉</Button>
      </div>
      {NoticeContext}
    </Modal>
  );
};
export default business;
