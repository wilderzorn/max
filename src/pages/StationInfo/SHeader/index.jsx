import styles from './index.less';
import { Form, Select, DatePicker, Button, Space } from 'antd';

const { RangePicker } = DatePicker;

const SHeader = ({ state, setState }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setState({ params: values });
  };

  return (
    <div className={styles.header}>
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item name="deptNum">
          <Select placeholder="选择部门" style={{ width: '240px' }}>
            {(state.stations ?? []).map((s) => (
              <Select.Option key={s.deptNum} value={s.deptNum}>
                {s.deptName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="time" style={{ width: '240px' }}>
          <RangePicker picker="month" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button
              htmlType="button"
              onClick={() => {
                form.resetFields();
                setState({ params: {} });
              }}
            >
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SHeader;
