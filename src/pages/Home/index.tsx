import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { useModel } from '@umijs/max';
import styles from './index.less';
import React from 'react';
import { Button, DatePicker, Form, Segmented, TreeSelect, Spin, Empty, Space, Input } from 'antd';
import { useTRState } from '@/utils/trHooks.jsx';
import type { Moment } from 'moment';
const { RangePicker } = DatePicker;
type RangeValue = [Moment | null, Moment | null] | null;
import { filterList } from './helper';

const HomePage: React.FC = () => {
  const [form] = Form.useForm();
  const { global } = useModel('global');

  const [state, setState] = useTRState({
    dates: null,
    treeData: [],
    loading: false,
  });
  const [dates, setDates] = React.useState<RangeValue>(null);

  React.useEffect(() => {
    onFeach();
  }, []);

  const onFeach = () => {
    const selectPersonList = Array.from(new Set(filterList.map((item) => item.personId)));
    // console.log(selectPersonList, 'selectPersonList');
    setState({ loading: true });
    setTimeout(() => {
      setState({
        loading: false,
        treeData: [
          {
            title: '全选',
            value: 'all',
            children: [
              {
                value: 46,
                title: '钉钉群',
              },
              {
                value: 43,
                title: '测试钉钉群',
              },
              {
                value: 42,
                title: 'xvxfzvcz',
              },
              {
                value: 41,
                title: '5354646',
              },
              {
                value: 39,
                title: '4321',
              },
              {
                value: 38,
                title: '012',
              },
              {
                value: 37,
                title: '789',
              },
              {
                value: 36,
                title: '456',
              },
              {
                value: 34,
                title: '123',
              },
              {
                value: 33,
                title: '45体育局还',
              },
              {
                value: 32,
                title: '45体育局还给他烦人的',
              },
              {
                value: 31,
                title: '12',
              },
              {
                value: 30,
                title: 'ASDASD',
              },
              {
                value: 28,
                title: '213',
              },
              {
                value: 27,
                title: '13134',
              },
              {
                value: 26,
                title: '资源保障部分管领导1',
              },
              {
                value: 19,
                title: '3发',
              },
              {
                value: 21,
                title: '33发',
              },
              {
                value: 20,
                title: '2发',
              },
            ],
          },
        ],
      });
    }, 3000);
  };

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    if (!dates?.[0] && !dates?.[1]) {
      return false;
    }
    const tooLate = dates[0] || dates[1];
    return current.diff(tooLate, 'days') > 7 || (tooLate as Moment).diff(current, 'days') > 7;
  };

  const onOpenChange = (open) => {
    if (open) {
      form.setFieldsValue({
        datePicker: [],
      });
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };
  const handleOk = async () => {
    const valuse = await form.validateFields();
    // console.log(valuse, '-valuse------');
  };

  return (
    <div className={styles.container}>
      <Guide name={trim(global.name)} />
      <Form form={form}>
        <Form.Item label="实验" name={'timeRange'} style={{ marginRight: '10px' }}>
          <Segmented
            options={[
              {
                label: '近1天',
                value: 'soon1',
              },
              {
                label: '近7天',
                value: 'soon7',
              },
              {
                label: '自定义',
                value: 'soonMy',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="DatePicker"
          name="datePicker"
          rules={[{ required: true, message: 'Please input your datePicker!' }]}
        >
          <RangePicker
            // disabled={_timeRange !== 'soonMy'}
            format="YYYY-MM-DD"
            style={{ width: '250px' }}
            onCalendarChange={(val: any) => setDates(val)}
            disabledDate={disabledDate}
            onOpenChange={onOpenChange}
          />
        </Form.Item>
        <Form.Item
          label="钉钉群"
          name="dingdingInfos"
          rules={[{ required: true, message: 'Please input your datePicker!' }]}
        >
          <TreeSelect
            treeDefaultExpandAll={true}
            treeCheckable={true}
            placeholder="请选择钉钉群"
            treeData={state.treeData}
            maxTagCount={5}
            treeNodeFilterProp="title"
            notFoundContent={
              <React.Fragment>
                {state.loading ? (
                  <div style={{ textAlign: 'center' }}>
                    <Spin />
                  </div>
                ) : (
                  <Empty description="暂无数据" />
                )}
              </React.Fragment>
            }
          />
        </Form.Item>
        <Form.Item label="公告内容" required={true}>
          <div style={{ display: 'flex' }}>
            <Form.Item
              name="content"
              noStyle
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: '请填写公告内容',
                },
              ]}
            >
              <Input.TextArea maxLength={5000} rows={6} placeholder="请填写公告内容" />
            </Form.Item>
            <Form.Item noStyle>
              <Button type="primary">智能识别</Button>
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleOk}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HomePage;
