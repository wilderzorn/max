import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Carousel, Image } from 'antd';
import styles from './index.less';
import { setAuthorization } from '#/utils/authority';
import { history } from '@umijs/max';
import os3 from '@/assets/user/CachedImage_OS3.jpg';
import os4 from '@/assets/user/CachedImage_OS4.jpg';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const { remember } = values;
    if (remember) {
      setAuthorization(`${new Date().getTime()}`);
    }
    history.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_imgs}>
        <Carousel autoplay>
          <div>
            <Image preview={false} src={os3} height={595} width={500} />
          </div>
          <div>
            <Image preview={false} src={os4} height={595} width={500} />
          </div>
        </Carousel>
      </div>
      <div className={styles.container_form}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 28 }}
          style={{ maxWidth: 600 }}
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
            <Button type="primary" htmlType="submit">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
