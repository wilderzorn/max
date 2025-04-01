import { AlertResult } from '#/resource/contacts';
import { useTRState } from '#/hooks/trHooks';
import { Form, Input, Modal, Select } from 'antd';
import React from 'react';

const business = ({ onPress, dataSlide }) => {
  const [form] = Form.useForm();
  const [state, setState] = useTRState({
    open: true,
  });

  React.useEffect(() => {
    form.setFieldsValue(dataSlide);
  }, []);

  const onClose = (obj) => {
    setState({ open: false });
    onPress({ ...obj });
  };

  const onOk = async () => {
    const values = await form.validateFields();
    onClose({ index: AlertResult.SUCCESS, values });
  };

  return (
    <Modal
      title="公告"
      width={400}
      onCancel={onClose}
      onOk={onOk}
      centered={true}
      destroyOnClose={true}
      open={state.open}
    >
      <Form form={form} layout={'vertical'}>
        <Form.Item label="id" name="id">
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="收件人"
          name="username"
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
          label="描述"
          name="description"
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
          label="类型"
          name="type"
          rules={[
            {
              required: true,
              message: '请选择类型!',
            },
          ]}
        >
          <Select>
            <Select.Option value="通知公告">通知公告</Select.Option>
            <Select.Option value="重要公告">重要公告</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default business;
