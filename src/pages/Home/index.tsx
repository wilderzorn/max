import { useTRState } from '#/hooks/trHooks';
import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { FormattedMessage, useModel } from '@umijs/max';
import {
  Button,
  DatePicker,
  Empty,
  Form,
  Input,
  Segmented,
  Spin,
  TreeSelect,
} from 'antd';
import type { Dayjs } from 'dayjs';
import React from 'react';
import styles from './index.less';
const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;

const HomePage: React.FC = () => {
  const [form] = Form.useForm();
  const { global } = useModel('global');

  const [state, setState] = useTRState({
    dates: null,
    treeData: [],
    loading: false,
    list: [1, 2, 3, 4, 5, 6, 7],
  });
  const [dates, setDates] = React.useState<RangeValue>(null);

  React.useEffect(() => {
    onFeach();
  }, []);

  const onFeach = () => {
    setState({ loading: true });
    setTimeout(() => {
      setState({
        loading: false,
        treeData: [
          {
            title: '分组1',
            value: 'group1',
            children: [
              {
                value: 1,
                title: '钉钉群',
              },
              {
                value: 2,
                title: '测试钉钉群',
              },
              {
                value: 3,
                title: 'xvxfzvcz',
              },
            ],
          },
          {
            title: '分组2',
            value: 'group2',
            children: [
              {
                value: 4,
                title: '5354646',
              },
              {
                value: 5,
                title: '4321',
              },
              {
                value: 6,
                title: '789',
              },
              {
                value: 7,
                title: '456',
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
    return (
      current.diff(tooLate, 'days') > 7 ||
      (tooLate as Dayjs).diff(current, 'days') > 7
    );
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
    const _valuse = await form.validateFields();
    // console.log(valuse, '-valuse------');
  };
  const customSort = (a, b) => {
    const indexA = state.list.indexOf(a);
    const indexB = state.list.indexOf(b);
    return indexA - indexB;
  };
  return (
    <div className={styles.container}>
      <FormattedMessage id="user.welcome" values={{ name: '张三' }} />
      <Guide name={trim(global.name)} />
      <Form form={form}>
        <Form.Item
          label="实验"
          name={'timeRange'}
          style={{ marginRight: '10px' }}
        >
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
          rules={[
            { required: false, message: 'Please input your datePicker!' },
          ]}
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
            onChange={(value) => {
              const order = (value || []).sort(customSort);
              form.setFieldsValue({
                dingdingInfos: order,
              });
            }}
          />
        </Form.Item>
        <Form.Item label="公告内容" required={false}>
          <div style={{ display: 'flex' }}>
            <Form.Item
              name="content"
              noStyle
              rules={[
                {
                  required: false,
                  whitespace: true,
                  message: '请填写公告内容',
                },
              ]}
            >
              <Input.TextArea
                maxLength={5000}
                rows={6}
                placeholder="请填写公告内容"
              />
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
