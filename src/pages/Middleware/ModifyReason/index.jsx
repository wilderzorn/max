import TRNotification from '#/utils/notification';
import { useTRState } from '#/hooks/trHooks';
import { Button, ConfigProvider, Form, Input, Modal, Space } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import styles from './index.less';

const ModifyReason = ({ onPress, title, recoverText = null }) => {
  const [form] = Form.useForm();
  const [state, setState] = useTRState({
    open: true,
  });

  const onClose = (obj = { index: 0 }) => {
    onPress(obj);
    setState({ open: false });
  };
  const onSubmit = async () => {
    const values = await form.validateFields();
    onClose({ index: 1, data: values });
  };
  return (
    <Modal
      className={styles.container_modal}
      title={title ?? '修改原因'}
      required={true}
      open={state.open}
      width={'500px'}
      centered={true}
      maskClosable={false}
      footer={null}
      onCancel={onClose}
    >
      <ConfigProvider locale={zhCN}>
        <div className={styles.container}>
          <Form form={form} component={false}>
            {recoverText ? (
              <p className={styles.recoverText}>{recoverText}</p>
            ) : null}
            <Form.Item
              labelCol={{ span: 24 }}
              label={title ?? '修改原因'}
              name={'remark'}
              rules={[
                { required: true, message: `请输入${title ?? '修改原因'}` },
                {
                  max: 120,
                  message: '不超过120字',
                },
              ]}
            >
              <Input.TextArea
                placeholder={`请输入${title ?? '修改原因'}(120字以内)`}
                maxLength={120}
                showCount
                style={{ width: '100%', resize: 'none' }}
              />
            </Form.Item>
          </Form>
          <div className={styles.container_footer}>
            <Space size={15}>
              <Button onClick={onClose}>取消</Button>
              <Button type={'primary'} onClick={onSubmit}>
                确认
              </Button>
            </Space>
          </div>
        </div>
      </ConfigProvider>
    </Modal>
  );
};

class BPopup {
  __key__ = '';
  show = (params) => {
    return new Promise((resolve) => {
      if (this.__key__ !== '') return;
      this.__key__ = String(Date.now());
      TRNotification.add({
        key: this.__key__,
        content: (
          <ModifyReason
            {...params}
            onPress={(result, nKey) => {
              this.dismiss(nKey);
              resolve(result);
            }}
          />
        ),
        dismiss: this.dismiss,
      });
    });
  };
  dismiss = () => {
    if (this.__key__.length > 0) {
      TRNotification.remove(this.__key__);
      this.__key__ = '';
    }
  };
}
const bPopup = new BPopup();
export default bPopup;
