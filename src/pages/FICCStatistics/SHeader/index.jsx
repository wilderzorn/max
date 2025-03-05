import { Form, DatePicker, Button, Space } from 'antd';
import styles from './index.less';
import _ from 'lodash';
import MultipleSelect from './MultipleSelect';
import useMessage from '#/hooks/useMessage';

const { RangePicker } = DatePicker;

const SHeader = ({ state, setState }) => {
  const [form] = Form.useForm();
  const [message, MessageContext] = useMessage();

  const onSearch = () => {
    if (
      _.isEmpty(state?.filterObj?.deptNums) ||
      _.isEmpty(state?.filterObj?.time)
    ) {
      return message.info('请选择筛选条件');
    }
  };

  return (
    <div className={styles.header}>
      <Form form={form} layout="inline">
        <Form.Item label="场站">
          <MultipleSelect
            value={state?.filterObj?.deptNums ?? []}
            placeholder="选择部门"
            style={{ width: '240px' }}
            allData={state.stations}
            callback={(value) => {
              setState({ filterObj: { ...state.filterObj, deptNums: value } });
            }}
          />
        </Form.Item>
        <Form.Item label="时间">
          <RangePicker
            value={state?.filterObj?.time ?? []}
            onChange={(time) => {
              setState({ filterObj: { ...state.filterObj, time: time } });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={onSearch}>
              查询
            </Button>
          </Space>
        </Form.Item>
      </Form>
      {MessageContext}
    </div>
  );
};
export default SHeader;
