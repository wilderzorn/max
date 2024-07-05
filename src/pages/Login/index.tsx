import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import styles from './index.less';
import { setAuthorization } from '#/utils/authority';
import { history } from '@umijs/max';
import Motion from './Motion';
import { onLogin } from '@/services/user';
import { useTRState } from '#/utils/trHooks';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const [state, setState] = useTRState({
    loading: false,
  });
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setState({ loading: true });
    const res = await onLogin({
      username: values.username,
      password: values.password,
    });
    setState({ loading: false });
    if (res.statusCode === '1000') {
      message.success('登录成功');
      setAuthorization(res.token);
      history.push('/');
    } else {
      message.error(res?.message ?? '登录失败');
    }
  };

  return (
    <div className={styles.container}>
      <Motion />
      <div className={styles.container_form}>
        <h1 style={{ textAlign: 'center' }}>登陆</h1>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 28 }}
          style={{ width: '100%' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入账号!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={state.loading}>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
