import { setAuthorization } from '#/utils/authority';
import { useTRState } from '#/utils/trHooks';
import { onLogin } from '@/services/user';
import { FormattedMessage, history, useIntl } from '@umijs/max';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import React from 'react';
import Motion from './Motion';
import styles from './index.less';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const intl = useIntl();
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
        <h1 style={{ textAlign: 'center' }}>
          {intl.formatMessage({
            id: `login.login`,
          })}
        </h1>
        <Form
          name="basic"
          layout="vertical"
          style={{ width: '100%' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label={<FormattedMessage id="login.username" />}
            name="username"
            rules={[{ required: true, message: '请输入账号!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label={<FormattedMessage id="login.password" />}
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
            <Checkbox>
              <FormattedMessage id="login.remember" />
            </Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={state.loading}>
              <FormattedMessage id="login.login" />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
